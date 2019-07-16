const Logger = require('../utils/logger.js');
const Config = require('../config.js');
module.exports.run = async (Client, bot, message, args, helpers) => {

    if (message.guild != null) {
        helpers.sendSimpleEmbed(message.channel, "Whoops!", "This command can only be run in DMs.");
        return true;
    }

    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "198.24.160.26",
      user: "root",
      password: "A9l0objZudcmslq9!"
    });

    function makeid(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        
        return text;
    }

    var code = makeid(4) + "-" + makeid(4);

    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT * FROM panel.discord_links WHERE discord_id=" + message.author.id, function (err, result) {
          if (err) throw err;
          if (result[0] != null) {
              helpers.sendSimpleEmbed(message.author, "Whoops!", "Your discord account is already linked to **" + result[0]['minecraft_username'] + "**, run -unlink to unlink.");
              con.end();
              return true;
          } else {
            con.query("DELETE FROM panel.discord_link_attempts WHERE discord_id=" + message.author.id, function (err, result) {
                if (err) throw err;
                con.query(`INSERT INTO panel.discord_link_attempts (discord_id, discord_username, discord_identifier, code, step) VALUES (${message.author.id}, '${message.author.username}', ${message.author.discriminator}, '${code}', 0)`, function (err, result) {
                    if (err) throw err;
                    helpers.sendSimpleEmbed(message.author, "Minecraft link", "Your unique linking code is **" + code + "**! Please join the server and run /discord " + code);
                    con.end();
                  });
              });
          }
      });
    });

}
 
module.exports.help = {
  name:"link",
  others:["discordlink"],
  disabled:['disabledid']
}
