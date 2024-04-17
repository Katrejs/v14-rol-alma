const { ActionRowBuilder, StringSelectMenuBuilder, Events } = require("discord.js")
const info = require("../info.json")
module.exports.run = (client, message, args, interaction) => {
 if (message.member.id !== info.rolessahip) return;

 var rolesmesaj = `:tada: Sevgili **__${message.guild.name}__** üyeleri kendinize uygun **Renk** rollerini aşağıda ki açılır menüden alabilirsiniz.`

 const takım = new ActionRowBuilder()
 .addComponents(
   new StringSelectMenuBuilder()
    .setCustomId('renkseç')
    .setPlaceholder('Renk Rolleri')
    .addOptions(
        {
            label: 'Kırmızı',
            description: 'Kırmızı rolü',
            value: 'renk1',
            emoji: '🍒'
        },
        {
            label: 'Beyaz',
            description: 'Beyaz rolü',
            value: 'renk2',
            emoji: '🥥'

        },
        {
            label: 'Mavi',
            description: 'Mavi rolü',
            value: 'renk3',
            emoji: '🍇'

        },
    )
    .addOptions(
        {
            label: 'Sarı',
            description: 'Sarı rolü',
            value: 'renk4',
            emoji: '🍋'
        },
        {
            label: 'Yeşil',
            description: 'Yeşil rolü',
            value: 'renk5',
            emoji: '🥑'

        },
        {
            label: 'Temizle',
            description: 'Üzerinizden renk rolünü alır',
            value: 'renk6',
            emoji: '🚯'

        },
    )
 )
message.delete()
message.channel.send({ content: `${rolesmesaj}`, components: [takım] })

}
module.exports.name ="role-renk",
module.exports.use = ['rr','renk']