const actions = require("../actions/actions")

class actionClass {
    constructor(format) {
        this.format = format;
    }

    ban(cmd, message) {
        actions.ban(cmd, message, this.format)
    }

    kick(cmd, message) {
        actions.kick(cmd, message, this.format)
    }

    mute(cmd, message, mRole = undefined) {
        actions.mute(cmd, mRole, this.format)
    }

    purge(cmd, message) {
        actions.purge(cmd, message, this.format)
    }

    unmute(cmd, message, mRole = undefined) {
        actions.unmute(cmd, message, mRole, this.format)
    }
}

module.exports = actionClass;
