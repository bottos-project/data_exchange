class BTWorker{
    constructor(props){
        this.initWorker()
    }

    initWorker(){
        const worker = new Worker("worker.js")
        worker.postMessage = this.postMessage
        worker.onmessage = this.onmessage

    }

    postMessage(params){
        console.log("postMessage",params)
    }

    onmessage(e){
        console.log("onmessage",e)
    }
}


export default new BTWorker()