//Problem: We need a simple way to look at a users badgecount and JavaScript points
//Solution: Use Node.js to connect to Treehouse's APIto get profile information to print out

const https = require('https');
const http = require('http');



//function to print message to console
function printMessage(username, badgecount, points){
   const message = `${username} has ${badgecount} number of badges and ${points}(s) points in JavaScript`;
   console.log(message);
}
//function to print errror messages
function printError(error){
    console.error(error.message);

}

function getProfile(username){
    //connect to the API URL (https://teamtreehouse.com/joshuaouma.json)

try{

    const request = https.get(`https://teamtreehouse.com/${username}.json`, (res) => {
        if(res.statusCode === 200){

            let body = '';
            res.on('data', data=>{
                body+= data.toString();
            })

            res.on('end', ()=>{
                try{
                const profile = JSON.parse(body);
                printMessage(username, profile.badges.length, profile.points.JavaScript);
                }catch(error){
                    console.error(error.message);
                    //printError(error);

                }

            });
        }else{
            const message = `There was a problem getting the profile for ${username} (${http.STATUS_CODES[res.statusCode]})`;
            const statusCodeError = new Error(message);
            printError(statusCodeError);
        }

});

request.on('error', error=> console.error(`kuna shida na request ${error.message}`));


}catch(error){
    console.error(error.message);
    //printError(error);


}

}

const users = process.argv.slice(2);


users.forEach(username => {
    getProfile(username);

});


