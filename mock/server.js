const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')
const router = require('./router/index');
const cors = require('koa-cors')

app.use(cors())
app.use(bodyParser())
app.use(router(app))

app.listen(PORT = 3005,()=>{
    console.log('server run on '+ PORT);
})

app.on('error',(error)=>{
    console.log('error++++++++++++',error)
})