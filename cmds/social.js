const Logger = require('../utils/logger.js');
const Config = require('../config.js');
module.exports.run = async (Client, bot, message, args, helpers) => {

    helpers.sendEmbed(message.channel, `Imaginears Club Social Media`, [
        {
          name: "Website",
          value: "https://imaginears.club"
        },
        {
          name: "Twitter",
          value: "https://twitter.com/imaginearsclub"
        },
        {
            name: "Instagram",
            value: "https://instagram.com/imaginearsclub"
        }
      ]);

}

module.exports.help = {
  name:"social",
  others:["website", "twitter"],
  disabled:['disabledid']
}
