const { Client, Partials, GatewayIntentBits, Collection, Events, ActivityType } = require("discord.js");
const fs = require('node:fs');
const path = require('node:path');
const { joinVoiceChannel, VoiceConnectionStatus } = require("@discordjs/voice")
const info = require("./info.json")

const client = new Client({ fetchAllMembers : true , 
intents: [GatewayIntentBits.Guilds,
 GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildEmojisAndStickers,
   GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
     GatewayIntentBits.GuildInvites,
      GatewayIntentBits.GuildVoiceStates,
       GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
         GatewayIntentBits.GuildMessageReactions,
          GatewayIntentBits.GuildMessageTyping,
           GatewayIntentBits.DirectMessages,
            GatewayIntentBits.DirectMessageReactions,
             GatewayIntentBits.DirectMessageTyping,
              GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember]});

              client.commands = new Collection();
              client.aliases = new Collection();
              client.events = new Collection();

              const eventsPath = path.join(__dirname, 'events');
              const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
              
              
              
              for (const file of eventFiles) {
                  const filePath = path.join(eventsPath, file);
                  const event = require(filePath);
                  if (event.once) {
                      client.once(event.name, (...args) => event.execute(...args));
                  } else {
                      client.on(event.name, (...args) => event.execute(...args));
                  }
                    console.log(`[EVENT] ${event.name} yüklendi`)
              }

const commands = fs.readdirSync("./komut").filter(file => file.endsWith(".js"))
for(file of commands) {
const commandName = file.split(".")[0]
const command = require(`./komut/${commandName}`)
client.commands.set(commandName, command)
console.log(`[KOMUT] ${commandName} yüklendi`)
}
const prefix = `${info.roleprefix}`
client.on('messageCreate', async (message) => {
    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const commandName = args.shift()
        const command = client.commands.get(commandName) || client.commands.find(u => u.use && u.use.includes(commandName));
        if(!command) return
        command.run(client, message, args)
    }
})

client.on(Events.ClientReady, async() => {
    console.log(`${client.user.tag} Aktif edildi`)
    client.user.setActivity(`${info.roledurum}`, { type: ActivityType.Playing });
    client.user.setStatus(`${info.rolestat}`);
    
    const katreses = client.channels.cache.get(info.roleses);
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


})








client.on(Events.InteractionCreate, async (interaction) => {
    if(interaction.isButton()) {

        if (interaction.customId === 'eck1') { 
           let çrolesvar = await interaction.member.roles.cache.get(info.katılım.roleçekilkatılım);
          if (!çrolesvar) {
    
         await interaction.member.roles.add(info.katılım.roleçekilkatılım);
          interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** Üyesi üzerinize <@&${info.katılım.roleçekilkatılım}> rolü verildi.`, ephemeral: 'true' } )
          } else {
            
          interaction.member.roles.remove(info.katılım.roleçekilkatılım)
            interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** Üyesi üzerinizden <@&${info.katılım.roleçekilkatılım}> rolü alındı.`, ephemeral: 'true' } )
          }
        }
        if (interaction.customId === 'eck2') {
            let erolesvar = await interaction.member.roles.cache.get(info.katılım.roleetkinkatılım);
            if (!erolesvar) {
                await interaction.member.roles.add(info.katılım.roleetkinkatılım);
                 interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** Üyesi üzerinize <@&${info.katılım.roleetkinkatılım}> rolü verildi.`, ephemeral: 'true' } )
            } else {
                await interaction.member.roles.remove(info.katılım.roleetkinkatılım);
                 interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** Üyesi üzerinizden <@&${info.katılım.roleetkinkatılım}> rolü alındı.`, ephemeral: 'true' } )
            }
    
        }

        if (interaction.customId === 'kyt') {
const memberRoles = interaction.member.roles.cache.filter(x => x.id !== interaction.guild.id).size;


if(memberRoles === 0) {
    await interaction.member.roles.add(info.kayıtsız)
   await interaction.member.setNickname(`${info.tag} İsim | Yaş`)
   interaction.reply({ content: `Başarıyla <@&${info.kayıtsız}> rolünü verdim ve ismini \`${info.tag} İsim | Yaş\` olarak ayarladım <#${info.registerchat}> kanalına yazabilirsin ^^`, ephemeral: true })

} else {
    interaction.reply({ content: `Üzgünüm bu işlem için üzerinde hiçbir rolün bulunmaması gerekiyor`, ephemeral: true })
}}
    }
    if (interaction.isStringSelectMenu()) {
        const seçim = interaction.values[0];
    
        const takımroller = [info.takım.basak, info.takım.besik, info.takım.fener, info.takım.galat, info.takım.trabzon]
        const oyunroller = [info.oyun.csgo, info.oyun.gtav, info.oyun.lol, info.oyun.mlbb, info.oyun.pubg, info.oyun.valorant]
        const renkroller = [info.renk.beyaz, info.renk.kırmızı, info.renk.mavi, info.renk.sarı, info.renk.yeşil]
        const burçroller = [info.burç.akrep, info.burç.aslan, info.burç.balık, info.burç.başak, info.burç.boğa, info.burç.ikizler, info.burç.kova, info.burç.koç, info.burç.oğlak, info.burç.terazi, info.burç.yay, info.burç.yengeç]

        if (seçim === 'takım1') {
           let frol = await interaction.member.roles.cache.get(info.takım.fener)
            
          if(!frol) { 
           
            await interaction.member.roles.remove(takımroller);     
            await interaction.member.roles.add(info.takım.fener);
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.takım.fener}> rolünü ekledim`, ephemeral: true })
        } else {
            interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.takım.fener}> rolüne zaten sahipsiniz.`, ephemeral: true })
        }}


        if (seçim === 'takım2') {
            let grol = await interaction.member.roles.cache.get(info.takım.galat)
                
              if(!grol) { 
                
                await interaction.member.roles.remove(takımroller);
                await interaction.member.roles.add(info.takım.galat);
                await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.takım.galat}> rolünü ekledim`, ephemeral: true })
            } else {
                await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.takım.galat}> rolüne zaten sahipsiniz.`, ephemeral: true })
            }
        }
    
        if (seçim === 'takım3') {
            let brol = await interaction.member.roles.cache.get(info.takım.besik)
                
              if(!brol) { 
                
                await interaction.member.roles.remove(takımroller); 
                await interaction.member.roles.add(info.takım.besik);
                await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.takım.besik}> rolünü ekledim`, ephemeral: true })
            } else {
                await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.takım.besik}> rolüne zaten sahipsiniz.`, ephemeral: true })
            }
        }

        if (seçim === 'takım4') {
            let trol = await interaction.member.roles.cache.get(info.takım.trabzon)
                
              if(!trol) {
               
                await interaction.member.roles.remove(takımroller);  
                await interaction.member.roles.add(info.takım.trabzon);
                await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.takım.trabzon}> rolünü ekledim`, ephemeral: true })
            } else {
                await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.takım.trabzon}> rolüne zaten sahipsiniz.`, ephemeral: true })
            }
        }

        if (seçim === 'takım5') {
            let mbrol = await interaction.member.roles.cache.get(info.takım.basak)
                
              if(!mbrol) { 
               
                await interaction.member.roles.remove(takımroller);
                await interaction.member.roles.add(info.takım.basak);
                await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.takım.basak}> rolünü ekledim`, ephemeral: true })
            } else {
                await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.takım.basak}> rolüne zaten sahipsiniz.`, ephemeral: true })
            }
        }

        if (seçim === 'takım6') {
            
            await interaction.member.roles.remove(takımroller);
            await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi **Takım** rolleriniz sıfırlandı`, ephemeral: true })
        }

        if (seçim === 'i1') {
            let i1var = interaction.member.roles.cache.get(info.ilişki.couple)
            if(!i1var) {
            await interaction.member.roles.remove(info.ilişki.alone)
            await interaction.member.roles.add(info.ilişki.couple)
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.ilişki.couple}> rolünü ekledim`, ephemeral: true })
            } else {
                await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.ilişki.couple}> rolüne zaten sahipsiniz.`, ephemeral: true }) 
            }
        }

        if (seçim === 'i2') {
            let i2var = interaction.member.roles.cache.get(info.ilişki.alone)
            if(!i2var) {
            await interaction.member.roles.remove(info.ilişki.couple)
            await interaction.member.roles.add(info.ilişki.alone)
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.ilişki.alone}> rolünü ekledim`, ephemeral: true })
            } else {
                await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.ilişki.alone}> rolüne zaten sahipsiniz.`, ephemeral: true }) 
            }
        }
        if (seçim === 'i3') {
            await interaction.member.roles.remove(info.ilişki.couple)
            await interaction.member.roles.remove(info.ilişki.alone)
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi **İlişki** rolleriniz sıfırlandı`, ephemeral: true })
        }
     

        if (seçim === 'oyun1') {
            let frol = await interaction.member.roles.cache.get(info.oyun.mlbb)

           if(!frol) { 
         
             await interaction.member.roles.add(info.oyun.mlbb);
              interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.oyun.mlbb}> rolünü ekledim`, ephemeral: true })
         } else {
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.oyun.mlbb}> rolüne zaten sahipsiniz.`, ephemeral: true })
         }}


         if (seçim === 'oyun2') {
            let frol = await interaction.member.roles.cache.get(info.oyun.csgo)
             
           if(!frol) { 

             await interaction.member.roles.add(info.oyun.csgo);
              interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.oyun.csgo}> rolünü ekledim`, ephemeral: true })
         } else {
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.oyun.csgo}> rolüne zaten sahipsiniz.`, ephemeral: true })
         }}
     
         if (seçim === 'oyun3') {
            let frol = await interaction.member.roles.cache.get(info.oyun.pubg)
             
           if(!frol) { 
           
             await interaction.member.roles.add(info.oyun.pubg);
             await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.oyun.pubg}> rolünü ekledim`, ephemeral: true })
         } else {
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.oyun.pubg}> rolüne zaten sahipsiniz.`, ephemeral: true })
         }}

         if (seçim === 'oyun4') {
            let frol = await interaction.member.roles.cache.get(info.oyun.lol)
             
           if(!frol) { 
             
             await interaction.member.roles.add(info.oyun.lol);
              interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.oyun.lol}> rolünü ekledim`, ephemeral: true })
         } else {
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.oyun.lol}> rolüne zaten sahipsiniz.`, ephemeral: true })
         }}


         if (seçim === 'oyun5') {
            let frol = await interaction.member.roles.cache.get(info.oyun.valorant)
             
           if(!frol) { 

             await interaction.member.roles.add(info.oyun.valorant);
              interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.oyun.valorant}> rolünü ekledim`, ephemeral: true })
         } else {
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.oyun.valorant}> rolüne zaten sahipsiniz.`, ephemeral: true })
         }}


         if (seçim === 'oyun6') {
            let frol = await interaction.member.roles.cache.get(info.oyun.gtav)
             
           if(!frol) { 
           
             await interaction.member.roles.add(info.oyun.gtav);
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.oyun.gtav}> rolünü ekledim`, ephemeral: true })
         } else {
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.oyun.gtav}> rolüne zaten sahipsiniz.`, ephemeral: true })
         }}


         if (seçim === 'oyun7') {
           
             
            await interaction.member.roles.remove(oyunroller); 
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinizden **oyun** rolleri alındı`, ephemeral: true })
         }
    
    
    
         if (seçim === 'renk1') {
            let frol = await interaction.member.roles.cache.get(info.renk.kırmızı)

            let member = interaction.member;
            if(!member.roles.cache.has(info.taglı) && !member.roles.cache.has(info.booster)) {
                interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi **renk** rolleri sadece __taglı & booster__ üyelerimiz içindir`, ephemeral: true })
           return
            }

           

           if(!frol) { 
           
             await interaction.member.roles.remove(renkroller)
             await interaction.member.roles.add(info.renk.kırmızı);
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.renk.kırmızı}> rolünü ekledim`, ephemeral: true })
         } else {
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.renk.kırmızı}> rolüne zaten sahipsiniz.`, ephemeral: true })
         }}

    
         if (seçim === 'renk2') {
            let frol = await interaction.member.roles.cache.get(info.renk.beyaz)
             
            let member = interaction.member;
            if(!member.roles.cache.has(info.taglı) && !member.roles.cache.has(info.booster)) {
                interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi **renk** rolleri sadece __taglı & booster__ üyelerimiz içindir`, ephemeral: true })
           return
            }

           if(!frol) { 
           
             await interaction.member.roles.remove(renkroller)
             await interaction.member.roles.add(info.renk.beyaz);
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.renk.beyaz}> rolünü ekledim`, ephemeral: true })
         } else {
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.renk.beyaz}> rolüne zaten sahipsiniz.`, ephemeral: true })
         }}

         if (seçim === 'renk3') {
            let frol = await interaction.member.roles.cache.get(info.renk.mavi)
             
           if(!frol) { 

            let member = interaction.member;
            if(!member.roles.cache.has(info.taglı) && !member.roles.cache.has(info.booster)) {
                interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi **renk** rolleri sadece __taglı & booster__ üyelerimiz içindir`, ephemeral: true })
           return
            }
           
             await interaction.member.roles.remove(renkroller)
             await interaction.member.roles.add(info.renk.mavi);
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.renk.mavi}> rolünü ekledim`, ephemeral: true })
         } else {
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.renk.mavi}> rolüne zaten sahipsiniz.`, ephemeral: true })
         }}
        
        
         if (seçim === 'renk4') {
            let frol = await interaction.member.roles.cache.get(info.renk.sarı)
             
           if(!frol) { 

            let member = interaction.member;
            if(!member.roles.cache.has(info.taglı) && !member.roles.cache.has(info.booster)) {
                interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi **renk** rolleri sadece __taglı & booster__ üyelerimiz içindir`, ephemeral: true })
           return
            }
           
             await interaction.member.roles.remove(renkroller)
             await interaction.member.roles.add(info.renk.sarı);
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.renk.sarı}> rolünü ekledim`, ephemeral: true })
         } else {
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.renk.sarı}> rolüne zaten sahipsiniz.`, ephemeral: true })
         }}

         if (seçim === 'renk5') {
            let frol = await interaction.member.roles.cache.get(info.renk.yeşil)
             
           if(!frol) { 

            let member = interaction.member;
            if(!member.roles.cache.has(info.taglı) && !member.roles.cache.has(info.booster)) {
                interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi **renk** rolleri sadece __taglı & booster__ üyelerimiz içindir`, ephemeral: true })
           return
            }
           
             await interaction.member.roles.remove(renkroller)
             await interaction.member.roles.add(info.renk.yeşil);
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.renk.yeşil}> rolünü ekledim`, ephemeral: true })
         } else {
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.renk.yeşil}> rolüne zaten sahipsiniz.`, ephemeral: true })
         }}

         if (seçim === 'renk6') {

            let member = interaction.member;
            if(!member.roles.cache.has(info.taglı) && !member.roles.cache.has(info.booster)) {
                interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi **renk** rolleri sadece __taglı & booster__ üyelerimiz içindir`, ephemeral: true })
           return
            }
           
            await interaction.member.roles.remove(renkroller); 
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinizden **renk** rolleri alındı`, ephemeral: true })
         }
    



         if (seçim === 'b1') {
            let frol = await interaction.member.roles.cache.get(info.burç.akrep)
             
           if(!frol) { 
            await interaction.member.roles.remove(burçroller)
             await interaction.member.roles.add(info.burç.akrep);
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.burç.akrep}> rolünü ekledim`, ephemeral: true })
         } else {
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.burç.akrep}> rolüne zaten sahipsiniz.`, ephemeral: true })
         }}
       
         if (seçim === 'b2') {
            let frol = await interaction.member.roles.cache.get(info.burç.boğa)
             
           if(!frol) { 
            await interaction.member.roles.remove(burçroller)
             await interaction.member.roles.add(info.burç.boğa);
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.burç.boğa}> rolünü ekledim`, ephemeral: true })
         } else {
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.burç.boğa}> rolüne zaten sahipsiniz.`, ephemeral: true })
         }}

         if (seçim === 'b3') {
            let frol = await interaction.member.roles.cache.get(info.burç.başak)
             
           if(!frol) { 
            await interaction.member.roles.remove(burçroller)
             await interaction.member.roles.add(info.burç.başak);
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.burç.başak}> rolünü ekledim`, ephemeral: true })
         } else {
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.burç.başak}> rolüne zaten sahipsiniz.`, ephemeral: true })
         }}

         if (seçim === 'b4') {
            let frol = await interaction.member.roles.cache.get(info.burç.ikizler)
             
           if(!frol) { 
            await interaction.member.roles.remove(burçroller)
             await interaction.member.roles.add(info.burç.ikizler);
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.burç.ikizler}> rolünü ekledim`, ephemeral: true })
         } else {
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.burç.ikizler}> rolüne zaten sahipsiniz.`, ephemeral: true })
         }}

         if (seçim === 'b5') {
            let frol = await interaction.member.roles.cache.get(info.burç.kova)
             
           if(!frol) { 
            await interaction.member.roles.remove(burçroller)
             await interaction.member.roles.add(info.burç.kova);
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.burç.kova}> rolünü ekledim`, ephemeral: true })
         } else {
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.burç.kova}> rolüne zaten sahipsiniz.`, ephemeral: true })
         }}

         if (seçim === 'b6') {
            let frol = await interaction.member.roles.cache.get(info.burç.koç)
             
           if(!frol) { 
            await interaction.member.roles.remove(burçroller)
             await interaction.member.roles.add(info.burç.koç);
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.burç.koç}> rolünü ekledim`, ephemeral: true })
         } else {
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.burç.koç}> rolüne zaten sahipsiniz.`, ephemeral: true })
         }}

         if (seçim === 'b7') {
            let frol = await interaction.member.roles.cache.get(info.burç.yengeç)
             
           if(!frol) { 
            await interaction.member.roles.remove(burçroller)
             await interaction.member.roles.add(info.burç.yengeç);
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.burç.yengeç}> rolünü ekledim`, ephemeral: true })
         } else {
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.burç.yengeç}> rolüne zaten sahipsiniz.`, ephemeral: true })
         }}

         if (seçim === 'b8') {
            let frol = await interaction.member.roles.cache.get(info.burç.oğlak)
             
           if(!frol) { 
            await interaction.member.roles.remove(burçroller)
             await interaction.member.roles.add(info.burç.oğlak);
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.burç.oğlak}> rolünü ekledim`, ephemeral: true })
         } else {
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.burç.oğlak}> rolüne zaten sahipsiniz.`, ephemeral: true })
         }}

         if (seçim === 'b9') {
            let frol = await interaction.member.roles.cache.get(info.burç.terazi)
             
           if(!frol) { 
            await interaction.member.roles.remove(burçroller)
             await interaction.member.roles.add(info.burç.terazi);
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.burç.terazi}> rolünü ekledim`, ephemeral: true })
         } else {
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.burç.terazi}> rolüne zaten sahipsiniz.`, ephemeral: true })
         }}

         if (seçim === 'b10') {
            let frol = await interaction.member.roles.cache.get(info.burç.aslan)
             
           if(!frol) { 
            await interaction.member.roles.remove(burçroller)
             await interaction.member.roles.add(info.burç.aslan);
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.burç.aslan}> rolünü ekledim`, ephemeral: true })
         } else {
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.burç.aslan}> rolüne zaten sahipsiniz.`, ephemeral: true })
         }}

         if (seçim === 'b11') {
            let frol = await interaction.member.roles.cache.get(info.burç.balık)
             
           if(!frol) { 
            await interaction.member.roles.remove(burçroller)
             await interaction.member.roles.add(info.burç.balık);
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.burç.balık}> rolünü ekledim`, ephemeral: true })
         } else {
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.burç.balık}> rolüne zaten sahipsiniz.`, ephemeral: true })
         }}

         if (seçim === 'b12') {
            let frol = await interaction.member.roles.cache.get(info.burç.yay)
             
           if(!frol) { 
            await interaction.member.roles.remove(burçroller)
             await interaction.member.roles.add(info.burç.yay);
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.burç.yay}> rolünü ekledim`, ephemeral: true })
         } else {
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.burç.yay}> rolüne zaten sahipsiniz.`, ephemeral: true })
         }}

         if (seçim === 'b13') {
            await interaction.member.roles.remove(burçroller); 
             interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinizden **burç** rolleri alındı`, ephemeral: true })
         }
        }
})
client.login(info.roletoken)
