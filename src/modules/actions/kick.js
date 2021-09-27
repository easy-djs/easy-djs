module.exports = function kick(cmd, message, format) {
    if (!message.mentions.members.first() && !message.mentions.users.first())
        if (cmd.reply.embed)
            return message.channel.send({
                embed: {title: cmd.noMention || "You did not mention a member"},
            });
    if (!cmd.reply.embed)
        return message.channel.send(
            cmd.noMention || "You did not mention a member"
        );

    if (
        !message.member.permissions.has("KICK_MEMBERS") ||
        message.member.roles.highest.position <=
        message.mentions.members.first().roles.highest.position
    )
        if (cmd.reply.embed)
            return message.channel.send({
                embed: {
                    title: cmd.noPerms || "You do not have permission to do this",
                },
            });
    if (!cmd.reply.embed)
        return message.channel.send(
            cmd.noPerms || "You did not mention a member"
        );

    switch (cmd.action.kick.toString()) {
        case "firstUserMention":
            if (message.mentions.members.first().kickable === false)
                return message.channel.send("I cannot kick that user");
            message.mentions.members.first().kick();
            if (cmd.reply.text) {
                message.channel.send(
                    format.formatText(cmd.reply.text, message, cmd)
                );
            } else if (cmd.reply.embed) {
                message.channel.send({
                    embed: format.formatEmbed(cmd.reply.embed, message, cmd),
                });
            }
            break;
        default:
            throw "Who should be kicked\n\nOptions:\nfirstUserMention";
    }
}