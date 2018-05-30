const isUserName = (username)=>{
    let str = /^[a-z][a-z0-9]{2,15}$/
    return str.test(username)
}

const trim = (str)=>{
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

module.exports = {
    isUserName,
    trim
}