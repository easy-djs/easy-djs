const Discord = require("discord.js");
const client = new Discord.Client();
const CommandsClass = require("./commandsClass.js")

class Bot {
	constructor(token = undefined, prefix = "?") {
		if (token === undefined) {
			throw "No Token Specified";
		} else {
			try {
				client.login(token);
			} catch {
				throw "Problem Logging in to Bot. Check your Token";
			}
			this.prefix = prefix
            client.on("ready", () => {
            console.log("Logged in as " + client.user.tag)
            console.log("Prefix set to " + this.prefix)
            })
		}
        this.commands = new CommandsClass()
	}
	initiate() {
		client.on("message", (message) => {
			if (message.channel.type === `dm`) return;
			if (message.author.bot) return;
			if (!message.content.startsWith(this.prefix)) return;

			const args = message.content.slice(this.prefix.length).trim().split(/ +/);
			const command = args.shift()
            if(this.commands.exists(command)){
                this.commands.execute(command, message)
            }
		});
	}
}

module.exports = {Bot};
