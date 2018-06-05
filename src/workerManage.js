
var myWorker = null;

// window.requestIdleCallback(function () {
  myWorker = new Worker('worker.js');
// })

function getWorker() {
  return myWorker
}

export { getWorker }
