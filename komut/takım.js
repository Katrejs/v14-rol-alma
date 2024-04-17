const { ActionRowBuilder, StringSelectMenuBuilder, Events } = require("discord.js")
const info = require("../info.json")
module.exports.run = (client, message, args, interaction) => {
 if (message.member.id !== info.rolessahip) return;

 var rolesmesaj = `:tada: Sevgili **__${message.guild.name}__** üyeleri kendinize uygun **Takım** rollerini aşağıda ki açılır menüden alabilirsiniz.`

 const takım = new ActionRowBuilder()
 .addComponents(
   new StringSelectMenuBuilder()
    .setCustomId('takımseç')
    .setPlaceholder('Takım Rolleri')
    .addOptions(
        {
            label: 'Fenebahçe',
            description: 'Fenerbahçe takım rolü',
            value: 'takım1',
            emoji: '⭐'
        },
        {
            label: 'Galatasaray',
            description: 'Galatasaray takım rolü',
            value: 'takım2',
            emoji: '⭐'

        },
        {
            label: 'Beşiktaş',
            description: 'Beşiktaş takım rolü',
            value: 'takım3',
            emoji: '⭐'

        },
    )
    .addOptions(
        {
            label: 'Trabzonspor',
            description: 'Trabzonspor takım rolü',
            value: 'takım4',
            emoji: '⭐'
        },
        {
            label: 'Başakşehir',
            description: 'Başakşehir takım rolü',
            value: 'takım5',
            emoji: '⭐'

        },
        {
            label: 'Temizle',
            description: 'Üzerinizden takım rolünü alır',
            value: 'takım6',
            emoji: '🚯'

        },
    )
 )
message.delete()
message.channel.send({ content: `${rolesmesaj}`, components: [takım] })

}
module.exports.name ="role-takım",
module.exports.use = ['rt','takım']