const actionClass = require("./actionClass");
const formatClass = require("./formatClass");

const commandData = {};

class CommandsClass {
	constructor(prefix, muterole) {
		this.format = new formatClass(prefix);
		this.actions = new actionClass();
		this.muterole = muterole;
	}
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
					this.actions.purge(cmd, messagee);
					break;
				default:
					throw "What action should happen\n\nOptions:\nkick\nban\nmute\nunmute\npurge";
			}
		}
	}
}

module.exports = CommandsClass;
