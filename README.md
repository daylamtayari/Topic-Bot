# Topic-Bot

### Topic Bot is a Discord bot which gives users topic and would-you-rather prompts from a set list of user-provided prompts


## About:

Topic Bot is a Discord bot which allows prints randomised topic and would-you-rather prompts from a user-provided list of prompts.  

There are two files which store all of the prompts, one for topic prompts and one for would-you-rahter prompts.  
Prompt files are not automatically reloaded so if you edit the file manually while the bot is running, make sure to use the reload command to reload the prompts.  
You can also add prompts using the `add` command however, it's usage is restricted to users who have the dedicated 'topic adder' role.

## Commands:

- `help` - Prints out the help prompt.
- `topic` - Prints a randomised topic prompt.
- `wyr` - Prints a randomised would-you-rather prompt.
- `add` - Adds a prompt and saves it to the prompt files.
- `reload` - Reloads the prompts from the prompt files.

## Deployment:

### Prerequisites: 
- NodeJS installed to version 12.0+.
- NPM installed.  
- PM2 installed ([instructions](https://pm2.keymetrics.io/docs/usage/quick-start/)).  
- Discord bot client token.  

### Installation and Deployment:
1. Clone the repository in the desired folder.  
2. Install the node modules by entering `npm install`.  
3. Complete the `.env` template and create a topic and would-you-rather prompt file which will contain all of the user provided prompts.  
    a. Rename the `.env.template` file to `.env`.  
    b. Create a topic and would-you-rather prompt file to contain the prompts.  
    c. Add the local path of the prompt files to the `.env` (i.e. `topics.txt` or `wyr.txt`).  
    d. Add the **ID** of the role which you have decided will be admin role for the bot (allows them to add prompts and reload the prompt files).  
    e. Complete the remaining fields of the `.env` such as the client ID and prefix.  
4. Deploy the bot by entering `npm run prod`.  

**You now just have to add the bot to your server, add prompts and have fun!**