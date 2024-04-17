const { ActionRowBuilder, StringSelectMenuBuilder, Events } = require("discord.js")
const info = require("../info.json")
module.exports.run = (client, message, args, interaction) => {
 if (message.member.id !== info.rolessahip) return;

 var rolesmesaj = `:tada: Sevgili **__${message.guild.name}__** üyeleri kendinize uygun **Oyun** rollerini aşağıda ki açılır menüden alabilirsiniz.`

 const takım = new ActionRowBuilder()
 .addComponents(
   new StringSelectMenuBuilder()
    .setCustomId('oyunseç')
    .setPlaceholder('Oyun Rolleri')
    .addOptions(
        {
            label: 'Mobile Legends',
            description: 'Mobile Legends rolü',
            value: 'oyun1',
            emoji: '🕹️',
        },
        {
            label: 'CS:GO',
            description: 'CS:GO rolü',
            value: 'oyun2',
            emoji: '🕹️'

        },
        {
            label: 'PUBG',
            description: 'PUBG rolü',
            value: 'oyun3',
            emoji: '🕹️'

        },
    )
    .addOptions(
        {
            label: 'League of Legends',
            description: 'League of Legends rolü',
            value: 'oyun4',
            emoji: '🕹️'
        },
        {
            label: 'Valorant',
            description: 'Valorant rolü',
            value: 'oyun5',
            emoji: '🕹️'

        },
        {
            label: 'Gta V',
            description: 'Gta V rolü',
            value: 'oyun6',
            emoji: '🕹️'

        },
    )
    .addOptions(
        {
            label: 'Temizle',
            description: 'Üzerinizden oyun rollerini alır',
            value: 'oyun7',
            emoji: '🚯'
        },
    )
 )
message.delete()
message.channel.send({ content: `${rolesmesaj}`, components: [takım] })

}
module.exports.name ="role-oyun",
module.exports.use = ['ro','oyun']