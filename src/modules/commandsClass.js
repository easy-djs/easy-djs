const actionClass = require("./workers/actionClass");
const formatClass = require("./workers/formatClass");
const cmdClass = require("./workers/cmdCreate");
const slashExecute = require("./workers/slashExecute")

class CommandsClass {
    constructor(prefix, muteData, slashCmdData) {
        this.format = new formatClass(prefix);
        this.actions = new actionClass(this.format);
        this.muterole = muteData
        this.create = new cmdClass(slashCmdData);
        this.slash = new slashExecute(this.format, this.create)
    }

    exists(cmdName) {
        return this.create.get(cmdName) != null;
    }

    getSlash(cmdName) {
        return this.create.getSlash(cmdName);
    }
}

module.exports = CommandsClass;
