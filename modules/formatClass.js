const options = ["firstUserMention", "author"];

const replaceData = {
	firstMention: message.mentions.members.first(),
	"firstMention.tag": message.mentions.users.first().tag,
	"firstMention.username": message.mentions.users.first().username,
	"firstMention.avatar": message.mentions.users.first().avatarURL(),
	author: message.author,
	"author.tag": message.author.tag,
	"author.username": message.author.username,
	"author.avatar": message.author.avatarURL(),
};

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
			options.some((el) => JSON.stringify(reply).includes(el)) &&
			!message.mentions.members.first() &&
			!message.mentions.users.first()
		) {
			return {title: cmd.noMention || "You did not mention a member"};
		} else if (JSON.stringify(reply).includes("firstMention")) {
			return JSON.parse(JSON.stringify(reply), (k, v) => {
				if (typeof v === "string") {
					return replace(v, replaceData);
				} else return v;
			});
		} else {
			return reply;
		}
	}

	formatText(reply, message, cmd) {
		if (
			options.some((el) => reply.includes(el)) &&
			!message.mentions.members.first() &&
			!message.mentions.users.first()
		) {
			return cmd.noMention || "You did not mention a member";
		} else if (reply.includes("firstMention")) {
			return replace(reply, replaceData);
		} else {
			return reply;
		}
	}
}

module.exports = formatClass;
