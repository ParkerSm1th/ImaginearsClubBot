const Logger = require('../utils/logger.js');
const Config = require('../config.js');
const Client = require('../client.js');
const fs = require("fs");

function getDateTime() {

  var date = new Date();

  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;

  var min  = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;

  var sec  = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;

  var year = date.getFullYear();

  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;

  var day  = date.getDate();
  day = (day < 10 ? "0" : "") + day;

  return year + "/" + month + "/" + day + " " + hour + ":" + min + ":" + sec;

}

module.exports = (Client, bot, helpers, message) => {
  if(message.author.bot) return;
  var messagelog = `${message.author.username} (${message.author.id}) at ${getDateTime()}
${message.content}\n`;
  fs.appendFileSync(`./logs/${message.channel.id}.txt`, messagelog);

  if (Config.dmoff) {
    if (message.channel.type == "dm") {
      helpers.sendErrorEmbed(message.channel, "You can not run commands in PM!");
      return true;
    }
  }
  let prefix = Config.prefix;
  if (!message.content.startsWith(prefix)) return;
  let messageArray = message.content.trim().split(" ");
  let cmd = messageArray[0];
  let args = messageArray;
  let commandfile = Client.commands.get(cmd.slice(prefix.length));
  if(commandfile) {
    fs.readdir("./cmds/", (err, files) => {

      if(err) Logger.errorLog(err);
      let jsfile = files.filter(f => f.split(".").pop() === "js");
      if(jsfile.length <= 0){
        Logger.errorLog("Couldn't find commands.");
        return;
      }

      let props = commandfile;
      var allowed = true;
      if (allowed) {
        commandfile.run(Client, bot, message, args, helpers);
        Logger.logCommand(message, cmd);
      }
    });
  } else {
    Logger.logErrorCommand(message, cmd);
  }
}
