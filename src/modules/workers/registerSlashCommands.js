const {SlashCommandBuilder} = require('@discordjs/builders');
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');

const commands = []

class registerSlashCommands {
    constructor(data) {
        this.token = data.token
        this.clientId = data.token
    }

    addCommand(name, description) {
        commands.push(new SlashCommandBuilder().setName(name.toString()).setDescription(description.toString()))
    }

    sendCommands() {
        const rest = new REST({version: '9'}).setToken(this.token);

        rest.put(Routes.applicationCommands(this.clientId), {body: commands.map(command => command.toJSON())})
            .then(() => console.log('Registered the following slash commands please wait up to one hour for it to update in every server\n' + commands.map(command => command.name + "\n")))
            .catch(console.error);
    }
}

module.exports = registerSlashCommands;
