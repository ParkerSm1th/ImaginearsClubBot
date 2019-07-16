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
      con.query("SELECT * FROM panel.discord_link_attempts WHERE step='2' AND discord_id=" + message.author.id, function (err, data) {
        if (err) throw err;
        if (data[0] != undefined) {
          helpers.sendSimpleEmbed(message.author, "Linking successful.", "Your discord account has been linked to **" + data[0]['minecraft_username'] + "**! Type -unlink to unlink!");
          con.query("UPDATE panel.discord_link_attempts SET step = 3 WHERE code = '" + data[0]['code'] + "'", function (err, result) {
            if (err) console.log(err);
            con.query(`INSERT INTO panel.discord_links (discord_id, discord_username, discord_identifier, minecraft_uuid, minecraft_username) VALUES (${message.author.id}, '${message.author.username}', ${message.author.discriminator}, '${data[0]['minecraft_uuid']}', '${data[0]['minecraft_username']}')`, function (err, result) {
                if (err) console.log(err);
                con.query(`DELETE FROM panel.discord_link_attempts WHERE discord_id='${message.author.id}'`, function (err, result) {
                    if (err) console.log(err);
                    bot.guilds.get('434122574813986816').members.get(message.author.id).setNickname(data[0]['minecraft_username']);
                    con.query("SELECT * FROM server.player_data WHERE uuid='" + data[0]['minecraft_uuid'] + "'", function (err, mcdata) {
                        if (err) throw err;
                        var roleNumber = mcdata[0]['rank'];
                        switch(roleNumber) {
                            case "12":
                                bot.guilds.get('434122574813986816').members.get(message.author.id).addRole('496160159219843082');
                                break;
                            case "11":
                                bot.guilds.get('434122574813986816').members.get(message.author.id).addRole('496159289031917568');
                                break;
                            case "10":
                                bot.guilds.get('434122574813986816').members.get(message.author.id).addRole('501910514532745216');
                                break;
                            case "9":
                                bot.guilds.get('434122574813986816').members.get(message.author.id).addRole('434177775730163731');
                                break;
                            case "8":
                                bot.guilds.get('434122574813986816').members.get(message.author.id).addRole('434177775730163731');
                                break;
                            case "7":
                                bot.guilds.get('434122574813986816').members.get(message.author.id).addRole('434177775730163731');
                                break;
                            case "6":
                                bot.guilds.get('434122574813986816').members.get(message.author.id).addRole('434177775730163731');
                                break;
                            case "5":
                                bot.guilds.get('434122574813986816').members.get(message.author.id).addRole('434321495339171840');
                                break;
                            case "4":
                                bot.guilds.get('434122574813986816').members.get(message.author.id).addRole('509938022041518081');
                                bot.guilds.get('434122574813986816').members.get(message.author.id).addRole('434179203022454806');
                                break;
                            case "3":
                                bot.guilds.get('434122574813986816').members.get(message.author.id).addRole('509937795330998282');
                                bot.guilds.get('434122574813986816').members.get(message.author.id).addRole('434179203022454806');
                                break;
                            case "2":
                                bot.guilds.get('434122574813986816').members.get(message.author.id).addRole('509937531668922379');
                                bot.guilds.get('434122574813986816').members.get(message.author.id).addRole('434179203022454806');
                                break;
                            case "1":
                                bot.guilds.get('434122574813986816').members.get(message.author.id).addRole('509937359417245708');
                                bot.guilds.get('434122574813986816').members.get(message.author.id).addRole('434179203022454806');
                                break;
                            case "0":
                                bot.guilds.get('434122574813986816').members.get(message.author.id).addRole('434179203022454806');
                                break;
                            default:
                                bot.guilds.get('434122574813986816').members.get(message.author.id).addRole('434179203022454806');
                                break;
                        }
                    });
                   bot.guilds.get('434122574813986816').members.get(message.author.id).addRole('564120421419712512');
                   con.end();
                });
            });
          });

        } else {
          helpers.sendErrorEmbed(message.author, "There is no link request to confirm!");
          con.end();
        }
      });
    });

}
 
module.exports.help = {
  name:"confirm",
  others:[],
  disabled:['disabledid']
}
