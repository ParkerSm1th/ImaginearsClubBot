const Logger = require('./utils/logger.js');
const Config = require('./config.js');
const fs = require("fs");
module.exports = {
  init: function(Client, bot, helpers) {
    fs.readdir("./cmds/", (err, files) => {
      Logger.log("Loading Commands");
      if(err) Logger.errorLog(err);
      let jsfile = files.filter(f => f.split(".").pop() === "js");
      if(jsfile.length <= 0){
        Logger.errorLog("Couldn't find commands.");
        return;
      }
      Logger.log(`Loading a total of ${jsfile.length} commands.`);
      jsfile.forEach((f, i) =>{
        if (f == "includes.js") return;
        let props = require(`./cmds/${f}`);
        Client.commands.set(props.help.name, props);
        if (props.help.others != null) {
          props.help.others.forEach((name) => {
            Client.commands.set(name, props);
          });
        }
      });
      Logger.log("Loaded Commands");
    });
    fs.readdir('./events/', (err, files) => {
      Logger.log("Loading Events");
      if (err) Logger.errorLog(err);
      Logger.log(`Loading a total of ${files.length} events.`);
      files.forEach(file => {
        const eventName = file.split(".")[0];
        const event = require(`./events/${file}`);
        Client.bot.on(eventName, event.bind(null, Client, Client.bot, Client.helpers));
        delete require.cache[require.resolve(`./events/${file}`)];
      });
      Logger.log("Loaded Events");
    });
    const WebSocket = require('ws');

    const ws = new WebSocket('wss://imaginears.club:4444');

    ws.on('open', function open() {
      Logger.log("Connected to web socket");
    });

    ws.on('message', function incoming(data) {
      console.log(data)
      var request = JSON.parse(data);
      if (request.type == "discordLinkToDiscord") {
        var mysql = require('mysql');

        var con = mysql.createConnection({
          host: "198.24.160.26",
          user: "root",
          password: "A9l0objZudcmslq9!"
        });

        con.connect(function(err) {
          if (err) throw err;
          con.query("SELECT * FROM panel.discord_link_attempts WHERE step='1' AND code='" + request.code + "'", function (err, result) {
            if (err) throw err;
            if (result[0] != undefined) {
              helpers.sendSimpleEmbed(bot.users.get(result[0]['discord_id']), "Link request", "Someone is trying to link the minecraft account **" + result[0]['minecraft_username'] + "** with your discord account. Type -confirm to confirm linking.");
              con.query("UPDATE panel.discord_link_attempts SET step = 2 WHERE code = '" + result[0]['code'] + "'", function (err, result) {
                if (err) console.log(err);
                con.end();
              });
            } else {
              con.end();
            }
          });
        });
      } 
    }); 
 }
}
