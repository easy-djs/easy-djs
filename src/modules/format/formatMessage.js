const formatFunctions = require("../format/formatFunctions")

class formatMessage {
    constructor(prefix) {
        this.prefix = prefix
    }

    formatEmbed(reply, message, cmd) {
        let fData = {};
        if (
            JSON.stringify(reply).includes("firstUserMention") &&
            !message.mentions.members.first() &&
            !message.mentions.users.first()
        )
            return {title: cmd.noMention || "You did not mention a member"};
        formatFunctions.setFD(fData, message, this.prefix);
        return JSON.parse(JSON.stringify(reply), (k, v) => {
            if (typeof v === "string") {
                return formatFunctions.replace(v, fData);
            } else return v;
        });
    }

    formatText(reply, message, cmd) {
        let fData = {};
        if (
            reply.includes("firstUserMention") &&
            !message.mentions.members.first() &&
            !message.mentions.users.first()
        )
            return cmd.noMention || "You did not mention a member";
        formatFunctions.setFD(fData, message, this.prefix);
        let repl = formatFunctions.replace(reply, fData, this.prefix);
        return repl;
    }
}

module.exports = formatMessage