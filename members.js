const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
/**
* An HTTP endpoint that acts as a webhook for Discord message.create event
* @param {object} event
* @returns {object} result Your return value
*/
module.exports = async (event) => {
  const {message} = event;
  
  // Check if the message is from an authorized user (server admin)
  /*if (message.author.id !== '274136223176589312' || message.content !== '!members') {
    return { statusCode: 200 };
  }*/

  // Fetch the list of members from the Discord server
 // console.log(message);
  const members = await lib.discord.guilds['@0.2.4'].members.list({
    guild_id: '1101123713144991754',
    limit: 20000 // Adjust the limit as needed
  });

  // Format the member data for Google Sheets
  const formattedMembers = members.map(member => ({
    id: member.user.id,
    username: member.user.username,
    //discriminator: member.user.discriminator
  }));

  // Create a new Google Sheet
/*  const spreadsheet = await lib.googlesheets.spreadsheets['@0.1.11'].create({
    properties: {
      title: 'Discord Members'
    },
    sheets: [{
      properties: {
        title: 'Members',
        gridProperties: {
          rowCount: formattedMembers.length + 1,
          columnCount: 3
        }
      }
    }]
  });
*/
  // Add the member data to the Google Sheet
await lib.googlesheets.query['@0.3.2'].insert({
  //spreadsheetId: spreadsheet.spreadsheetId,
  range: 'Sheet2!A:C',
  fieldsets: formattedMembers.map(member => {
    return {
      'id': `<@${member.id}>`,
      'username': member.username,
      'cut': 0
    };
  })
  });

  // Send a confirmation message back to the user
  await lib.discord.channels['@0.3.4'].messages.create({
    channel_id: `${event.channel_id}`,
    content: 'Discord members have been successfully imported to Google Sheets!'
  });

  return { statusCode: 200 };
};