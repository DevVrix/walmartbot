const Discord = require('discord.js');
const bot = new Discord.Client();
const ms = require("ms");
const os = require('os')
 const cpuStat = require("cpu-stat");
 const moment = require("moment") 
 const cheerio = require('cheerio');
 const got = require('got');
 const { stringify } = require('querystring');
 const giphy = require('giphy-api')("W8g6R14C0hpH6ZMon9HV9FTqKs4o4rCk");


let PREFIX = '-'


bot.on('ready', () =>{
    console.log(`Bot has started, with ${bot.users.cache.size} users, in ${bot.channels.cache.size} channels of ${bot.guilds.cache.size} guilds.`)
    bot.user.setActivity(`with ${bot.users.cache.size} players on Walmart! | -help`);
});
bot.on("message", async message => {
    exports.run = async (bot, msg, args) => {
    };
module.exports.run = async (bot, message, args) => {
    
}

let args = message.content.slice(PREFIX.length).split(" ")
if (message.author.bot) return;

  switch(args[0]){
          
      case 'gif':
        if (message.author.bot || !message.content.startsWith(PREFIX)) return;
        if (args.length === 0) {
            message.channel.send('No Seacrh terms!')
            return;
          }
          if (args.length === 1) {
            term = args.toString()
          } else {
            term = args.join(" ");
          }
          giphy.search(term).then(function (res) {
            // Res contains gif data!
            let id = res.data[0].id
            let msgurl = `https://media.giphy.com/media/${id}/giphy.gif`
            const embed = {
              "color": 3066993,
              "timestamp": new Date(),
              "footer": {
                "icon_url": "https://raw.githubusercontent.com/Giphy/GiphyAPI/f68a8f1663f29dd9e8e4ea728421eb2977e42d83/api_giphy_logo_sparkle_clear.gif",
                "text": "Powered by Giphy"
              },
              "image": {
                "url": msgurl
              },
              "fields": [
                {
                  "name": "Search Term",
                  "value": "`" + term + "`",
                  "inline": true
                },
                {
                  "name": "Page URL",
                  "value": "[Giphy](" + res.data[0].url + ")",
                  "inline": true
                }
              ]
            };
            message.channel.send({ embed });
        
          });
        
          message.delete();
        break;
      case 'stats':
        if (message.author.bot || !message.content.startsWith(PREFIX)) return;

        let { version } = require("discord.js");
     
        cpuStat.usagePercent(function(err, percent, seconds) {
          if (err) {
            return console.log(err);
          }
         
         let secs = Math.floor(bot.uptime % 60);
         let days = Math.floor((bot.uptime % 31536000) / 86400);
         let hours = Math.floor((bot.uptime / 3600) % 24);
         let mins = Math.floor((bot.uptime / 60) % 60);
 
          //let duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
          let embedStats = new Discord.MessageEmbed()
         .setTitle("*** Stats ***")
         .setColor("#FFFFE0")
         .addField("• Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
         .addField("• Uptime ", `${hours}h ${mins}m`, true) //`${duration}`, true)
         .addField("• Discord.js", `v${version}`, true)
        // .addField("• Node", `${process.version}`, true)
         .addField("• CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
         .addField("• CPU usage", `\`${percent.toFixed(2)}%\``,true)
         .addField("• Arch", `\`${os.arch()}\``,true)
         .addField("• Platform", `\`\`${os.platform()}\`\``,true)
         .setFooter("Walmart+ Developers stats")
 
         message.channel.send(embedStats)
         })
          break;
      case 'contact':
        if (message.author.bot || !message.content.startsWith(PREFIX)) return;

        if(args[1] == "help"){
            let helpembxd = new Discord.MessageEmbed()
            .setColor("#FFFFE0")
            .addField("Contact Command", "Usage: !Contact <reason>")
        
            message.channel.send(helpembxd);
            return;
          } 
        
            let Invite = await message.guild.channels.cache.find((c) => c.type === 'text').createInvite()
            let Sender = message.author;
            const sayMessage = args.join(" ");
            if(!sayMessage) return message.channel.send("Please give us reason for contacting").then(msg => {msg.delete(5000)});
        
           let contact = new Discord.MessageEmbed()
           .setColor("00ff00")
           .setThumbnail(Sender.displayAvatarURL())
           .setDescription(`Contact message from [${message.guild.name}](${Invite.url})`)
           .setTitle("Message from contact command!")
           .addField("User", Sender, true)
           .addField("User ID: ", Sender.id, true)
           .addField("Message: ", sayMessage)
           .setTimestamp()
        
            bot.users.cache.get("761429051956658176").send(contact);
        
            let zzembed = new Discord.MessageEmbed()
            .setColor("#FFFFE0")
            .setTitle("Message Sent!")
            .setDescription("Your contact message has been sent!")
            .addField("Reqested by ", Sender)
            .addField("Message: ", sayMessage)
            .setFooter("Thanks you for contacting with the Walmart+ support!")
        
            message.channel.send(zzembed).then(msg => {msg.delete(10000)});
        
                message.delete();
        
              
      break;
      case 'rate':
        if (message.author.bot || !message.content.startsWith(PREFIX)) return;

        let ratus = message.mentions.members.first();
        if(!ratus) return message.channel.send("Tag someone to rate them!");
        
        let rates = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
        
        let yresult = Math.floor((Math.random() * rates.length));
        
        if(ratus.user.id === message.author.id) {
          return message.channel.send(`**${message.author.username}**, I'd give you ${yresult}/10<:rofl:427846193503272960>`);
        } else return message.channel.send(`I'd give **__${ratus.user.username}__** ${yresult}/10 <:rofl:427846193503272960>`);
        
          break;
      case 'unicode':
        if (message.author.bot || !message.content.startsWith(PREFIX)) return;

  if (args[0] === undefined) {
      
    return message.channel.send('I need a character to get its unicode from!');

  } else {

    let transArg = args[0].toLowerCase();

    if (transArg === undefined) {

      return message.channel.send('Type **1** character to get the unicode from!');

    } else {

      if (transArg.length >= 10) {

        return message.channel.send(`Too long ${message.author}; you can only enter **1** character.`);

      }

      const kkembed = new Discord.MessageEmbed()
      .setDescription(transArg.charCodeAt(0));

      return message.channel.send(kkembed);

    }

}
          break;
    case 'avatar':
        if (message.author.bot || !message.content.startsWith(PREFIX)) return;

     
    let msg = await message.channel.send("Generating avatar...");

    let mentionedUser = message.mentions.users.first() || message.author;

        let aeembed = new Discord.MessageEmbed()

        .setImage(mentionedUser.displayAvatarURL())
        .setColor('#FFFFE0')
        .setTitle("Avatar")
        .setFooter("Searched by " + message.author.tag)
        .setDescription("[Avatar URL link]("+mentionedUser.displayAvatarURL()+")");

        message.channel.send(aeembed)


    msg.delete();

      
break;
        case 'help':
            if (message.author.bot || !message.content.startsWith(PREFIX)) return;

            hicon = bot.displayAvatarURL;
            hembed = new Discord.MessageEmbed()
            .setColor("#FFFFE0")
            .setAuthor("Walmart Help Command")
            .addFields(
                    {name:'Commands', value:'`-commands`'},
                    {name:'Fun Commands', value:'`-funcommands`'},
                    {name:'Donate!', value:'`-donate`'},
                    {name:'Contact', value:'`-contact`'},
                    {name:'Apply', value:'`-apply`'},
                    {name:'Staff Team', value:'`-staff`'},
            )
            .setTimestamp()

            message.channel.send(hembed)
        break;

            case 'commands':
             cicon = bot.user.displayAvatarURL;
             cembed = new Discord.MessageEmbed()

             .setColor("#FFFFE0")
             .setAuthor("Walmart+")
             .setTitle("Commands of Walmart+")
             .addFields(
                {name:"``-apply``", value: 'Application for staff'},
                {name:"``-contact``", value: 'Contact some available staff!'},
                {name:"`-ping`", value: 'Test your internet!'}
                )
            .setTimestamp()
                message.channel.send(cembed)
            break;

        case 'staff':
            sembed = new Discord.MessageEmbed()

            .setColor("#FF0000")
            .setAuthor("Error 404")
            .setTitle("Error")
            .setDescription("Please report this to the Developers if you see this!")
            message.channel.send(sembed)
        break;
        
        case 'donate':
            let bicon = bot.user.displayAvatarURL;
            let donateEmb = new Discord.MessageEmbed()
            .setColor("#FFFFE0")
            .setTitle("Walmart+")
            .setDescription("Donate for the Walmart trough this links!")
            .addField("PayPal Donate", "[PayPal](https://paypal.me/hexen)")
            .setFooter("Donation links for Walmart+ bot!")
            .setThumbnail(bicon)
            
            message.channel.send(donateEmb)
            
            message.delete();
            
            
        break;
        case 'apply':
            aembed = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setAuthor("Error 404")
            .setTitle("Error")
            .setDescription("Please report this to the Developers if you see this!")

            message.channel.send(aembed)
        break;
        
        case 'shop':
            sembed = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setAuthor("Error 404")
            .setTitle("Error")
            .setDescription("Please report this to the Developers if you see this!")
            message.channel.send(sembed)
        break;
        case 'bringme':
            let replies = ["No Idot", "Shut up Tseries", "Ew", "Your fired", "Cyka",];
            let result = Math.floor((Math.random() * replies.length));
            let question = args.join(" ");
        
            let ballembed = new Discord.MessageEmbed()
        
            .setAuthor(message.author.username)
            .setColor("#00ff00")
            .addField("Walmart+", replies[result]);
        
            message.channel.send(ballembed)
        
            message.delete();
         
            break;

            case 'ping':
                if (message.content.startsWith(prefix + "ping")) {
    
                    var ping = Date.now() - message.createdTimestamp + " ms";
                    message.channel.send("Your ping is `" + `${Date.now() - message.createdTimestamp}` + " ms`");
                
                  }
                    
                    break;
  }
})

bot.login(token)
