---
title: Message Arguments
nav_order: 2
parent: Arguments
---

# Message Arguments

| Argument                                   | What it Gives                                                     | Where it can be used |
| ------------------------------------------ | ----------------------------------------------------------------- | -------------------- |
| [args](#args)                              | All the message arguments seperated by commas                     | Replies              |
| [arg<number>](#argnumber) example `arg1` | Gives specified argument you specify the argument with the number | Replies              |
| [msg](#msg)                                | Gives the message without the command                             | Replies              |

# **args**

It gives all the message arguments seperated by commas for example the message
`Hello I use Easy-DJS` would be `Hello,I,use,Easy-DJS` The commas seperate the
arguments. If you look at the chart below you can see the numbers for the
arguments.

| Argument (Text) | Argument (Number) | Argument that can be used in messages |
| --------------- | ----------------- | ------------------------------------- |
| Hello           | 0                 | arg0                                  |
| I               | 1                 | arg1                                  |
| use             | 2                 | arg2                                  |
| Easy-DJS        | 3                 | arg3                                  |


# **args\<number\>**

Gives the argument specified by the number reference the table above for more information.

# **msg**

Gives the message without the command for example if the message were `>say Hi Guys` `<#msg>` would give `Hi Guys`

