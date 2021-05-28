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

var topics=[];
var wyr=[];


/**
 * Bot Functions:
 */

//Reads a file from a given file.
function readFile(file){
    const rl=readline.createInterface({
        input=fs.createReadStream(file),
        output: process.stdout,
        terminal: false
    });
    if(file==TOPICS_FILE){
        rl.on('line', (line) => {
            topics.push(line);
        });
    }
    else if(file==WYR_FILE){
        rl.on('line', (line) => {
            wyr.push(line);
        });
    }
    else{
        console.log("Error: Read File - Incorrect file provided.");
    }
}

//Appends a prompt to a file.
function addLine(file, line){
    fs.appendFile(file, '\n'+line, (err) => {
        if(err){
            console.log("Error: Adding line \'"+line+"\' to "+file+".");
        }
        else{
            console.log("Successfully added prompt to "+file+".");
        }
    });
}

//Gets a random prompt from a given prompt type.
function getPrompt(type){
    if(type=='topics'){
        return topics[Math.floor(Math.random()*topics.length)];
    }
    else if(type=='wyr'){
        return wyr[Math.floor(Math.random()*wyr.length)];
    }
    else{
        console.log("Error: Get Prompt - Incorrect type provided.");
    }
}