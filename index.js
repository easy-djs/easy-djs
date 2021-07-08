const Discord = require("discord.js");
const client = new Discord.Client();
const CommandsClass = require("./modules/commandsClass.js");

class Bot {
	constructor(token = undefined, prefix = "?", muterole) {
		if (token === undefined) {
			throw "No Token Specified";
		} else {
			try {
				client.login(token);
			} catch {
				throw "Problem Logging in to Bot. Check your Token";
			}
			this.prefix = prefix;
			client.on("ready", () => {
				console.log("Logged in as " + client.user.tag);
				console.log('Prefix set to "' + this.prefix + '"');
			});
		}
		this.commands = new CommandsClass(prefix, muterole);
	}
	initiate() {
		client.on("message", (message) => {
			if (message.channel.type === `dm`) return;
			if (message.author.bot) return;
			if (!message.content.startsWith(this.prefix)) return;

			const args = message.content.slice(this.prefix.length).trim().split(/ +/);
			const command = args.shift();
			if (this.commands.exists(command)) {
				this.commands.execute(command, message);
			}
		});
	}
	setStatus(data) {
		if (!data.text || !data.type)
			throw "Status Data Must Include text and type";
		setTimeout(() => {
			client.user
				.setActivity(data.text, {type: data.type.toUpperCase()})
				.catch(console.error);
			console.log("Set status to " + data.type + " " + data.text);
		}, 3000); // Make sure bot is ready before setting status
	}
}

module.exports = {Bot};
