module.exports = function ban(cmd, message, format) {
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
        !message.member.permissions.has("BAN_MEMBERS") ||
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
    switch (cmd.action.ban.toString()) {
        case "firstUserMention":
            if (message.mentions.members.first().bannable === false)
                return message.channel.send("I cannot ban that user");
            message.mentions.members.first().ban();
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
            throw "Who should be banned\n\nOptions\nfirstUserMention";
    }
}