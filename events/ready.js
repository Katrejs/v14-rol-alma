const { ActivityType, Events } = require("discord.js");
const { joinVoiceChannel, VoiceConnectionStatus } = require("@discordjs/voice")
const info = require("../info.json");
module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`${client.user.tag} Aktif edildi`)
		 client.user.setActivity(`${info.genel.durum}`, { type: ActivityType.Playing });
         client.user.setStatus(`${info.genel.aktiflik}`);
         
		 const katreses = client.channels.cache.get(info.kanal.ses);
         const connection = joinVoiceChannel({
        channelId: katreses.id,
        guildId: katreses.guild.id,
        adapterCreator: katreses.guild.voiceAdapterCreator,
        selfDeaf: true,
        selfMute: true,
    });
    connection.on(VoiceConnectionStatus.Ready, () => {
	console.log('Ses bağlantısı tanımlandı');
});
		}
		
	}