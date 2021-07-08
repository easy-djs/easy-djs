---
title: Basic Code
nav_order: 1
parent: Getting Started
---

# Basic Bot Code

```javascript
const easydjs = require("easy-djs");
const prefix = "<prefix>"; // replace <prefix> with what you want the token to be
const Bot = new easydjs.Bot("<token>", prefix); // replace <token> with your token

Bot.initiate();

Bot.commands.create("kick", {
	reply: {text: "Kicked #{firstUserMention.tag}"},
	action: {kick: "firstUserMention"},
});

Bot.commands.create("ban", {
	reply: {text: "Banned #{firstUserMention.tag}"},
	action: {ban: "firstUserMention"},
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
			image: {url: "#{firstUserMention.avatar}"},
		},
	},
});

Bot.setStatus({type: "watching", text: "YouTube"});
```
