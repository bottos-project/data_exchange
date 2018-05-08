const isUserName = (username)=>{
    let str = /^[a-z]{3,10}$/
    return str.test(username)
}


module.exports = {
    isUserName
}