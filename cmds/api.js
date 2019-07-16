const Logger = require('../utils/logger.js');
const Config = require('../config.js');
module.exports.run = async (Client, bot, message, args, helpers) => {

  helpers.sendSimpleEmbed(message.channel, `API link for ${Config.projectname}`, `http://23.94.53.246:${Config.port}/api/${Config.apiref}`);
  helpers.socket.send("test");

}
 
module.exports.help = {
  name:"api",
  others:["apilink", "al"],
  disabled:['disabledid']
}
