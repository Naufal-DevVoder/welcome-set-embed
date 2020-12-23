const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.js');
const fs = require('fs');
const db = require('quick.db');

client.on('ready', () => {
  console.log(client.user.tag + ' online');
});

client.on('message', async message => {
  if(!message.content.startsWith(config.prefix)) return;
  
  let args = message.content.slice(config.prefix.length).split(" ");
  let cmd = args.shift().toLowerCase();
  
  try{
    let command = require(`./commands/${cmd}`)
    command.run(client, message, args)
  }catch(e){
    console.log(e.message)
  };
});

client.on('guildMemberAdd',  (member) => {
  
  let ch1 = db.get(`channel-${member.guild.id}`);
  let ch = client.channels.cache.get(ch1);
  
  let embed = new Discord.MessageEmbed()
  .setAuthor(`:aarrow: Hallo Selamat Datang Di ${member.guild.name}`, member.guild.iconURL({dynamic:true}))
  .addField(':warninggif: Mohon Baca Rules #╿✨、rules')
  .addField(':warninggif: Perkenalan Diri #╰👤、introduction')
  .setColor('BLUE')
  .addField(':aarrow: Members Ke :', member.guild.memberCount')
  ch.send(embed)
  
});

client.login(config."NzkxMjE0MTAwMjMwMzA3ODgw.X-L5jQ.dsZConA2eTQWi3fNWvsLoOPghhc")
