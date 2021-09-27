function replace(template, variables) {
    return template.replace(
        new RegExp("#{([^{]+)}", "g"),
        function (_unused, varName) {
            return variables[varName];
        }
    );
}

function setFD(fData, message, prefix) {
    Object.assign(
        fData,
        message.mentions.members.first() && {
            firstUserMention: message.mentions.members.first(),
        },
        message.mentions.members.first() && {
            "firstUserMention.tag": message.mentions.users.first().tag,
        },
        message.mentions.members.first() && {
            "firstUserMention.username": message.mentions.users.first().username,
        },
        message.mentions.members.first() && {
            "firstUserMention.avatar": message.mentions.users
                .first()
                .avatarURL({dynamic: true}),
        }
    );
    Object.assign(fData, {
        author: message.author,
        "author.tag": message.author.tag,
        "author.username": message.author.username,
        "author.avatar": message.author.avatarURL({dynamic: true}),
    });
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    args.shift();
    fData["args"] = args;
    fData["msg"] = args.join(" ")
    for (arg in args) {
        fData["arg" + arg] = args[arg];
    }
}
module.exports = {replace, setFD}