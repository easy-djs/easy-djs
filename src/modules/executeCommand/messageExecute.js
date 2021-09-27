class messageExecute {
    constructor(format, create) {
        this.format = format
        this.create = create
    }

    execute(cmdName, message) {
        let cmd = this.create.get(cmdName);
        if (!cmd.action) {
            if (cmd.reply.text) {
                message.channel.send(
                    this.format.formatText(cmd.reply.text, message, cmd)
                );
            } else if (cmd.reply.embed) {
                message.channel.send({
                    embed: this.format.formatEmbed(cmd.reply.embed, message, cmd),
                });
            }
        } else {
            switch (Object.keys(cmd.action)[0].toString()) {
                case "kick":
                    this.actions.kick(cmd, message);
                    break;
                case "ban":
                    this.actions.ban(cmd, message);
                    break;
                case "mute":
                    this.actions.mute(cmd, message, this.muterole[message.guild.id]);
                    break;
                case "unmute":
                    this.actions.unmute(cmd, message, this.muterole[message.guild.id]);
                    break;
                case "purge":
                    this.actions.purge(cmd, message);
                    break;
                default:
                    throw "What action should happen\n\nOptions:\nkick\nban\nmute\nunmute\npurge";
            }
        }
    }
}