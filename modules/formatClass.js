function replace(template, variables) {
	return template.replace(
		new RegExp("#{([^{]+)}", "g"),
		function (_unused, varName) {
			return variables[varName];
		}
	);
}

function setFD(fData, message, prefix) {
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
		}
	);
	Object.assign(fData, {
		author: message.author,
		"author.tag": message.author.tag,
		"author.username": message.author.username,
		"author.avatar": message.author.avatarURL({dynamic: true}),
	});
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	args.shift();
	fData["args"] = args;
	console.log(fData["args"] + " " + args);
	for (arg in args) {
		console.log(arg);
		fData["arg" + arg] = args[arg];
	}
}

class formatClass {
	constructor(prefix) {
		this.prefix = prefix;
	}
	formatEmbed(reply, message, cmd) {
		let fData = {};
		if (
			JSON.stringify(reply).includes("firstUserMention") &&
			!message.mentions.members.first() &&
			!message.mentions.users.first()
		)
			return {title: cmd.noMention || "You did not mention a member"};
		setFD(fData, message, this.prefix);
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
		let repl = replace(reply, fData, this.prefix);
		console.log(repl);
		return repl;
	}
}

module.exports = formatClass;
