class slashCommandExecution {
    constructor(format) {
        this.format = format
    }
    execute(commandName, interaction) {
        if (cmd.reply.text) {
            message.channel.send(
                this.format.formatText(cmd.reply.text, message, cmd)
            );
        } else if (cmd.reply.embed) {
            message.channel.send({
                embed: this.format.formatEmbed(cmd.reply.embed, message, cmd),
            });
        }
    }
}