const Discord = require("discord.js");
const { Util, MessageEmbed } = require("discord.js");
const { color } = require("../../config.json")
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const yts = require("yt-search");
const fs = require("fs");

module.exports = {
    name: "play",
    aliases: ["p"],
    category: "Owner",
    usage: "s!play <song>",
    description: "Play a Song",
    run: async (client, message, args, prefix) => {
      let channel = message.member.voice.channel;
              if (!channel) return message.channel.send("**You Need To Join a Voice Channel First!**");

              const permissions = channel.permissionsFor(message.client.user);
              if (!permissions.has("CONNECT")) return message.channel.send("**No Perms!**");
              if (!permissions.has("SPEAK")) return message.channel.send("**No Perms!**");

              var searchString = args.join(" ");
              if (!searchString) return message.channel.send("**Choose a Song!**");
              const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
              var serverQueue = message.client.queue.get(message.guild.id);

              let songInfo = null;
              let song = null;
              if (url.match(/^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi)) {
                  try {
                      songInfo = await ytdl.getInfo(url);
                      if (!songInfo) return message.channel.send("**I Can't Find This Song!**");
                      song = {
                          id: songInfo.videoDetails.videoId,
                          title: songInfo.videoDetails.title,
                          url: songInfo.videoDetails.video_url,
                          img: songInfo.player_response.videoDetails.thumbnail.thumbnails[0].url,
                          duration: songInfo.videoDetails.lengthSeconds,
                          ago: songInfo.videoDetails.publishDate,
                          views: String(songInfo.videoDetails.viewCount).padStart(10, " "),
                          req: message.author,
                      };
                  } catch (error) {
                      console.error(error);
                      return message.reply(error.message).catch(console.error);
                  }
              } else {
                  try {
                      var searched = await yts.search(searchString);
                      if (searched.videos.length === 0) return message.channel.send("**I Can't Find This Song!**");

                      songInfo = searched.videos[0];
                      song = {
                          id: songInfo.videoId,
                          title: Util.escapeMarkdown(songInfo.title),
                          views: String(songInfo.views).padStart(10, " "),
                          url: songInfo.url,
                          ago: songInfo.ago,
                          duration: songInfo.duration.toString(),
                          img: songInfo.image,
                          req: message.author,
                      };
                  } catch (error) {
                      console.error(error);
                      return message.reply(error.message).catch(console.error);
                  }
              }

              if (serverQueue) {
                  serverQueue.songs.push(song);
                  let thing = new MessageEmbed()
                      .setAuthor("Added To Queue")
                      .setThumbnail(song.img)
                      .setColor(color || `#000001`)
                      .addField("Song", song.title, true)
                      .addField("Duration", song.duration, true)
                      .addField("Requested by", song.req.tag, true)
                  return message.channel.send(thing);
              }

              const queueConstruct = {
                  textChannel: message.channel,
                  voiceChannel: channel,
                  connection: null,
                  songs: [],
                  volume: 80,
                  playing: true,
                  loop: false,
              };
              message.client.queue.set(message.guild.id, queueConstruct);
              queueConstruct.songs.push(song);

              const play = async (song) => {
                  const queue = message.client.queue.get(message.guild.id);
                  if (!song) {
                    //  message.channel.send(
                    //      "Leaving the voice channel because I think there are no songs in the queue. If you like the bot stay 24/7 in voice channel go to `commands/play.js` and remove the line number 61\n\nThank you for using my code! [GitHub](https://github.com/SudhanPlayz/Discord-MusicBot)",
                    //      message.channel
                  //    );
                  try {
                  setTimeout(function() {
                      message.guild.me.voice.channel.leave();
                      message.client.queue.delete(message.guild.id);
                      return;
                    }, 120000)
                    } catch (e) {
                      return;
                    }
                  }
                  let stream = null;
                  if (song.url.includes("youtube.com")) {
                      stream = await ytdl(song.url);
                      stream.on("error", function (er) {
                          if (er) {
                              if (queue) {
                                  queue.songs.shift();
                                  play(queue.songs[0]);
                                  return message.channel.send(`An unexpected error has occurred.\nPossible type \`${er}\``);
                              }
                          }
                      });
                  }
                  queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));

                  const dispatcher = queue.connection.play(ytdl(song.url, { quality: "highestaudio", highWaterMark: 1 << 25, type: "opus" })).on("finish", () => {
                      const shiffed = queue.songs.shift();
                      if (queue.loop === true) {
                          queue.songs.push(shiffed);
                      }
                      play(queue.songs[0]);
                  });

                  dispatcher.setVolumeLogarithmic(queue.volume / 100);
                  let thing = new MessageEmbed()
                      .setThumbnail(song.img)
                      .setColor(color || `#000001`)
                      .addField("Song", song.title, true)
                      .addField("Duration", song.duration, true)
                      .addField("Requested by", song.req.tag, true)
                  queue.textChannel.send(thing);
              };

              try {
                  const connection = await channel.join();
                  queueConstruct.connection = connection;
                  play(queueConstruct.songs[0]);
              } catch (error) {
                  console.error(`I could not join the voice channel: ${error}`);
                  message.client.queue.delete(message.guild.id);
                  await channel.leave();
                  return message.channel.send(`An Error Has Occured!: ${error}`);
              }
    }
  }
