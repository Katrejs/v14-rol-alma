const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js")
const info = require("../info.json")
const dtb = require("croxydb")
module.exports.run = (client, message, args, interaction) => {
    if (message.member.id !== info.rolessahip) return;

    var mesaj = `Herkese merhaba **${message.guild.name}** Ailesi Bildiğiniz üzere sunucumuzda birçok **Çekiliş**,**Konser**,**Etkinlik**,**Oyun** günleri düzenlenicektir.
\n*__everyone__*,*__here__* gibi topluluğu rahatsız edicek etiketleri atmayacağız **Etkinlik** ve **Çekilişlerden** Haberdar olmak için asaşğıda ki butonlardan ilgili rolü alabilirsiniz.
\n**▪︎** **Oyun** & **Etkinlik** günlerinden haberdar olmak için <@&${info.katılım.roleetkinkatılım}> Rolünü alabilirsiniz.
\n**▪︎** **Konser** & **Çekiliş** günlerinden haberdar olmak için <@&${info.katılım.roleçekilkatılım}> Rolünü alabilirsiniz.
`
const ec = new ActionRowBuilder()
.addComponents(
    new ButtonBuilder()
    .setCustomId('eck1')
    .setLabel('Çekiliş')
    .setEmoji('🎁')
    .setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
    .setCustomId('eck2')
    .setLabel('Etkinlik')
    .setEmoji('🎉')
    .setStyle(ButtonStyle.Success)
)
    
    message.delete()
    message.channel.send({ content: `${mesaj}`, components: [ec] })

}
module.exports.name ="role-katılımcı",
module.exports.use = ['rk','katılım']