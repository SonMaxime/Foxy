const Discord = require('discord.js')

module.exports.run = async (client, message) => {
     
    let dst = new Discord.MessageEmbed()
    .setColor('GREEN')
.setTitle('Status do Discord')
.setDescription('Status do Discord: https://discordstatus.com/')
    await message.channel.send(dst)
}

module.exports.help = { 
	name: 'dst',
	aliases: ["discord-status", "dcstatus"]
  }