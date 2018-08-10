'use strict';
const path = require('path');
const electron = require('electron');
// const unusedFilename = require('unused-filename');
const concat = require('./concat-files.js');
const throttle = require('lodash.throttle');
const fs = require('fs');
const {app, ipcMain, dialog} = electron;

const Quene = require('./quene');
// console.log('Quene', Quene);

let channel = 'file_download'


var downloadFileInfo = {
  // guid: {
  //   ...
  // }
}

var downloadFileInfoQuene = new Quene()


var timeStamp = new Date().getTime()

function concatFileByGuid(guid, cb) {
  let info = downloadFileInfo[guid]
  let dirname = info.dirname
  let targetFile = info.filePath

  let files = info.urlList.map(({sguid}) => {
    return path.join(dirname, sguid);
  })

  if (fs.existsSync(targetFile)) {
    fs.unlinkSync(targetFile)
  }


  // let t1 = new Date().getTime()
  concat(files, targetFile, function (data) {
    // console.log('success');
    console.log('43 concat success', (new Date().getTime() - timeStamp) / 1000 + 's');
    // console.log('time', new Date().getTime() - t1 + 'ms');
    cb()

  })
}


function registerListener(session, options, cb = () => {}) {
	const downloadItems = new Set();
	let receivedBytes = 0;
	let completedBytes = 0;
	let totalBytes = 0;
	const activeDownloadItems = () => downloadItems.size;
	const progressDownloadItems = () => receivedBytes / totalBytes;


	const listener = (e, item, webContents) => {
		downloadItems.add(item);
		totalBytes += item.getTotalBytes();

		let hostWebContents = webContents;
		if (webContents.getType() === 'webview') {
			({hostWebContents} = webContents);
		}
		const win = electron.BrowserWindow.fromWebContents(hostWebContents);

    // const dir = options.directory || app.getPath('downloads');
    let sliceId = item.getFilename().split('.')[0]
    // console.log('sliceId', sliceId);
    let guid = sliceId.slice(0, 64)
    let chunk = sliceId.slice(64)
    let info = downloadFileInfo[guid]
		let filePath = info.filePath
		let dirname = info.dirname
    // let slicePath = dirname + sliceId
    let slicePath = path.join(dirname, sliceId)
    if (info.urlList.length == 1) {
      // 说明文件只有一个分片
      slicePath = filePath
    }

    if (fs.existsSync(slicePath)) {
      fs.unlinkSync(slicePath)
    }

    // console.log('chunk', chunk);
    let sliceInfo = info.urlList[chunk]
    sliceInfo.status = 'downloading'
    sliceInfo.totalBytes = item.getTotalBytes()
    sliceInfo.receivedBytes = 0
    sliceInfo.getItem = function () {
      return item
    }

    if (info.status != 'downloading') {
      info.status = 'downloading'
      webContents.send(channel, info)
    }

		// 	const filename = item.getFilename();
		// 	const name = path.extname(filename) ? filename : getFilenameFromMime(filename, item.getMimeType());

		// 	filePath = unusedFilename.sync(path.join(dir, name));

		// const errorMessage = options.errorMessage || 'The download of {filename} was interrupted';
		// const errorTitle = options.errorTitle || 'Download Error';

    // 设置保存路径，使 Electron 不提示保存对话框。
    item.setSavePath(slicePath);

		item.on('updated', (event, state) => {
      if (state === 'interrupted') {
        console.log('111 Download is interrupted but can be resumed')
      } else if (state === 'progressing') {
        if (item.isPaused()) {
          // console.log('Download is paused')
        } else {
          let receivedBytes = item.getReceivedBytes()
          sliceInfo.receivedBytes = receivedBytes
          // console.log(`Received bytes: ${receivedBytes}`)
          let file_channel = 'file_download:' + filePath
          // console.log('file_channel', file_channel);
          webContents.send(file_channel, info)
          // throttle(webContents.send(file_channel, info), 100)
        }
      }

			// if (options.showBadge && ['darwin', 'linux'].includes(process.platform)) {
			// 	app.setBadgeCount(activeDownloadItems());
			// }

			// if (!win.isDestroyed()) {
			// 	win.setProgressBar(progressDownloadItems());
			// }

		});

		item.on('done', (e, state) => {
			// completedBytes += item.getTotalBytes();
			// downloadItems.delete(item);

			// if (options.showBadge && ['darwin', 'linux'].includes(process.platform)) {
			// 	app.setBadgeCount(activeDownloadItems());
			// }

			// if (!win.isDestroyed() && !activeDownloadItems()) {
			// 	win.setProgressBar(-1);
			// 	receivedBytes = 0;
			// 	completedBytes = 0;
			// 	totalBytes = 0;
			// }

			if (state === 'cancelled') {
        console.error('157 cancelled');
			} else if (state === 'interrupted') {
				// const message = pupa(errorMessage, {filename: item.getFilename()});
				// dialog.showErrorBox(errorTitle, message);
				// cb(new Error(message));
        console.error('162 interrupted');
			} else if (state === 'completed') {
				// if (process.platform === 'darwin') {
				// 	app.dock.downloadFinished(filePath);
				// }

				// cb(null, item);
        sliceInfo.status = 'done'
        sliceInfo.getItem = null

        info.remaning = info.remaning - 1


        function downloadSuccessfully() {
          console.log('176 Download successfully', (new Date().getTime() - timeStamp) / 1000 + 's')

          info.status = 'done'
          info.guid = guid
          webContents.send(channel, info)
        }

        if (info.urlList.length == 1) {
          // 如果只有一个分片就不用合并了
          // 直接就是下载成功
          downloadSuccessfully()
          return ;
        }

        webContents.send(channel, info)

        function isDone(item) {
          return item.status == 'done'
        }
        // webContents.send('file_download', {guid, ...info})
        if (info.remaning == 0 && info.urlList.every(isDone)) {
          console.log('198 before concat', (new Date().getTime() - timeStamp) / 1000 + 's');
          concatFileByGuid(guid, downloadSuccessfully)
        }

			} else {
        console.log(`Download failed: ${state}`)
      }
		});
	};

	session.on('will-download', listener);
}


function startDownload({ filePath, urlList, guid, webContents }) {
  let basename = path.basename(filePath)
  let dirname = path.dirname(filePath)

  let info = {
    basename,
    dirname,
    filePath,
    urlList,
    guid,
    status: 'downloading',
    chunks: urlList.length,
    remaning: urlList.length,
    start: function () {
      for (let sliceInfo of urlList) {
        let { sguid, surl, status } = sliceInfo
        let slicePath = path.join(dirname, sguid)

        if ( fs.existsSync(slicePath) ) {
          if (status == 'done') {
            this.remaning -= 1
            continue
          } else {
            fs.unlinkSync(slicePath)
          }
        }

        delete sliceInfo.status
        webContents.downloadURL(surl);
      }
    }
  }

  downloadFileInfo[guid] = info
  downloadFileInfoQuene.append(info)
  timeStamp = new Date().getTime()
  console.log('239 startDownload', timeStamp);
  info.start()
  webContents.send(channel, info)
}


function registerMultipleDownload(win) {
  const webContents = win.webContents

  registerListener(webContents.session)


  ipcMain.on('file_download', (event, args) => {
    const { filePath, urlList, guid } = args
    // console.log('urlList', urlList);

    startDownload({ filePath, urlList, guid, webContents })
  })

  ipcMain.on('file_download:pause', function (event, arg) {
    let guid = arg.guid
    let info = downloadFileInfo[guid]
    if (info && info.status == 'downloading') {
      for (let sliceInfo of info.urlList) {
        if (sliceInfo.status == 'done') {
          continue
        }
        let downloadItem = sliceInfo.getItem()
        // console.log('downloadItem', downloadItem);
        let state = downloadItem.getState()
        console.log('state', state);
        if (state == 'progressing') {
          downloadItem.pause()
        }
      }
      info.status = 'interrupted'
      webContents.send(channel, info)
    }
  })

  ipcMain.on('file_download:resume', function (event, args) {
    let guid = args.guid
    let info = downloadFileInfo[guid]
    // console.log('info', info);
    if (info == undefined) {
      // 下载中没有这个信息
      // 说明是从缓存中恢复的
      const { filePath, urlList, guid } = args
      // return console.log(args);
      startDownload({ filePath, urlList, guid, webContents })

    } else if (info.status == 'interrupted') {
      // 说明是之前暂停的，直接开始就好了
      for (let sliceInfo of info.urlList) {
        if (sliceInfo.status == 'done') {
          continue
        }
        let downloadItem = sliceInfo.getItem()
        // console.log('downloadItem', downloadItem);
        // downloadItem.status = 'done'
        let state = downloadItem.getState()
        console.log('state', state);
        if (downloadItem.isPaused()) {
          downloadItem.resume()
        }
      }
      info.status = 'downloading'
      webContents.send(channel, info)
    }
  })

  // 这个方法于涉及到文件删除操作
  // 所以需要小心验证
  ipcMain.on('delete_download_cache', (event, info)=>{
    const { dirname, urlList, guid } = info
    // console.log('dirname', dirname);
    // console.log('guid', guid);
    if (guid.length !== 64) {
      return console.error('Invalid guid');
    }

    let _info = downloadFileInfo[guid]
    if ( _info != undefined) {
      for (let sliceInfo of _info.urlList) {
        if (sliceInfo.status == 'done') {
          continue
        }
        let downloadItem = sliceInfo.getItem()
        downloadItem.cancel()
      }
    }
    // console.log('urlList', urlList);
    for (var i = 0; i < urlList.length; i++) {
      let sguid = urlList[i].sguid
      // console.log('sguid', sguid);
      if (sguid == guid + i) {
        // console.log('can delete');
        let slicePath = path.join(dirname, sguid)
        fs.unlink(slicePath, function (err) {
          if (err) {
            console.error('delete cache error', err);
          }
        })
      }
    }
  })


}

module.exports = registerMultipleDownload
