
function Quene() {

  /**
   * 统计文件数。
   * * `numOfQueue` 队列中的文件数。
   * * `numOfSuccess` 上传成功的文件数
   * * `numOfCancel` 被取消的文件数
   * * `numOfProgress` 正在上传中的文件数
   * * `numOfDownloadFailed` 上传错误的文件数。
   * * `numOfInvalid` 无效的文件数。
   * * `numOfDeleted` 被移除的文件数。
   * * `numOfInterrupt` 被中断的文件数。
   * @property {Object} stats
   */
  this.stats = {
      numOfQueue: 0,
      numOfSuccess: 0,
      numOfCancel: 0,
      numOfProgress: 0,
      numOfDownloadFailed: 0,
      numOfInvalid: 0,
      numOfDeleted: 0,
      numOfInterrupt: 0
  };

  // 上传队列，仅包括等待上传的文件
  this._queue = [];

  // 存储所有文件
  this._map = {};

}


Quene.prototype.append = function (info) {
  this._queue.push(info)
  this._fileAdded( info );
  return this
}

/**
 * 在队列中删除文件。
 * @grammar removeFile( file ) => Array
 * @method removeFile
 * @param {File} 文件对象。
 */
Quene.prototype.removeFile = function( file ) {
    var existing = this._map[ file.filePath ];

    if ( existing ) {
        delete this._map[ file.filePath ];
        this._delFile(file);
    }
}


Quene.prototype._fileAdded = function( file ) {
    var existing = this._map[ file.filePath ];

    if ( !existing ) {
        this._map[ file.filePath ] = file;
    }
}

Quene.prototype._delFile = function(file) {
    for(var i = this._queue.length - 1 ; i >= 0 ; i-- ){
        if(this._queue[i] == file){
            this._queue.splice(i, 1);
            break;
        }
    }
}

module.exports = Quene;
