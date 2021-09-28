---
title: Create Slash Command
nav_order: 2
parent: Commands
---

# **Bot.commands.create.slash()**

## Command Name

```js
Bot.commands.create.slash("help");
```

Replace help with your command name for example `Bot.commands.create.slash("avatar")`
would be a command with the name avatar

## Command Description

```js
Bot.commands.create.slash("name", "description");
```

Replace description with your command name for example `Bot.commands.create.slash("help", "gives command info")`

## Reply

| Reply Text                                          | Reply Embed                                             |
| --------------------------------------------------- | ------------------------------------------------------- |
| `{reply: {text: "What should the bot reply with"}}` | `{reply: {embed: {title: "What should the title be"}}}` |

In the table above you can see the json for text and embed replies. You can find
all the embed fields here
[https://discordjs.guide/popular-topics/embeds.html\#using-an-embed-object](https://discordjs.guide/popular-topics/embeds.html#using-an-embed-object)

```js
Bot.commands.create.slash("cmdName", "desc", {});
```

Reply data goes in the second field for example

```js
Bot.commands.create.slash("Hi", "desc", {reply: {text: "Hello"}});
```

