const accountKey = 'account_info'

// AccountTool
export const getAccount = ()=>{
    let account_info = localStorage.getItem(accountKey)
    return JSON.parse(account_info)
}

export const setAccount = (accountInfo)=>{
    return localStorage.setItem(accountKey,JSON.stringify(accountInfo));
}
