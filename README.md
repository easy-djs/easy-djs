# Easy DJS

This package makes bot creation avaliable for everyone. It simplifies what would be hundreds of lines of code into like 5

# Basic Bot Code

```js
const easydjs = require("easy-djs");
const prefix = "<prefix>"; // replace <prefix> with what you want the token to be
const Bot = new easydjs.Bot("<token>", prefix); // replace <token> with your token

Bot.initiate();

Bot.commands.create("kick", {
  reply: { text: "Kicked #{firstMention.tag}" },
  action: { kick: "firstMention" },
});

Bot.commands.create("ban", {
  reply: { text: "Banned #{firstMention.tag}" },
  action: { ban: "firstMention" },
});

Bot.commands.create("help", {
  reply: {
    text: `${prefix}kick <mention>\n${prefix}ban <mention>\n${prefix}help\n${prefix}av <mention>`,
  },
});

Bot.commands.create("av", {
  reply: {
    embed: {
      title: "#{firstMention.username}'s avatar",
      image: { url: "#{firstMention.avatar}" },
    },
  },
});

Bot.setStatus({ type: "watching", text: "YouTube" });
```

That is the code for a bot with the commands kick, ban and help that sets the status to "Watching YouTube"

# Command Create Required Params

### commandName:

Location `Bot.commands.create("commandName")`

### reply

| Reply Text                                          | Reply Embed                                    |
| --------------------------------------------------- | ---------------------------------------------- |
| `{reply: {text: "What should the bot reply with"}}` | `{reply: {embed: {title: "What should the title be"}}}` |

For a list of all the possible embed fields reference "https://discordjs.guide/popular-topics/embeds.html#using-an-embed-object"

# Command Create Optional Params

### action:

```
{action: {kick/ban: "firstMention"}}
```

kick/ban should the action be kicking or banning

"firstMention" who should the action be completed on

## Options

firstMention

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

# Message Variables

#### Format Example
```#{firstMention.avatar}``` - Shows the users avatar

## Possible

### .avatar
Inserts the avatar url

### .username
Inserts the username

### .tag
Inserts the tag

### Nothing
Inserts a mention for the user ex ```#{firstMention}``` inserts a mention of the first user mentioned


| Options                                             |
| --------------------------------------------------- |
| firstMention |
| author |

