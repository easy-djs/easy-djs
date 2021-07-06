# Easy DJS
This package makes bot creation avaliable for everyone. It simplifies what would be hundreds of lines of code into like 5

# Basic Bot Code
```js
const easydjs = require("easy-djs")
const prefix = "<prefix>"
const Bot = new easydjs.Bot("<token>", prefix)

Bot.initiate()

Bot.commands.create("kick", {reply: "Kicked {firstMention.tag}", action: {kick: "firstMention"}})

Bot.commands.create("ban", {reply: "Banned {firstMention.tag}", action: {ban: "firstMention"}})

Bot.commands.create("help", {reply: `${prefix}kick <mention>\n${prefix}ban <mention>\n${prefix}help`})

Bot.setStatus({type: "watching", text: "YouTube"})
```
That is the code for a bot with the commands kick, ban and help that sets the status to "Watching YouTube"

# Command Create Required Params

### commandName: 
Location ```Bot.commands.create("commandName")```

### reply: 
{reply: "What should the bot reply with"}

# Command Create Optional Params

### action:
```
{action: {kick/ban: "firstMention"}}
```
kick/ban should the action be kicking or banning

"firstMention" who should the action be completed on options firstMention

### noMention:
```
{noMention: "what should be sent when no one is mentioned"}
```

### noPerms:
```
{noPerms: "What should be sent when a user does not have permission to use a command"}
```

# SetStatus Required Params

### type:
```
{type: "status type options: watching, playing, listening"}
```

### text:
```
{text: "the text shown after the type"}
```