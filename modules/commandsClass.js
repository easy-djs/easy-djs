const actionClass = require("./actionClass");
const formatClass = require("./formatClass");

const commandData = {};

class CommandsClass {
    constructor(prefix, muterole) {
        this.format = new formatClass(prefix);
        this.actions = new actionClass(this.format);
        this.muterole = muterole.toString();
    }

    /**
     * @param {string} cmdname Command Name
     * @param {Object} data
     * @param {Object} data.reply
     * @param {Object} [data.reply.action]
     * @param {string} [data.reply.action.kick] Who are we Kicking
     * @param {string} [data.reply.action.ban] Who are we Banning
     * @param {string} [data.reply.action.mute] Who are we Muting
     * @param {string} [data.reply.action.unmute] Who are we Unmuting
     * @param {string} [data.reply.action.purge] How many messages are we purging (1 to 100)
     * @param {Object.<string, string|Object.<string, string>>} data.reply.embed DiscordJS Embed Field Data
     * @param {string} data.reply.text What should the bot reply with (Text Reply)
     * @param {string} [data.noMention] What should the bot say when a mention is required but no mention is given (Not Required)
     * @param {string} [data.noPerms] What should the bot say when permissions are required but the user does not have them (Not Required)
     */
    create(cmdname, data) {
        commandData[cmdname] = data;
        console.log("Loaded Command " + cmdname);
    }

    exists(cmdName) {
        return commandData[cmdName] != null;
    }

    get(cmdName) {
        return commandData[cmdName];
    }

    execute(cmdName, message) {
        let cmd = commandData[cmdName];
        if (!cmd.action) {
            if (cmd.reply.text) {
                message.channel.send(
                    this.format.formatText(cmd.reply.text, message, cmd)
                );
            } else if (cmd.reply.embed) {
                message.channel.send({
                    embed: this.format.formatEmbed(cmd.reply.embed, message, cmd),
                });
            }
        } else {
            switch (Object.keys(cmd.action)[0].toString()) {
                case "kick":
                    this.actions.kick(cmd, message);
                    break;
                case "ban":
                    this.actions.ban(cmd, message);
                    break;
                case "mute":
                    this.actions.mute(cmd, message, this.muterole);
                    break;
                case "unmute":
                    this.actions.unmute(cmd, message, this.muterole);
                    break;
                case "purge":
                    this.actions.purge(cmd, message);
                    break;
                default:
                    throw "What action should happen\n\nOptions:\nkick\nban\nmute\nunmute\npurge";
            }
        }
    }
}

module.exports = CommandsClass;
