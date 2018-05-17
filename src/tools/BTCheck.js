const isUserName = (username)=>{
    let str = /^[a-km-z][a-km-z1-9]{2,15}$/
    return str.test(username)
}


module.exports = {
    isUserName
}