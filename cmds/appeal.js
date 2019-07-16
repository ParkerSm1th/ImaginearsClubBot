const Logger = require('../utils/logger.js');
const Config = require('../config.js');
module.exports.run = async (Client, bot, message, args, helpers) => {

  helpers.sendEmbed(message.channel, `Imaginears Club Appeal Hub`, [
      {
          name: "Link",
          value: "https://imaginears.club/hub/appeal"
      },
      {
          name: "Info",
          value: "You can get your punishment id by attempting to login to the server, your punishment id will be displayed to you."
      },
      {
        name: "---",
        value: "Example of ban screen"
    },
    ], "http://i.yeetdev.com/up/c5147d723edb69913eebf6419e6c0544.png");

}
 
module.exports.help = {
  name:"appeal",
  others:["helpunban"],
  disabled:['disabledid']
}
