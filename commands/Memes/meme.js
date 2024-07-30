const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { color } = require("../../config.json")
const randomPuppy = require("random-puppy")

module.exports = {
    name: "meme",
    aliases: ["m"],
    category: "Memes",
    usage: "sj!meme",
    description: "Meme",
    run: async (client, message, args, prefix) => {

const ziro = client.users.cache.get("484701017015975936")
const subReddits = ["dankmeme", "meme", "me_irl", 'memes', 'Discordmemes', 'Memes_Of_The_Dank', 'MemeEconomy'];
const random = subReddits[Math.floor(Math.random() * subReddits.length)];
const img = await randomPuppy(random);
const embed = new discord.MessageEmbed()
  .setColor(color || `#000001`)
  //.setTitle("Subreddit: https://reddit.com/r/" + random)
  .setImage(img || `https://cdn.discordapp.com/attachments/805837103464054815/839786818463465482/Untitled_2.png`)
  //.setURL(`https://reddit.com/r/${random}`)
  .setFooter(`Command By ${ziro ? ziro.tag : 'Ziroトト#9200'} | github.com/ZiroCore`)
message.channel.send(embed).catch(e => {
  return;
  })
    }
  }
