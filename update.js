const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

/**
* An HTTP endpoint that acts as a webhook for Discord member join events
* @param {object} event
* @returns {any}
*/
module.exports = async (event) => {
  // Get the new member's ID from the Discord member object
  //console.log(event.user.id);
  let memberId = event.user.id;
  let memberusername = event.user.username;

  // Connect to the Google Sheets API to access the desired sheet
  // Replace "your_spreadsheet_id" with the actual Spreadsheet ID
  // Replace "Sheet1!A:A" with the desired range in A1 notation
  let spreadsheetId = "1ITxpnzHGL9sL5sgYhhQSDd4Q1m-rd6U7zoa4sF9yYoU";
  let range = "Sheet2!A:C";
  
  let selectQueryResult = await lib.googlesheets.query['@0.3.2'].select({
    spreadsheetId: spreadsheetId,
    range: range,
    where: [
      {
        "id": `<@${memberId}>`
      }
    ]
  });

  // If the memberId is not found in the sheet, append the new member's ID to the Google Sheet
  if (selectQueryResult.rows.length === 0) {
    let insertQueryResult = await lib.googlesheets.query['@0.3.2'].insert({
      spreadsheetId: spreadsheetId,
      range: range,
      fieldsets: [
        {
          "id": `<@${memberId}>`,
          "username": `${memberusername}`,
          "cut": 0
        }
      ]
    });
  
    return `Member ID ${memberId} added to Google Sheet successfully.`;
  } else { 
    return 'Member ID Exist';
  }
};