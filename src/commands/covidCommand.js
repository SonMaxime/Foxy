const fetch = require('node-fetch');

const Discord = require('discord.js');

module.exports = {
    name: "covid",
    description: "Track a country or worldwide COVID-19 cases",

    async run (client, message, args){

        let countries = args.join(" ");

        //Credit to Sarastro#7725 for the command :)

        const noArgs = new Discord.MessageEmbed()
            .setTitle('Argumentos faltando')
            .setColor(0xFF0000)
            .setDescription('Você esqueceu alguns argumentos: (ex: f!covid all || f!covid Canada)')
            .setTimestamp()

        if(!args[0]) return message.channel.send(noArgs);

        if(args[0] === "all"){
            fetch(`https://covid19.mathdro.id/api`)
                .then(response => response.json())
                .then(data => {
                    let confirmed = data.confirmed.value.toLocaleString()
                    let recovered = data.recovered.value.toLocaleString()
                    let deaths = data.deaths.value.toLocaleString()

                    const embed = new Discord.MessageEmbed()
                        .setTitle(`COVID-19 Status mundial`)
                        .addField('Casos confirmados', confirmed)
                        .addField('Recuperados', recovered)
                        .addField('Mortes', deaths)

                    message.channel.send(embed)
                })
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
                .then(response => response.json())
                .then(data => {
                    let confirmed = data.confirmed.value.toLocaleString()
                    let recovered = data.recovered.value.toLocaleString()
                    let deaths = data.deaths.value.toLocaleString()

                    const embed = new Discord.MessageEmbed()
                        .setTitle(`COVID-19 Status de: **${countries}**`)
                        .addField('Casos Confirmados', confirmed)
                        .addField('Recuperados', recovered)
                        .addField('Mortes', deaths)

                    message.channel.send(embed)
                }).catch(e => {
                return message.channel.send('País inválido')
            })
        }
    }
}

module.exports.help = { 
    name: 'covid',
    aliases: ["covid", "covid-19"]
  }