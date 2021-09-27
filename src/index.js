const Discord = require("discord.js");
const intents = new Discord.Intents();
intents.add(Discord.Intents.FLAGS.GUILD_MESSAGES,Discord.Intents.FLAGS.GUILDS)
const client = new Discord.Client({intents: intents});
const CommandsClass = require("./modules/commandsClass.js");

class Bot {
    /**
     * @param {string} token What is the bots token
     * @param {string} prefix What Should The prefix be
     * @param {Object.<string, string|number>} muteData The muterole data in an array {"serverid": "role id"}
     */
    constructor(token = undefined, prefix = "?", muteData) {
        if (token === undefined) {
            throw "No Token Specified";
        } else {
            try {
                client.login(token);
            } catch {
                throw "Problem Logging in to Bot. Check your Token";
            }
            this.prefix = prefix;
            this.commands = new CommandsClass(prefix, muteData);
            client.on("ready", () => {
                console.log("Logged in as " + client.user.tag);
                console.log('Prefix set to "' + this.prefix + '"');
                this.commands.create.slashData.addData({token: token, clientId: client.user.id})
            });
        }
    }

    sendCommands() {
        this.commands.create.slashData.sendCommands()
    }

    initiate() {
        client.on("messageCreate", (message) => {
            if (message.channel.type === `dm`) return;
            if (message.author.bot) return;
            if (!message.content.startsWith(this.prefix)) return;

            const args = message.content.slice(this.prefix.length).trim().split(/ +/);
            const command = args.shift();
            if (this.commands.exists(command)) {
                this.commands.message.execute(command, message);
            }
        });

        client.on('interactionCreate', interaction => {
            if (!interaction.isCommand()) return;
            const {commandName} = interaction;
            this.commands.slash.execute(commandName, interaction)
        });
    }

    /**
     * @param {Object} statusData
     * @param {string} statusData.text What Should The Text Be
     * @param {string} statusData.type What kind of status watching, listening, playing
     */
    setStatus(statusData) {
        if (!statusData.text || !statusData.type)
            throw "Status Data Must Include text and type";
        setTimeout(() => {
            client.user
                .setActivity(statusData.text, {type: statusData.type.toUpperCase()});
            console.log("Set status to " + statusData.type + " " + statusData.text);
        }, 3000); // Make sure bot is ready before setting status
    }
}

module.exports = {Bot};
