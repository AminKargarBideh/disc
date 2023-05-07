const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
//let userroll = context.params.event.member.roles[0];
//console.log(userroll);
let hasRequiredRole = false;
// type `await lib.` to display API autocomplete
let userRole = [];
// Extract the user's roles
const userRoles = context.params.event.member.roles;

// Define the required role ID
const requiredRoleId = '1104512138367750307';
for (let i = 0; i < userRoles.length; i ++) {
  userRole[i] = userRoles[i];
  if (userRole[i] === '1103788968610365562' || userRole[i] ==='1103004671309774879' || userRole[i] ==='1104387255839240273' || userRole[i] === '1101128270705070121' || userRole[i] === '1102698709826945108'){
    hasRequiredRole = true;
  }
}
// Check if the user has the required role
//const hasRequiredRole = userRoles.includes(requiredRoleId);
console.log(userRoles);
console.log(userRole);
console.log(hasRequiredRole);
if (!hasRequiredRole) {
  // If the user does not have the required role, send a message informing them
  await lib.discord.channels['@0.0.3'].messages.create({
    channel_id: context.params.event.channel_id,
    content: 'You do not have permission to use this bot.'
  });
} else {
/**
* An HTTP endpoint that acts as a webhook for Discord message events
* @param {object} event
* @returns {object} result Your return value
*/
module.exports = async (event) => {
  // Check if the message content starts with "!close"
  if (event.content.startsWith('!close')) {
    // Delete the channel using the provided API
    await lib.discord.channels['@0.3.4'].destroy({
      channel_id: event.channel_id
    });
  }

  // Return a result
  return {result: 'Channel deleted successfully'};
};
}