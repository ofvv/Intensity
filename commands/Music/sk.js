const Discord = require("discord.js");
const { Util, MessageEmbed } = require("discord.js");
const { color } = require("../../config.json")
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const yts = require("yt-search");
const fs = require("fs");

module.exports = {
    name: "skip",
    aliases: ["sk"],
    category: "Owner",
    usage: "sj!skip",
    description: "Skip a Song",
    run: async (client, message, args, prefix) => {
      const channel = message.member.voice.channel
          if (!channel) return message.channel.send("**You Must Join a Voice Channel!**", message.channel);
          const serverQueue = message.client.queue.get(message.guild.id);
          if (!serverQueue) return message.channel.send("**No Songs To Skip!**", message.channel);
              if(!serverQueue.connection) return
      if(!serverQueue.connection.dispatcher) return
           if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            let xd = new MessageEmbed()
            .setDescription("**Resumed!**")
            .setColor(color || `#000001`)

         return message.channel.send(xd).catch(err => console.log(err));

          }


             try{
            serverQueue.connection.dispatcher.end()
            } catch (error) {
              serverQueue.voiceChannel.leave()
              message.client.queue.delete(message.guild.id);
              return message.channel.send(`**An Error Has Occured!:** ${error}`, message.channel);
            }
          message.react("✅")
    }
  }
