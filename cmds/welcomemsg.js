const Logger = require('../utils/logger.js');
const Config = require('../config.js');
module.exports.run = async (Client, bot, message, args, helpers) => {

  if (message.author.id == "212630637365035009") {
      message.channel.send(`Welcome to the Imaginears Club discord! We are so glad you decided to join us in the discord! We use a verification process here at Imaginears so please follow the steps below to link your discord to your minecraft account!

**Minecraft Verification Steps**
      
To link your discord to your minecraft account please first **message the bot (that's me)** with the message "-link" from there you will be given a command to run in-game. You will be given instructions from there!
      
Thanks for choosing Imaginears and please do not hesitate to message <@212630637365035009> if you need any help!`)
  }

}
 
module.exports.help = {
  name:"welcomemsg",
  others:["", ""],
  disabled:['disabledid']
}
