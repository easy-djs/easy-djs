module.exports = function purge(cmd, message, format) {
    let formatted = format.formatText(cmd.action.purge, message, cmd);
    if (isNaN(Number(formatted))) throw "Amount must be a number";
    if (Number(formatted) > 100) throw "Amount must be less than 100";
    message.channel.bulkDelete(Number(formatted));
    if (cmd.reply.text) {
        message.channel.send(
            format.formatText(cmd.reply.text, message, cmd)
        );
    } else if (cmd.reply.embed) {
        message.channel.send({
            embed: format.formatEmbed(cmd.reply.embed, message, cmd),
        });
    }
}