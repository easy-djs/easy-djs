class slashExecute {
    constructor(format, create) {
        this.format = format
        this.create = create
    }

    execute(commandName, interaction) {
        let cmd = this.create.getSlash(commandName)
        if (cmd.reply.text) {
            interaction.reply(cmd.reply.text)
        } else if (cmd.reply.embed) {
            interaction.reply(cmd.reply.embed)
        }
    }
}