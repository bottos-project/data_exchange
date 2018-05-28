const isUserName = (username)=>{
    let str = /^[a-km-z][a-km-z1-9]{2,15}$/
    return str.test(username)
}

const trim = (str)=>{
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

module.exports = {
    isUserName,
    trim
}