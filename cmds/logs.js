var Config = require('../config.js');
module.exports.run = async (Client, bot, message, args, helpers) => {

  helpers.sendSimpleEmbed(message.channel, `Logs link for ${Config.projectname}`, `http://23.94.53.246:${Config.port}/api/${Config.apiref}/logs/${message.channel.id}`);

}

module.exports.help = {
  name:"logs"
}
