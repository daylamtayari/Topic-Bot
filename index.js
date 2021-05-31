/**
 * Bot Initialization:
 */

//Discord client initialization:
require('dotenv').config();
var Discord=require('discord.js');
const client=new Discord.Client();
const fs=require('fs');
const readline=require('readline');
client.login(process.env.CLIENT_TOKEN);

//Variables:
let PREFIX=process.env.PREFIX;
let TOPICS_FILE=process.env.TOPICS_FILE;
let WYR_FILE=process.env.WYR_FILE;
let ROLE=process.env.ROLE;

var topics=[];
var wyr=[];

//Store the arrays:
readFile(TOPICS_FILE);
readFile(WYR_FILE);


/**
 * Bot Functions:
 */


/**
 * Reads a given file and adds each 
 * of its individual lines (which each 
 * represent a separate prompt) to the 
 * corresponding arrays.
 * @param {*} file String value that represents the file path to read.
 */
function readFile(file){
    const rl=readline.createInterface({
        input: fs.createReadStream(file),
        output: process.stdout,
        terminal: false
    });
    if(file==TOPICS_FILE){
        topics=[];
        rl.on('line', (line) => {
            topics.push(line);
        });
    }
    else if(file==WYR_FILE){
        wyr=[];
        rl.on('line', (line) => {
            wyr.push(line);
        });
    }
    else{
        console.log("Error: Read File - Incorrect file provided.");
    }
}

/**
 * Adds a prompt, adding it both 
 * to the existing corresponding 
 * array and prompt file.
 * @param {*} file Prompt file to add the prompt to.
 * @param {*} line Prompt to add.
 */
function add(file, line){
    if(file==TOPICS_FILE){
        topics.push(line);
    }
    else if(file==WYR_FILE){
        wyr.push(line);
    }
    fs.appendFile(file, line, (err) => {
        if(err){
            console.log("Error: Adding line \'"+line+"\' to "+file+".");
        }
        else{
            console.log("Successfully added prompt to "+file+".");
        }
    });
}

/**
 * Retrieves a random prompt of 
 * a given prompt type.
 * @param {*} type Prompt type to retrieve the prompt from.
 * @returns Randomised prompt of the appropriate type.
 */
function getPrompt(type){
    if(type=='topic'){
        return topics[Math.floor(Math.random()*topics.length)];
    }
    else if(type=='wyr'){
        return wyr[Math.floor(Math.random()*wyr.length)];
    }
    else{
        console.log("Error: Get Prompt - Incorrect type provided.");
    }
}


/**
 * Discord Client Functions:
 */

//Help embed:
const helpEmbed=new Discord.MessageEmbed()
    .setTitle('Topic Bot Help')
    .setURL('https://github.com/daylamtayari/Topic-Bot')
    .setDescription('Topic bot is a bot that returns a random topic or would-you-rather prompt from a list of user-provided prompts.\nBot created by tayari: https://github.com/daylamtayari\nFull documentation available at: https://github.com/daylamtayari/Topic-Bot.')
    .addFields(
        {name:'Bot Prefix:', value:`\`${PREFIX}\``},
        {name:'Retrieve Topic:', value:`Retrieve random topic prompt: \`${PREFIX}topic\`.`},
        {name:'Retrieve WYR:', value:`Retrieve random would-you-rather prompt: \`${PREFIX}wyr\`.`},
        {name:'Add Prompt:', value:`Add a prompt (requires permissions): \`${PREFIX}add [topic|wyr] [PROMPT]\`.`},
        {name:'Reload Prompt Files:', value: `Reload prompt files (requires permissions): \`${PREFIX}reload\`.`},
        {name:'Retrieve Help Prompt:', value:`Retrieve the help prompt: \`${PREFIX}help\`.`},
        {name: 'Permissions:', value: "Only users with the designated bot admin role are able to use the commands which require permissions."}
    )
    .setFooter('Topic Bot')
    .setTimestamp();

// Ready message:
client.on('ready', () => {
    client.user.setActivity(`${PREFIX}help | by tayari`, {type: `STREAMING`, url: "https://twitch.tv/tayarics"})
});

// Message response:
client.on('message', message => {
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;

    const command=message.content.slice(PREFIX.length).trim().toLowerCase();

    if(command==''){
        return;
    }
    else if(command.startsWith('add ')){
        if(!message.member.roles.cache.has(ROLE)){
            return message.channel.send('Error: You lack the required permissions to add a prompt.');
        }
        const args=command.slice(4).trim();
        if(args.startsWith('topic ')){
            add(TOPICS_FILE, args.slice(6).trim());
        }
        else if(args.startsWith('wyr ')){
            add(WYR_FILE, args.slice(4).trim());
        }
        else{
            return message.channel.send('Error: Error adding a prompt, provided prompt type is invalid.');
        }
        return message.channel.send("Prompt successfully added.");
    }
    else if(command.startsWith('help')){
        return message.channel.send(helpEmbed);
    }
    else if(command.startsWith('reload')){
        if(!message.member.roles.cache.has(ROLE)){
            return message.channel.send('Error: You lack the required permissions to add a prompt.');
        }
        readFile(TOPICS_FILE);
        readFile(WYR_FILE);
        return message.channel.send("Prompt files reloaded.");
    }
    else{
        if(command.startsWith('topic')){
            if(topics.length==0){
                return message.channel.send("Error: There are no topics prompts.")
            }
            return message.channel.send("Topic - "+getPrompt('topic'));
        }
        else if(command.startsWith('wyr')){
            if(wyr.length==0){
                return message.channel.send("Error: There are no would-you-rather prompts.")
            }
            return message.channel.send("WYR - "+getPrompt('wyr'));
        }
    }
});