'use strict';
const path = require('path');
const electron = require('electron');
// const unusedFilename = require('unused-filename');
const concat = require('./concat-files.js');
const throttle = require('lodash.throttle');
const fs = require('fs');
const {app, ipcMain, dialog} = electron;

var downloadFileInfo = {
  // guid: {
  //   ...
  // }
}


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

  let t1 = new Date().getTime()
  concat(files, targetFile, function (data) {
    // console.log('success');
    console.log('time', new Date().getTime() - t1 + 'ms');
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
    let sliceId = item.getFilename()
    // console.log('item.getFilename()', sliceId);
    let guid = sliceId.slice(0, 64)
    let chunk = sliceId.slice(64)
    let info = downloadFileInfo[guid]
		let filePath = info.filePath
		let dirname = info.dirname
    // let slicePath = dirname + sliceId
    let slicePath = path.join(dirname, sliceId)
    let sliceInfo = info.urlList[chunk]
    sliceInfo.status = 'downloading'
    sliceInfo.totalBytes = item.getTotalBytes()
    sliceInfo.receivedBytes = 0
		// 	const filename = item.getFilename();
		// 	const name = path.extname(filename) ? filename : getFilenameFromMime(filename, item.getMimeType());

		// 	filePath = unusedFilename.sync(path.join(dir, name));

		// const errorMessage = options.errorMessage || 'The download of {filename} was interrupted';
		// const errorTitle = options.errorTitle || 'Download Error';

    // 设置保存路径，使 Electron 不提示保存对话框。
    item.setSavePath(slicePath);

		item.on('updated', (event, state) => {
      if (state === 'interrupted') {
        console.log('Download is interrupted but can be resumed')
      } else if (state === 'progressing') {
        if (item.isPaused()) {
          console.log('Download is paused')
        } else {
          let receivedBytes = item.getReceivedBytes()
          sliceInfo.receivedBytes = receivedBytes
          console.log(`Received bytes: ${receivedBytes}`)
          let channel = 'file_download:' + filePath
          // console.log('channel', channel);
          webContents.send(channel, info)
          // throttle(webContents.send(channel, info), 100)
        }
      }

			// receivedBytes = [...downloadItems].reduce((receivedBytes, item) => {
			// 	receivedBytes += item.getReceivedBytes();
			// 	return receivedBytes;
			// }, completedBytes);

			// if (options.showBadge && ['darwin', 'linux'].includes(process.platform)) {
			// 	app.setBadgeCount(activeDownloadItems());
			// }

			// if (!win.isDestroyed()) {
			// 	win.setProgressBar(progressDownloadItems());
			// }

			// if (typeof options.onProgress === 'function') {
			// 	options.onProgress(progressDownloadItems());
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
        console.error('cancelled');
			} else if (state === 'interrupted') {
				// const message = pupa(errorMessage, {filename: item.getFilename()});
				// dialog.showErrorBox(errorTitle, message);
				// cb(new Error(message));
        console.error('interrupted');
			} else if (state === 'completed') {
				// if (process.platform === 'darwin') {
				// 	app.dock.downloadFinished(filePath);
				// }

				// cb(null, item);
        sliceInfo.status = 'done'

        info.remaning = info.remaning - 1

        let channel = 'file_download'

        function isDone(item) {
          return item.status == 'done'
        }
        // webContents.send('file_download', {guid, ...info})
        if (info.remaning == 0 && info.urlList.every(isDone)) {

          concatFileByGuid(guid, function () {
            console.log('Download successfully')
            info.status = 'done'
            info.guid = guid
            webContents.send(channel, info)

          })
        }

			} else {
        console.log(`Download failed: ${state}`)
      }
		});
	};

	session.on('will-download', listener);
}

function registerMultipleDownload(win) {

  registerListener(win.webContents.session)

  ipcMain.on('file_download', (event, args) => {
    const { filePath, urlList, guid } = args
    console.log('urlList', urlList);

    let basename = path.basename(filePath)
    let dirname = path.dirname(filePath)

    let info = {
      basename,
      dirname,
      filePath,
      urlList,
      chunks: urlList.length,
      remaning: urlList.length,
      start: function () {
        for (let sliceInfo of urlList) {
          let surl = sliceInfo.surl
          win.webContents.downloadURL(surl);
        }
      }
    }

    info.start()

    downloadFileInfo[guid] = info

  })

}

module.exports = registerMultipleDownload
