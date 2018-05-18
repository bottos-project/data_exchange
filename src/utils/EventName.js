const ipcEventName = {
    get_key_store:'get-key-store',
    get_key_store_reply:'get-key-store-reply',
    save_key_store:'save-key-store',
    import_file:'import-file',
    import_file_reply:'import-file-reply',
    key_store_list:'key-store-list',
    export_key_store:'export_key_store',
    mkdir:'mkdir',
    create_keystore:"create_keystore",
    decryptKeystore:'decryptKeystore'
}

module.exports = {
    ipcEventName
}