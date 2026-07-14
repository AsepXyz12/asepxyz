module.exports = {
    Baileys: require("baileys"),
    Client: require("./Classes/Client.js"),
    CommandHandler: require("./Classes/CommandHandler.js"),
    Config: require("./Classes/Config.js"),
    Cooldown: require("./Classes/Cooldown.js"),
    Events: require("./Constant/Events.js"),
    Formatter: require("./Helper/Formatter.js"),
    MessageType: require("./Constant/MessageType.js"),
    VCardBuilder: require("./Classes/Builder/VCard.js"),
    Gktw: {
        didYouMean: require("didyoumean")
    }
};