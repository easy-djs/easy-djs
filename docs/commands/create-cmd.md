---
title: Create Command
nav_order: 1
parent: Commands
---

# **Bot.commands.create()**

## Command Name

```js
Bot.commands.create("help");
```

Replace help with your command name for example `Bot.commands.create("avatar")`
would be a command with the name avatar

## Reply

| Reply Text                                          | Reply Embed                                             |
| --------------------------------------------------- | ------------------------------------------------------- |
| `{reply: {text: "What should the bot reply with"}}` | `{reply: {embed: {title: "What should the title be"}}}` |

In the table above you can see the json for text and embed replies. You can find
all the embed fields here
[https://discordjs.guide/popular-topics/embeds.html\#using-an-embed-object](https://discordjs.guide/popular-topics/embeds.html#using-an-embed-object)

```js
Bot.commands.create("cmdName", {});
```

Reply data goes in the second field for example

```js
Bot.commands.create("Hi", {reply: {text: "Hello"}});
```


