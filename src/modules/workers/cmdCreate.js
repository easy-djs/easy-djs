const registerSlashCommands = require("./workers/registerSlashCommands")
const commandData = {};

class cmdCreate {
    constructor(data) {
        this.slash = new registerSlashCommands(data)
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
    text(cmdname, data) {
        commandData[cmdname] = data;
        console.log("Loaded Command " + cmdname);
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
    slash(cmdname, data) {
        commandData[cmdname] = data;
        console.log("Loaded Command " + cmdname);
    }

    get(cmdName) {
        return commandData[cmdName];
    }
}

module.exports = cmdCreate;