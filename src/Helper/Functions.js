const Baileys = require("baileys");

function checkOwner(jid, owner, fromMe) {
    if (!Baileys.isPnUser(jid)) return false;
    return fromMe ? fromMe : owner.some(o => Baileys.areJidsSameUser(o + Baileys.S_WHATSAPP_NET, jid));
}

function getBodyFromMsg(msg) {
    const BODY_HANDLERS = {
        conversation: (message) => message.conversation || "",
        extendedTextMessage: (message) => message.extendedTextMessage?.text || "",
        imageMessage: (message) => message.imageMessage?.caption || "",
        videoMessage: (message) => message.videoMessage?.caption || "",
        documentMessageWithCaption: (message) => message.documentMessageWithCaption?.caption || "",
        protocolMessage: (message) =>
            getBodyFromMsg({
                message: message.protocolMessage?.editedMessage || ""
            }),
        buttonsMessage: (message) => message.buttonsMessage?.contentText || "",
        interactiveMessage: (message) => message.interactiveMessage?.body?.text || "",
        buttonsResponseMessage: (message) => message.buttonsResponseMessage?.selectedButtonId || "",
        listResponseMessage: (message) => message.listResponseMessage?.singleSelectReply?.selectedRowId || "",
        templateButtonReplyMessage: (message) => message.templateButtonReplyMessage?.selectedId || "",
        interactiveResponseMessage: (message) => message.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson ? JSON.parse(message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson)?.id || "" : ""
    };
    return BODY_HANDLERS[Baileys.getContentType(msg.message)]?.(msg.message);
}

function getDb(collection, jid) {
    if (collection.name === "bot") {
        if (!collection.has(bot => bot.jid === "bot"))
            collection.create({
                jid: "bot"
            });
        return collection.get(bot => bot.jid === "bot");
    }

    if (collection.name === "users" && Baileys.isLidUser(jid)) {
        if (!collection.has(user => Baileys.areJidsSameUser(user.jid, jid)))
            collection.create({
                jid
            });
        return collection.get(user => Baileys.areJidsSameUser(user.jid, jid));
    }

    if (collection.name === "groups" && Baileys.isJidGroup(jid)) {
        if (!collection.has(group => Baileys.areJidsSameUser(group.jid, jid)))
            collection.create({
                jid
            });
        return collection.get(group => Baileys.areJidsSameUser(group.jid, jid));
    }

    return null;
}

function getId(jid) {
    return Baileys.jidDecode(jid)?.user || jid;
}

function getMessageType(message) {
    return Baileys.getContentType(Baileys.extractMessageContent(message));
}

function getPushName(jid, db) {
    if (!Baileys.isLidUser(jid)) return "Unknown";
    const users = db.getCollection("users");
    const userDb = getDb(users, jid);
    return userDb?.pushName || "Unknown";
}

module.exports = {
    checkOwner,
    getBodyFromMsg,
    getDb,
    getId,
    getMessageType,
    getPushName
};