---
title: Create Text Command
nav_order: 1
parent: Commands
---

# **Bot.commands.create.text()**

## Command Name

```js
Bot.commands.create.text("help");
```

Replace help with your command name for example `Bot.commands.create.text("avatar")`
would be a command with the name avatar

## Reply

| Reply Text                                          | Reply Embed                                             |
| --------------------------------------------------- | ------------------------------------------------------- |
| `{reply: {text: "What should the bot reply with"}}` | `{reply: {embed: {title: "What should the title be"}}}` |

In the table above you can see the json for text and embed replies. You can find
all the embed fields here
[https://discordjs.guide/popular-topics/embeds.html\#using-an-embed-object](https://discordjs.guide/popular-topics/embeds.html#using-an-embed-object)

```js
Bot.commands.create.text("cmdName", {});
```

Reply data goes in the second field for example

```js
Bot.commands.create.text("Hi", {reply: {text: "Hello"}});
```

## noMention

Set the text to be sent when no one is mentioned and the command requires a mention in the command below this is the noMention field `noMention: "You did not mention anyone"`

```js
Bot.commands.create.text("av", {reply: {text: "#{firstUserMention.avatar}", noMention: "You did not mention anyone"}});
```


## noPerms

Like noMention but for actions when a user does not have permission to execute an action in the command below it is `noPerms: "But.... You Can't"`

```js
Bot.commands.create.text("kick", {reply: {text: "Kicked #{firstUserMention.username}", action: {kick: "firstUserMention"} noPerms: "But.... You Can't"}});
```

