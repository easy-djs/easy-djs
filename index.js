const Discord = require("discord.js");
const client = new Discord.Client();
let commandData = {}

class CommandsClass {
    create(cmdname, reply){
        commandData[cmdname] = {reply: reply}
    }
    exists(cmdName){
        return commandData[cmdName] != null
    }
    get(cmdName){
        return commandData[cmdName]
    }
}

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
			const command = args.shift().toLowerCase();
            if(this.commands.exists(command)){
                message.channel.send(this.commands.get(command).reply)
            }
		});
	}
}

module.exports = {Bot};
