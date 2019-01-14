const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
bot.on("ready", async () => {
  console.log(`${bot.user.username} is online`);
  bot.user.setGame("with the Breeze Dev Team");
});

bot.on("message", async message=> {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  
  
if(cmd ===`${prefix}serverinfo`){
  let sicon = message.guild.displayAvatarURL;
  let serverinbed = new Discord.RichEmbed()
  .setDescription("Server Info")
  .setColor("#5fe00f")
  .setThumbnail(sicon)
  .addField("Server Name", message.guild.name)
  .addField("You Joined", message.member.joinedAt)
  .addField("Total Members", message.guild.memberCount);

  return message.channel.send(serverinbed);
}
  
  
  if(cmd ===`${prefix}cmds`){
  let serverinbed = new Discord.RichEmbed()
  message.channel.send("```Warn, Kick, Clear, Ban```")
}
if(cmd === `${prefix}kick`){
let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!kUser) return message.channel.send("Cant Find user");
let kreason = args.join(" ").slice(22);
if(!message.member.hasPermission("KICK_MEMBERS")) return message.send("Nice Try")
if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Cant Kick other Mods")

let kickEmbed = new Discord.RichEmbed()
.setDescription("Kick")
.setColor("#e09d0e")
.addField("Kicked User", `${kUser} with ID ${kUser.id}`)
.addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
.addField("Time", message.createdAt)
.addField("Kicked in", message.channel)
.addField("Reason", kreason);

let kickChannel = message.guild.channels.find(`name`, "modlog")
if(!kickChannel) return message.channel.send("Cant Find the ModLog")

message.guild.member(kUser).kick(kreason);
kickChannel.send(kickEmbed);



  return;
}
if(cmd === `${prefix}warn`){
let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!wUser) return message.channel.send("Cant Find user");
let wreason = args.join(" ").slice(22);
if(!message.member.hasPermission("KICK_MEMBERS")) return message.send("Nice Try")


let warnEmbed = new Discord.RichEmbed()
.setDescription("Warn")
.setColor("#e8f442")
.addField("Warned User", `${wUser} with ID ${wUser.id}`)
.addField("Warned By", `<@${message.author.id}> with ID ${message.author.id}`)
.addField("Time", message.createdAt)
.addField("Warned in", message.channel)
.addField("Reason", wreason);

let warnChannel = message.guild.channels.find(`name`, "modlog")
if(!warnChannel) return message.channel.send("Cant Find the ModLog")

message.channel.send("User has been Warned!");
warnChannel.send(warnEmbed);
return;

}
if(cmd === `${prefix}ban`){
let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!bUser) return message.channel.send("Cant Find user");
let breason = args.join(" ").slice(22);
if(!message.member.hasPermission("BAN_MEMBERS")) return message.send("Nice Try")
if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Can't ban other Mods")

let banembed = new Discord.RichEmbed()
.setDescription("Ban")
.setColor("#e09d0e")
.addField("Banned User", `${kUser} with ID ${kUser.id}`)
.addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
.addField("Time", message.createdAt)
.addField("Banned in", message.channel)
.addField("Reason", kreason);

let kickChannel = message.guild.channels.find(`name`, "modlog")
if(!kickChannel) return message.channel.send("Cant Find the ModLog")

message.guild.member(bUser).ban(kreason);
kickChannel.send(banembed);



  return;
}
if(cmd ===`${prefix}clear`){
if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Nope");
if(!args[0]) return message.channel.send("Whoops");
message.channel.bulkDelete(args[0]).then(() => {

  let clearembed = new Discord.RichEmbed()
  .setDescription("Clear")
  .setColor("#e09d0e")
  .addField("Cleared by", message.author)
  .addField("Cleared", args[0])
  .addField("Time", message.createdAt);



  message.channel.send("10-4").then(msg => msg.delete(5000));
  message.guild.channels.find(`name`, "modlog").send(clearembed);
})

};
  //say Hello
  if(cmd ===`${prefix}botinfo`){
    let bicon = bot.user.displayAvatarURL;
    let botinbed = new Discord.RichEmbed()
    .setDescription("Bot Infomation")
    .setColor("#d8261a")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt);

    return message.channel.send(botinbed);
  }
});



bot.login(botconfig.token);
