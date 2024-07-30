const { Client, Collection } = require("discord.js");
const { normalPrefix, token, welcomechannel, color, status, roleid, leavechannel, dbLink, mutedrole } = require("./config.json");
const { Database } = require('quickmongo');
const db = new Database(dbLink)
const discord = require("discord.js");
const moment = require("moment");
const ascii = require("ascii-table");
const { MessageEmbed } = require("discord.js");

const client = new discord.Client({
  disableMentions: 'everyone'
})

client.commands = new Collection();
client.aliases = new Collection();
client.commands = new Collection();
client.queue = new Map();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

function url(str) {
  let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (regexp.test(str)) {
    return true;
  } else {
    return false;
  }
}

client.on("message", async message => {
  if (message.content.startsWith("ziroetester")) {
    console.log(message)
  }
  let prefix = normalPrefix;

  if (message.author.bot) return;

  const { badwords } = require("./badwords.json")

  if (message.content.includes(badwords)) {
    if (message.deletable) {
      message.delete().catch(() => {})
    }
    message.author.send(`**You Can't Use This Word In ${message.guild.name}!**`).then(msg => {
      setTimeout(function() {
        msg.delete().catch(e => {})
      }, 30000)
    })
  }

  if (url(message.content)) {

 //if(message.member.hasPermission("MANAGE_MESSAGES")) return;
   if (message.deletable) {
     message.delete().catch(() => {})
   }

   message.channel.send(`**You Can't Send Links! <@${message.author.id}>**`);
}


      if (!message.content.startsWith(prefix)) return; //if (!message.content.startsWith(prefix) && !message.content.startsWith('ZT!')) return;

      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();

      if (cmd.length === 0) return;

      let command = client.commands.get(cmd);
      if (!command) command = client.commands.get(client.aliases.get(cmd));


      if (command) {
          command.run(client, message, args);
          }
})

client.on('guildMemberAdd', async member => {
  let channel = client.channels.cache.get(welcomechannel)

  let mutedcheck = await db.get(`muted_${member.id}`)
  await member.roles.add(roleid).catch(e => {})

  let footer = `ID: ${member.user.id}`

  if (mutedcheck === member.id) {
    await member.roles.add(mutedrole).catch(e => {})
    await member.roles.remove(roleid).catch(e => {})
    footer = `ID: ${member.user.id} | ${member.user.tag} Tried To Skip a Mute!`
  }

  let welcomeembed = new MessageEmbed()
  .setAuthor(member.user.tag, member.user.avatarURL({ dynamic: true }))
  .setThumbnail(member.user.avatarURL({ dynamic: true }))
  .setColor(color)
  .setDescription(`**<@${member.user.id}> Joined The Server!**`)
  .setFooter(footer)
  channel.send(welcomeembed)
})

client.on('guildMemberRemove', async member => {
  let channel = client.channels.cache.get(leavechannel)

  let leaveembed = new MessageEmbed()
  .setAuthor(member.user.tag, member.user.avatarURL({ dynamic: true }))
  .setThumbnail(member.user.avatarURL({ dynamic: true }))
  .setColor(color)
  .setDescription(`**<@${member.user.id}> Left The Server!**`)
  .setFooter("ID: " + member.user.id)
  channel.send(leaveembed)
})

client.on("ready", () => {
  client.user.setActivity(`${status}`,{type: "WATCHING"})
  let table = new ascii(`Bot`);
  table.addRow('On', '✅ ');
  console.log(table.toString())
})

client.login(token).catch(e => {
  let table = new ascii(`DB`);
  table.addRow('Token', '❌ ');
  console.log(table.toString())
})
