const actionClass = require("./workers/actionClass");
const formatClass = require("./workers/formatClass");
const cmdClass = require("./workers/cmdCreate");
const slashExecute = require("./executeCommand/slashExecute")
const messageExecute = require("./executeCommand/messageExecute")

class CommandsClass {
    constructor(prefix, muteData) {
        this.format = new formatClass(prefix);
        this.actions = new actionClass(this.format);
        this.muterole = muteData
        this.create = new cmdClass();
        this.slash = new slashExecute(this.format, this.create)
        this.message = new messageExecute(this.format, this.create, this.actions, this.muterole)
    }

    exists(cmdName) {
        return this.create.get(cmdName) != null;
    }

    getSlash(cmdName) {
        return this.create.getSlash(cmdName);
    }
}

module.exports = CommandsClass;
