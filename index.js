/**
 * Bot Initialization:
 */

// Discord client initialization:
require('dotenv').config();
var Discord=require('discord.js');
const client=new Discord.Client();
client.login(process.env.CLIENT_TOKEN);

//Variables:
let PREFIX=process.env.PREFIX;
let TOPICS_FILE=process.env.TOPICS_FILE;
let WYR_FILE=process.env.WYR_FILE;

var topics=[];
var wyr=[];
