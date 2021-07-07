function replace(template, variables) {
	return template.replace(
		new RegExp("#{([^{]+)}", "g"),
		function (_unused, varName) {
			return variables[varName];
		}
	);
}

function setFD(fData, message) {
	Object.assign(
		fData,
		message.mentions.members.first() && {
			firstUserMention: message.mentions.members.first(),
		},
		message.mentions.members.first() && {
			"firstUserMention.tag": message.mentions.users.first().tag,
		},
		message.mentions.members.first() && {
			"firstUserMention.username": message.mentions.users.first().username,
		},
		message.mentions.members.first() && {
			"firstUserMention.avatar": message.mentions.users
				.first()
				.avatarURL({dynamic: true}),
		},
		message.author && {author: message.author},
		message.author && {"author.tag": message.author.tag},
		message.author && {"author.username": message.author.username},
		message.author && {
			"author.avatar": message.author.avatarURL({dynamic: true}),
		}
	);
}

class formatClass {
	formatEmbed(reply, message, cmd) {
		let fData = {};
		if (
			JSON.stringify(reply).includes("firstUserMention") &&
			!message.mentions.members.first() &&
			!message.mentions.users.first()
		)
			return {title: cmd.noMention || "You did not mention a member"};
		setFD(fData, message);
		return JSON.parse(JSON.stringify(reply), (k, v) => {
			if (typeof v === "string") {
				return replace(v, fData);
			} else return v;
		});
	}

	formatText(reply, message, cmd) {
		let fData = {};
		if (
			reply.includes("firstUserMention") &&
			!message.mentions.members.first() &&
			!message.mentions.users.first()
		)
			return cmd.noMention || "You did not mention a member";
		setFD(fData, message);
		let repl = replace(reply, fData);
		console.log(repl);
		return repl;
	}
}

module.exports = formatClass;
