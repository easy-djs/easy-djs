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
			JSON.stringify(reply).includes("firstMention") &&
			!message.mentions.members.first() &&
			!message.mentions.users.first()
		) {
			return {title: cmd.noMention || "You did not mention a member"};
		} else if (JSON.stringify(reply).includes("firstMention")) {
			return JSON.parse(JSON.stringify(reply), (k, v) => {
				if (typeof v === "string") {
					return replace(v, {
						firstMention: message.mentions.members.first(),
						"firstMention.tag": message.mentions.users.first().tag,
						"firstMention.username": message.mentions.users.first().username,
						"firstMention.avatar": message.mentions.users.first().avatarURL(),
					});
				} else return v;
			});
		} else {
			return reply;
		}
	}

	formatText(reply, message, cmd) {
		if (
			reply.includes("firstMention") &&
			!message.mentions.members.first() &&
			!message.mentions.users.first()
		) {
			return cmd.noMention || "You did not mention a member";
		} else if (reply.includes("firstMention")) {
			return replace(reply, {
				firstMention: message.mentions.members.first(),
				"firstMention.tag": message.mentions.users.first().tag,
				"firstMention.username": message.mentions.users.first().username,
				"firstMention.avatar": message.mentions.users.first().avatarURL(),
			});
		} else {
			return reply;
		}
	}
}

module.exports = formatClass;
