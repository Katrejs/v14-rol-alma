const { ActionRowBuilder, StringSelectMenuBuilder, Events } = require("discord.js")
const info = require("../info.json")
module.exports.run = (client, message, args, interaction) => {
 if (message.member.id !== info.rolessahip) return;

 var rolesmesaj = `:tada: Sevgili **__${message.guild.name}__** üyeleri kendinize uygun **İlişki** rollerini aşağıda ki açılır menüden alabilirsiniz.`

 const iliski = new ActionRowBuilder()
 .addComponents(
   new StringSelectMenuBuilder()
    .setCustomId('iliskiseç')
    .setPlaceholder('İlişki Rolleri')
    .addOptions(
        {
            label: 'Sevgilim var',
            description: 'Couple rolü',
            value: 'i1',
            emoji: '👩🏻‍❤️‍👨🏻'
        },
        {
            label: 'Sevgilim yok',
            description: 'Alone rolü',
            value: 'i2',
            emoji: '😔'

        },
        {
            label: 'Temizle',
            description: 'üzerinizden ilişki rolünü alır',
            value: 'i3',
            emoji: '🚯'

        },
    )
 )
message.delete()
message.channel.send({ content: `${rolesmesaj}`, components: [iliski] })

}
module.exports.name ="role-ilişki",
module.exports.use = ['ri','ilişki']