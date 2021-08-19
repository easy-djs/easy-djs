---
title: Actions
nav_order: 4
---

# Actions

| Action | Options          | What it does                                             |
| ------ | ---------------- | -------------------------------------------------------- |
| kick   | firstUserMention | It Kicks Someone                                         |
| ban    | firstUserMention | It Bans Someone                                          |
| mute   | firstUserMention | It Mutes Someone (Adds a mute role to the user)          |
| unmute | firstUserMention | It Unmutes Someone (Removes the mute role from someone ) |
| purge  | amount (number)  | Purges x amount of messages                              |

## Code Example

```js
Bot.commands.create("kick", {
  reply: {
    text: "Kicked #{firstUserMention.username}",
    action: { kick: "firstUserMention" },
  },
});
```

Replace `kick` in `action: {}` with the action name.
