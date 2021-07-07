const options = ["firstUserMention", "author"];

function replace(template, variables) {
	return template.replace(
		new RegExp("#{([^{]+)}", "g"),
		function (_unused, varName) {
			return variables[varName];
		}
	);
}

class formatClass {
	formatEmbed(reply, message, cmd) {
		if (
			JSON.stringify(reply).includes("firstUserMention") &&
			!message.mentions.members.first() &&
			!message.mentions.users.first()
		) {
			return {title: cmd.noMention || "You did not mention a member"};
		} else if (options.some((el) => JSON.stringify(reply).includes(el))) {
			if (!message.mentions.members.first()) {
				return JSON.parse(JSON.stringify(reply), (k, v) => {
					if (typeof v === "string") {
						return replace(v, {
							author: message.author,
							"author.tag": message.author.tag,
							"author.username": message.author.username,
							"author.avatar": message.author.avatarURL(),
						});
					} else return v;
				});
			} else {
				return JSON.parse(JSON.stringify(reply), (k, v) => {
					if (typeof v === "string") {
						return replace(v, {
							firstUserMention: message.mentions.members.first(),
							"firstUserMention.tag": message.mentions.users.first().tag,
							"firstUserMention.username":
								message.mentions.users.first().username,
							"firstUserMention.avatar": message.mentions.users
								.first()
								.avatarURL(),
							author: message.author,
							"author.tag": message.author.tag,
							"author.username": message.author.username,
							"author.avatar": message.author.avatarURL(),
						});
					} else return v;
				});
			}
		} else {
			return reply;
		}
	}

	formatText(reply, message, cmd) {
		if (
			reply.includes("firstUserMention") &&
			!message.mentions.members.first() &&
			!message.mentions.users.first()
		) {
			return cmd.noMention || "You did not mention a member";
		} else if (options.some((el) => reply.includes(el))) {
			if (!message.mentions.members.first()) {
				return replace(reply, {
					author: message.author,
					"author.tag": message.author.tag,
					"author.username": message.author.username,
					"author.avatar": message.author.avatarURL(),
				});
			} else {
				return replace(reply, {
					firstUserMention: message.mentions.members.first(),
					"firstUserMention.tag": message.mentions.users.first().tag,
					"firstUserMention.username": message.mentions.users.first().username,
					"firstUserMention.avatar": message.mentions.users.first().avatarURL(),
					author: message.author,
					"author.tag": message.author.tag,
					"author.username": message.author.username,
					"author.avatar": message.author.avatarURL(),
				});
			}
		} else {
			return reply;
		}
	}
}

module.exports = formatClass;
