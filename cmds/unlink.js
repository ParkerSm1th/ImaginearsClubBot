const Logger = require('../utils/logger.js');
const Config = require('../config.js');
module.exports.run = async (Client, bot, message, args, helpers) => {

    if (message.guild != null) {
        helpers.sendErrorEmbed(message.channel, "This command can only be run in DMs.");
        return true;
    }

    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "198.24.160.26",
      user: "root",
      password: "A9l0objZudcmslq9!"
    });

    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT * FROM panel.discord_links WHERE discord_id=" + message.author.id, function (err, data) {
        if (err) throw err;
        if (data[0] != undefined) {
            con.query(`DELETE FROM panel.discord_links WHERE discord_id='${message.author.id}'`, function (err, result) {
                if (err) console.log(err);
                bot.guilds.get('434122574813986816').members.get(message.author.id).removeRole('564120421419712512');
                helpers.sendSimpleEmbed(message.author, "Unlinking successful", "Your discord account has been unlinked from **" + data[0]['minecraft_username'] + "**!");
                con.end();
            });

        } else {
          helpers.sendErrorEmbed(message.author, "Your account is not linked to a minecraft account!");
          con.end();
        }
      });
    });

}
 
module.exports.help = {
  name:"unlink",
  others:[],
  disabled:['disabledid']
}
