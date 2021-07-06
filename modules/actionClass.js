const formatClass = require("./formatClass");

class actionClass {
	constructor() {
		this.format = new formatClass();
	}
	kick(cmd, message) {
		if (!message.mentions.members.first() && !message.mentions.users.first())
			return message.channel.send(
				cmd.noMention || "You did not mention a member"
			);

		if (!message.member.permissions.has("KICK_MEMBERS"))
			return message.channel.send(
				cmd.noPerms || "You do not have permission to use this command"
			);
		switch (cmd.action.kick.toString()) {
			case "firstMention":
				if (message.mentions.members.first().kickable === false)
					return message.channel.send("I cannot kick that user");
				message.mentions.members.first().kick();
				if (cmd.reply.text) {
					message.channel.send(
						this.format.formatText(cmd.reply.text, message, cmd)
					);
				} else if (cmd.reply.embed) {
					message.channel.send({
						embed: this.format.formatEmbed(cmd.reply.embed, message, cmd),
					});
				}
				break;
			default:
				throw "Who should be kicked\n\nOptions:\nfirstMention";
		}
	}

	ban(cmd, message) {
		if (!message.mentions.members.first() && !message.mentions.users.first())
			return message.channel.send(
				cmd.noMention || "You did not mention a member"
			);
		if (!message.member.permissions.has("BAN_MEMBERS"))
			return message.channel.send(
				cmd.noPerms || "You do not have permission to use this command"
			);
		switch (cmd.action.ban.toString()) {
			case "firstMention":
				if (message.mentions.members.first().bannable === false)
					return message.channel.send("I cannot ban that user");
				message.mentions.members.first().ban();
				if (cmd.reply.text) {
					message.channel.send(
						this.format.formatText(cmd.reply.text, message, cmd)
					);
				} else if (cmd.reply.embed) {
					message.channel.send({
						embed: this.format.formatEmbed(cmd.reply.embed, message, cmd),
					});
				}
				break;
			default:
				throw "Who should be banned\n\nOptions\nfirstMention";
		}
	}
}

module.exports = actionClass;
