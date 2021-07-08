const formatClass = require("./formatClass");

class actionClass {
	constructor() {
		this.format = new formatClass();
	}
	kick(cmd, message) {
		if (!message.mentions.members.first() && !message.mentions.users.first())
			if (cmd.reply.embed)
				return message.channel.send({
					embed: {title: cmd.noMention || "You did not mention a member"},
				});
		if (!cmd.reply.embed)
			return message.channel.send(
				cmd.noMention || "You did not mention a member"
			);

		if (
			!message.member.permissions.has("KICK_MEMBERS") ||
			message.member.roles.highest.position <=
				message.mentions.members.first().roles.highest.position
		)
			if (cmd.reply.embed)
				return message.channel.send({
					embed: {
						title: cmd.noPerms || "You do not have permission to do this",
					},
				});
		if (!cmd.reply.embed)
			return message.channel.send(
				cmd.noPerms || "You did not mention a member"
			);

		switch (cmd.action.kick.toString()) {
			case "firstUserMention":
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
				throw "Who should be kicked\n\nOptions:\nfirstUserMention";
		}
	}

	ban(cmd, message) {
		if (!message.mentions.members.first() && !message.mentions.users.first())
			if (cmd.reply.embed)
				return message.channel.send({
					embed: {title: cmd.noMention || "You did not mention a member"},
				});
		if (!cmd.reply.embed)
			return message.channel.send(
				cmd.noMention || "You did not mention a member"
			);

		if (
			!message.member.permissions.has("BAN_MEMBERS") ||
			message.member.roles.highest.position <=
				message.mentions.members.first().roles.highest.position
		)
			if (cmd.reply.embed)
				return message.channel.send({
					embed: {
						title: cmd.noPerms || "You do not have permission to do this",
					},
				});
		if (!cmd.reply.embed)
			return message.channel.send(
				cmd.noPerms || "You did not mention a member"
			);
		switch (cmd.action.ban.toString()) {
			case "firstUserMention":
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
				throw "Who should be banned\n\nOptions\nfirstUserMention";
		}
	}
	mute(cmd, message, mRole = undefined) {
		if (!message.mentions.members.first() && !message.mentions.users.first())
			if (cmd.reply.embed)
				return message.channel.send({
					embed: {title: cmd.noMention || "You did not mention a member"},
				});
		if (!cmd.reply.embed)
			return message.channel.send(
				cmd.noMention || "You did not mention a member"
			);

		if (
			!message.member.permissions.has("MANAGE_ROLES") ||
			message.member.roles.highest.position <=
				message.mentions.members.first().roles.highest.position
		)
			if (cmd.reply.embed)
				return message.channel.send({
					embed: {
						title: cmd.noPerms || "You do not have permission to do this",
					},
				});
		if (!cmd.reply.embed)
			return message.channel.send(
				cmd.noPerms || "You did not mention a member"
			);
		switch (cmd.action.mute.toString()) {
			case "firstUserMention":
				if (
					message.client.member.roles.highest.position <=
					message.mentions.members.first().roles.highest.position
				)
					return message.channel.send("I cannot mute that user");
				if (mRole === undefined) throw "No Mute Role Set";
				message.mentions.members.first().roles.add(mRole.toString());
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
				throw "Who should be muted\n\nOptions\nfirstUserMention";
		}
	}
	unmute(cmd, message, mRole = undefined) {
		if (!message.mentions.members.first() && !message.mentions.users.first())
			if (cmd.reply.embed)
				return message.channel.send({
					embed: {title: cmd.noMention || "You did not mention a member"},
				});
		if (!cmd.reply.embed)
			return message.channel.send(
				cmd.noMention || "You did not mention a member"
			);

		if (
			!message.member.permissions.has("MANAGE_ROLES") ||
			message.member.roles.highest.position <=
				message.mentions.members.first().roles.highest.position
		)
			if (cmd.reply.embed)
				return message.channel.send({
					embed: {
						title: cmd.noPerms || "You do not have permission to do this",
					},
				});
		if (!cmd.reply.embed)
			return message.channel.send(
				cmd.noPerms || "You did not mention a member"
			);
		switch (cmd.action.unmute.toString()) {
			case "firstUserMention":
				if (
					message.client.member.roles.highest.position <=
					message.mentions.members.first().roles.highest.position
				)
					return message.channel.send("I cannot Unmute that user");
				if (mRole === undefined) throw "No Mute Role Set";
				message.mentions.members.first().roles.remove(mRole.toString());
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
				throw "Who should be unmuted\n\nOptions\nfirstUserMention";
		}
	}
	purge(cmd, message) {
		let formated = this.format.formatText(cmd.action.purge, message, cmd);
		if (isNaN(Number(formated))) throw "Amount must be a number";
		if (Number(formated) > 100) throw "Amount must be less than 100";
		message.channel.bulkDelete(Number(formated));
		if (cmd.reply.text) {
			message.channel.send(
				this.format.formatText(cmd.reply.text, message, cmd)
			);
		} else if (cmd.reply.embed) {
			message.channel.send({
				embed: this.format.formatEmbed(cmd.reply.embed, message, cmd),
			});
		}
	}
}

module.exports = actionClass;
