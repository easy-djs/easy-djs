---
title: Basic Code
nav_order: 1
parent: Getting Started
---

# Basic Bot Code

```javascript
const easydjs = require("easy-djs");
const prefix = "<prefix>"; // replace <prefix> with what you want the token to be
const Bot = new easydjs.Bot("<token>", prefix, {"guildId": "roleId"}); // replace <token> with your token and format the mute role data based off {"guildId": "roleId", "otherGuildId": "otherRoleId"}

Bot.commands.create.text("kick", {
	reply: {text: "Kicked #{firstUserMention.tag}"},
	action: {kick: "firstUserMention"},
});

Bot.commands.create.text("ban", {
	reply: {text: "Banned #{firstUserMention.tag}"},
	action: {ban: "firstUserMention"},
});

Bot.commands.create.text("help", {
	reply: {
		text: `${prefix}kick <mention>\n${prefix}ban <mention>\n${prefix}help\n${prefix}av <mention>`,
	},
});

Bot.commands.create.slash("help", {
    reply: {
        text: `${prefix}kick <mention>\n${prefix}ban <mention>\n${prefix}help\n${prefix}av <mention>`,
    },
}); // Slash Command for Help

Bot.commands.create.text("av", {
	reply: {
		embed: {
			title: "#{firstUserMention.username}'s avatar",
			image: {url: "#{firstUserMention.avatar}"},
		},
	},
});

Bot.setStatus({type: "watching", text: "YouTube"});

Bot.initiate(); // Makes the bot start waiting for commands
Bot.sendCommands(); //Send Slash commands to discord *must be after all of the Bot.commands.create.slash() functions*
```

This is the code for help, kick, ban and avatar commands avatar is av
