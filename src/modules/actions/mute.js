module.exports = function mute(cmd, message, mRole, format) {
    if (
        !message.mentions.members.first() &&
        !message.mentions.members.first()
    ) {
        if (cmd.reply.embed)
            return message.channel.send({
                embed: {title: cmd.noMention || "You did not mention a member"},
            });
        if (!cmd.reply.embed)
            return message.channel.send(
                cmd.noMention || "You did not mention a member"
            );
    }
    if (
        !message.member.permissions.has("MANAGE_ROLES") ||
        message.member.roles.highest.position <=
        message.mentions.members.first().roles.highest.position
    ) {
        if (cmd.reply.embed)
            return message.channel.send({
                embed: {
                    title: cmd.noPerms || "You do not have permission to do this",
                },
            });
        if (!cmd.reply.embed)
            return message.channel.send(
                cmd.noPerms || "You do not have permission to do this"
            );
    }
    switch (cmd.action.mute.toString()) {
        case "firstUserMention":
            if (
                message.guild.me.roles.highest.position <=
                message.mentions.members.first().roles.highest.position
            )
                return message.channel.send("I cannot mute that user");
            if (mRole === undefined) throw "No Mute Role Set";
            message.mentions.members.first().roles.add(mRole.toString());
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
            throw "Who should be muted\n\nOptions\nfirstUserMention";
    }
}