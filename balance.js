const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let user = `${context.params.event.author.id}`;
let selectQueryResult = await lib.googlesheets.query['@0.3.2'].select({
  //spreadsheetId: spreadsheetId,
  range: 'Sheet4!A:C',
  where: [
    {
      id__contains: user,
    },
  ],
});

if (context.params.event.channel_id === '1102718878968184872') {
// Check if the user ID is found
if (selectQueryResult.rows.length > 0) {
  // Retrieve the corresponding balance field from the sheet
  //message = selectQueryResult.rows[0].fields[1]; // Modify the index to match the balance column in your sheet
  //console.log(JSON.stringify(selectQueryResult, null, 2));

  // Send a direct message to the user with their balance using Discord API

  //let message = context.params.event.content.split(' ').slice(2).join(' ');

  /*await lib.discord.channels['@0.1.1'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `You must tag a user to Send A DM to them`,
  });
  //console.log(`${context.params.event.channel_id}`);
  /*await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `Please Provide A Message To DM`,
  });*/
  let guild = await lib.discord.guilds['@0.1.0'].retrieve({
    guild_id: context.params.event.guild_id, // required
  });
  await lib.discord.channels['@0.1.1'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `Dear User We Sent Your Balance To Your DM`,
  });
  //console.log('User ID:', user);
  //console.log('Message content:', selectQueryResult.rows[0].fields.cut);
  await lib.discord.users['@0.1.3'].dms.create({
    recipient_id: `${user}`,
    //content: `Your Balance Is ${selectQueryResult.rows[0].fields.cut} :coin:`,
    content: '',
        tts: false,
        embed: {
          type: 'rich',
          title: `**${guild.name}**`,
          description: `You Requested For Balance!
    *From:* **OverRated**
    *In:* **${guild.name}**
    *Current Cycle:* **Your Balance Is ${selectQueryResult.rows[0].fields.cut} :coin:**`,
          color: 131644,
        },
  });
}
}