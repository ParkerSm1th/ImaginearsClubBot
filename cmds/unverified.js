const Logger = require('../utils/logger.js');
const Config = require('../config.js');
module.exports.run = async (Client, bot, message, args, helpers) => {

    if (message.guild == null) {
        helpers.sendErrorEmbed(message.channel, "This command can not be run in DMs.");
        return true;
    }
    
    var userNameList = new Array();

    const cmRole = message.guild.roles.find(role => role.name == "Cast Member");
    const verifiedRole = message.guild.roles.find(role => role.name == "Verified");
    message.guild.fetchMembers()
        .then(function(members) {
            message.guild.members.forEach(function(member) {
                if (!(member.roles.has(verifiedRole.id))) {
                    if (member.roles.has(cmRole.id)) {
                        if (!(member.user.bot)) {
                            userNameList.push(member.user.username);
                        }
                    }
                }
            });
            message.channel.send("Unverified Cast Members: " + userNameList.join(", "));
        })
        .catch(console.error);

    

}
 
module.exports.help = {
  name:"unverified",
  others:[],
  disabled:['disabledid']
}
