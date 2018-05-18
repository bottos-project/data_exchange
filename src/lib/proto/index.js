exports.messageProtoEncode = (protojs,msg)=>{
    const ProtoMsg = new protojs.Message()

    ProtoMsg.setVersion(msg.version)
    ProtoMsg.setCursorNum(msg.cursor_num)
    ProtoMsg.setCursorLabel(msg.cursor_label)
    ProtoMsg.setLifetime(msg.lifetime)
    ProtoMsg.setSender(msg.sender)
    ProtoMsg.setContract(msg.contract)
    ProtoMsg.setMethod(msg.method)
    ProtoMsg.setParam(Uint8Array.from(msg.param))
    ProtoMsg.setSigAlg(msg.sig_alg)

    return ProtoMsg.serializeBinary();
}

exports.queryProtoEncode = (protojs,msg)=>{
    const ProtoMsg = new protojs.Message()

    ProtoMsg.setUsername(msg.username)
    ProtoMsg.setRandom(msg.random)

    return ProtoMsg.serializeBinary()
}
