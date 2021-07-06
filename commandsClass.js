const commandData = {}

function format(reply, message) {
    repl = reply.toString().replace("{firstMention}", message.mentions.members.first())
    repl1 = repl.toString().replace("{firstMention.tag}", message.mentions.members.first().user.tag)
    repl2 = repl.toString().replace("{firstMention.tag}", message.mentions.members.first().username)
    return repl2
}

class CommandsClass {
    create(cmdname, data){
        if(data.actions){
          commandData[cmdname] = {reply: data.reply, action: data.action}
        }else{
        commandData[cmdname] = {reply: data.reply}
        }
    }
    exists(cmdName){
        return commandData[cmdName] != null
    }
    get(cmdName){
        return commandData[cmdName]
    }
    execute(cmdName, message){
        cmd = commandData[cmdName]
        if(cmd.action){
            switch(Object.keys(cmd.action)[0].toString()){
                case "kick":
                    switch(cmd.action.kick.toString()){
                        case "firstMention":
                            message.mentions.members.first().kick()
                            if(cmd.reply){
                                message.channel.send(format(cmd.reply, message))
                            }
                        default:
                            throw "Who should be kicked\n\nOptions:\nfirstMention"
                    }
                case "ban":
                    switch(cmd.action.ban.toString()){
                        case "firstMention":
                            message.mentions.members.first().ban()
                            if(cmd.reply){
                                message.channel.send(format(cmd.reply, message))
                            }
                        default:
                            throw "Who should be banned\n\nOptions\nfirstMention"
                    }
                default:
                    throw "What action should happen\n\nOptions:\nkick\nban"
            }
        }
    }
}