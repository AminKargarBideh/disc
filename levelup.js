// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const boosters = await require('./boostercut.js');
let booster1 = " ";
//let run_x1 = " ",run_x2 = " ", run_x3 = " ", run_x4 = " ";
let question = context.params.event.content.replace('!gold', '').split('levelup')[0].trim()
let cut = context.params.event.content.split(' ')[2].trim()
let total_booster_cut = ((cut*1000)*0.60)
let realm = context.params.event.content.split(' ')[3].trim()
let user = context.params.event.author.username
let timeout = await lib.utils.kv['@0.1.16'].get({
  key: `timeout`,
  defaultValue: false,
});
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
/*booster1 = context.params.event.content.split(' ')[4]
run_x1 = context.params.event.content.split(' ')[5]
booster2 = context.params.event.content.split(' ')[6]
run_x2 = context.params.event.content.split(' ')[7]
booster3 = context.params.event.content.split(' ')[8]
run_x3 = context.params.event.content.split(' ')[9]
booster4 = context.params.event.content.split(' ')[10]
run_x4 = context.params.event.content.split(' ')[11]*/
/*
booster5 = context.params.event.content.split(' ')[12]
run_x5 = context.params.event.content.split(' ')[13]
booster6 = context.params.event.content.split(' ')[14]
run_x6 = context.params.event.content.split(' ')[15]
booster7 = context.params.event.content.split(' ')[16]
run_x7 = context.params.event.content.split(' ')[17]
booster8 = context.params.event.content.split(' ')[18]
run_x8 = context.params.event.content.split(' ')[19]
booster9 = context.params.event.content.split(' ')[20]
run_x9 = context.params.event.content.split(' ')[21]
booster10 = context.params.event.content.split(' ')[22]
run_x10 = context.params.event.content.split(' ')[23]
booster11 = context.params.event.content.split(' ')[24]
run_x11 = context.params.event.content.split(' ')[25]
booster12 = context.params.event.content.split(' ')[26]
run_x12 = context.params.event.content.split(' ')[27]
booster13 = context.params.event.content.split(' ')[28]
run_x13 = context.params.event.content.split(' ')[29]
booster14 = context.params.event.content.split(' ')[30]
run_x14 = context.params.event.content.split(' ')[31]
booster15 = context.params.event.content.split(' ')[32]
run_x15 = context.params.event.content.split(' ')[33]
*/
///const result = await boosters(run_x1,total_booster_cut);
//we generate our question argument by applying the .replace() method to remove the prefix command, and .split() to create an array of two elements by splitting them at answer: We keep the first element using [0] and use trim() to remove whitespaces from both ends of a strin
//if (context.params.event.content.split(' ')[12] != null){booster5 = context.params.even.content.split(' ')[12]}
//To generate answer we also use split() but this time keep the second element using [1]. We apply trim() to prevent any spaces on the ends from messing up our query match.
if (context.params.event.content.split(' ')[4] != null) {
  booster1 = context.params.event.content.split(' ')[4]
  //run_x1 = context.params.event.content.split(' ')[5]
}else booster1 = "";
/*if (context.params.event.content.split(' ')[5] != null) {
  booster2 = context.params.event.content.split(' ')[5]
  //run_x2 = context.params.event.content.split(' ')[7]
}else booster2 = ""
if (context.params.event.content.split(' ')[6] != null) {
  booster3 = context.params.event.content.split(' ')[6]
  //run_x3 = context.params.event.content.split(' ')[9]
}else booster3 = ""
if (context.params.event.content.split(' ')[7] != null) {
  booster4 = context.params.event.content.split(' ')[7]
  //run_x4 = context.params.event.content.split(' ')[11]
}else booster4 = ""
*/
let membersInput = context.params.event.content.split(' ').slice(4);
let memberIds = [];
//let results = [];
for (let i = 0; i < membersInput.length; i += 2) {
  memberIds.push(membersInput[i]);
}
if (!timeout) {
 for (let i = 0; i < memberIds.length; i +=1) {
  //console.log(memberIds);
  let selectQueryResult = await lib.googlesheets.query['@0.3.2'].select({
    //spreadsheetId: spreadsheetId,
    range: 'Sheet4!A:C',
    where: [
      {
        "id": memberIds[i]
      }
    ]
  });
  
  let current_cut_value = selectQueryResult.rows[0].fields.cut;
  //Promise.all(current_cut_value);
  let new_cut_value = parseInt(current_cut_value) + total_booster_cut;
  //console.log(current_cut_value);
 // console.log(new_cut_value);
//console.log(JSON.stringify(selectQueryResult, null, 2));
//console.log(JSON.stringify(selectQueryResult.rows[0], null, 2));
  //console.log(memberIds);
  //console.log(results[i]);
  await lib.googlesheets.query['@0.3.0'].update({
    //else, update the google sheets
    range: `Sheet4!A:C`,
    bounds: 'FULL_RANGE',
    where: [
      {
        id__contains: memberIds[i],
      },
    ],
    limit: {
      count: 0,
      offset: 0,
    },
    fields: {
      //username: '20',
      cut: new_cut_value,
    },
  });
  await lib.utils.kv['@0.1.16'].set({
    //sets a timeout
    key: `timeout`,
    value: true,
    ttl: 5,
  });
 }
}
//we pass our question and answer into our API call to await lib.googlesheets.query['@0.3.0'].insert to insert a new question and answer into our google sheet.
await lib.googlesheets.query['@0.3.0'].insert({
    range: `Sheet3!A:AG`,
    fieldsets: [
      {
        'user': user,
        'cut': cut*1000,
        'realm': realm,
        'booster1': booster1
        //'booster2': booster2,
        //'booster3': booster3,
        //'booster4': booster4,
        //'booster1_cut': await boosters(run_x1,total_booster_cut),
        //'booster2_cut': await boosters(run_x2,total_booster_cut),
        //'booster3_cut': await boosters(run_x3,total_booster_cut),
        //'booster4_cut': await boosters(run_x4,total_booster_cut),
        //'booster5_cut': await boosters(run_x5,total_booster_cut),
        //'booster6_cut': await boosters(run_x6,total_booster_cut),
        //'booster7_cut': await boosters(run_x7,total_booster_cut),
        //booster8_cut': await boosters(run_x8,total_booster_cut),
        //'booster9_cut': await boosters(run_x9,total_booster_cut),
        //'booster10_cut': await boosters(run_x10,total_booster_cut),
        //'booster11_cut': await boosters(run_x11,total_booster_cut),
        //'booster12_cut': await boosters(run_x12,total_booster_cut),
        //'booster13_cut': await boosters(run_x13,total_booster_cut),
        //'booster14_cut': await boosters(run_x14,total_booster_cut),
        //'booster15_cut': await boosters(run_x15,total_booster_cut)
      }
    ]
});

//we send a message into discord confirming our answer was recorded
await lib.discord.channels['@0.3.0'].messages.create({
  channel_id: context.params.event.channel_id,
  content: `:arrow_double_up: Your Level Up Payment Done! Thank you :arrow_double_up:`
});
}