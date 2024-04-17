const { ActionRowBuilder, StringSelectMenuBuilder, Events, ButtonBuilder, ButtonStyle } = require("discord.js")
const info = require("../info.json")
module.exports.run = (client, message, args, interaction) => {
 if (message.member.id !== info.rolessahip) return;

 var mesaj = `Merhaba dostum hızlı girişler olduğu zaman bot bazı kişileri gözden kaçırabiliyor bu durumlarda rolsüz kalmamanız için aşağıda ki butona basarak kendinize kayıtsız rolü verdirebilirsiniz
`
const ec1 = new ActionRowBuilder()
.addComponents(
    new ButtonBuilder()
    .setCustomId('kyt')
    .setLabel('Kayıtsız')
    .setEmoji('🔔')
    .setStyle(ButtonStyle.Success)
)
 
message.delete()
message.channel.send({ content: `${mesaj}`, components: [ec1] })

}
module.exports.name ="role-karşılama",
module.exports.use = ['kk','karşılama']