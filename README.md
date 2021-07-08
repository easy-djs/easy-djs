---
nav_order: 1
---
## Easy DJS

This package makes bot creation available for everyone. It simplifies what would be hundreds of lines of code into like 5.

## Basic Bot Code

```javascript
const easydjs = require("easy-djs");
const prefix = "<prefix>"; // replace <prefix> with what you want the token to be
const Bot = new easydjs.Bot("<token>", prefix); // replace <token> with your token

Bot.initiate();

Bot.commands.create("kick", {
  reply: { text: "Kicked #{firstUserMention.tag}" },
  action: { kick: "firstUserMention" },
});

Bot.commands.create("ban", {
  reply: { text: "Banned #{firstUserMention.tag}" },
  action: { ban: "firstUserMention" },
});

Bot.commands.create("help", {
  reply: {
    text: `${prefix}kick <mention>\n${prefix}ban <mention>\n${prefix}help\n${prefix}av <mention>`,
  },
});

Bot.commands.create("av", {
  reply: {
    embed: {
      title: "#{firstUserMention.username}'s avatar",
      image: { url: "#{firstUserMention.avatar}" },
    },
  },
});

Bot.setStatus({ type: "watching", text: "YouTube" });
```

That is the code for a bot with the commands kick, ban and help that sets the status to "Watching YouTube"

## Command Create Required Params

#### commandName:

Location `Bot.commands.create("commandName")`

#### reply

| Reply Text | Reply Embed |
| :--- | :--- |
| `{reply: {text: "What should the bot reply with"}}` | `{reply: {embed: {title: "What should the title be"}}}` |

For a list of all the possible embed fields reference "[https://discordjs.guide/popular-topics/embeds.html\#using-an-embed-object](https://discordjs.guide/popular-topics/embeds.html#using-an-embed-object)"

## Command Create Optional Params

#### action:

```text
{action: {kick/ban: "firstUserMention"}}
```

kick/ban should the action be kicking or banning

"firstUserMention" who should the action be completed on

### Options

firstUserMention

#### noMention:

```text
{noMention: "what should be sent when no one is mentioned"}
```

#### noPerms:

```text
{noPerms: "What should be sent when a user does not have permission to use a command"}
```

## SetStatus Required Params

#### type:

```text
{type: "status type options: watching, playing, listening"}
```

#### text:

```text
{text: "the text shown after the type"}
```

## Message Variables

**Format Example**

`#{firstUserMention.avatar}` - Shows the users avatar

### Possible

#### .avatar

Inserts the avatar url

#### .username

Inserts the username

#### .tag

Inserts the tag

#### Nothing

Inserts a mention for the user ex `#{firstUserMention}` inserts a mention of the first user mentioned

| Options |
| :--- |
| firstUserMention |
| author |

