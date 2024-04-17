const { ActionRowBuilder, StringSelectMenuBuilder, Events } = require("discord.js")
const info = require("../info.json")
module.exports.run = (client, message, args, interaction) => {
 if (message.member.id !== info.rolessahip) return;

 var rolesmesaj = `:tada: Sevgili **__${message.guild.name}__** üyeleri kendinize uygun **Burç** rollerini aşağıda ki açılır menüden alabilirsiniz.`

 const takım = new ActionRowBuilder()
 .addComponents(
   new StringSelectMenuBuilder()
    .setCustomId('burcseç')
    .setPlaceholder('Burç Rolleri')
    .addOptions(
        {
            label: 'Akrep',
            description: 'Akrep burcu rolü',
            value: 'b1',
            emoji: '♏',
        },
        {
            label: 'Boğa',
            description: 'Boğa burcu rolü',
            value: 'b2',
            emoji: '♉'

        },
        {
            label: 'Başak',
            description: 'Başak burcu rolü',
            value: 'b3',
            emoji: '♍'

        },
    )
    .addOptions(
        {
            label: 'İkizler',
            description: 'İkizler burcu rolü',
            value: 'b4',
            emoji: '♊'
        },
        {
            label: 'Kova',
            description: 'Kova burcu rolü',
            value: 'b5',
            emoji: '♒'

        },
        {
            label: 'Koç',
            description: 'Koç burcu rolü',
            value: 'b6',
            emoji: '♈'

        },
    )
    .addOptions(
        {
            label: 'Yengeç',
            description: 'Yengeç burcu rolü',
            value: 'b7',
            emoji: '♋'
        },
        {
            label: 'Oğlak',
            description: 'Oğlak burcu rolü',
            value: 'b8',
            emoji: '♑'
        },
        {
            label: 'Terazi',
            description: 'Terazi burcu rolü',
            value: 'b9',
            emoji: '♎'
        },
    )
    .addOptions(
        {
            label: 'Aslan',
            description: 'Aslan burcu rolü',
            value: 'b10',
            emoji: '♌'
        },
        {
            label: 'Balık',
            description: 'Balık burcu rolü',
            value: 'b11',
            emoji: '♓'
        },
        {
            label: 'Yay',
            description: 'Yay burcu rolü',
            value: 'b12',
            emoji: '♐'
        },
    )
    .addOptions(
        {
            label: 'Temizle',
            description: 'Üzerinizden oyun rollerini alır',
            value: 'b13',
            emoji: '🚯'
        },
    )
 )
message.delete()
message.channel.send({ content: `${rolesmesaj}`, components: [takım] })

}
module.exports.name ="role-burç",
module.exports.use = ['rb','burç']