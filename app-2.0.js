//Problem: We need a simple way to look at a users badgecount and JavaScript points
//Solution: Use Node.js to connect to Treehouse's APIto get profile information to print out

const https = require('https');


//function to print message to console
function printMessage(username, badgecount, points){
   const message = `${username} has ${badgecount} number of badges and ${points}(s) points in JavaScript`;
   console.log(message);
}


function getProfile(username){
    //connect to the API URL (https://teamtreehouse.com/joshuaouma.json)
https.get(`https://teamtreehouse.com/${username}.json`, (res) => {
    let body = '';

  //console.log( res.statusCode);
  
//Read the data
    //an event is triggered when a piece of data comes in
    res.on('data', data=>{
        body+= data.toString();
    })

    //end event is triggered when it's completed reading the data in
    res.on('end', ()=>{
        //Parse the data->the process of converting a string into a data structure is called parsing
        const profile = JSON.parse(body);

        //console.dir(profile) //->use to confirm if the api is pulled 
        //Print the data
        printMessage(username, profile.badges.length, profile.points.JavaScript);

    });


});


}



//to prevent repeating, I can create an array, add usernames to it, then lop through it printing the details for each username

            // const users = ['joshuaouma','chalkers' ];

            // users.forEach(username => {
            //     getProfile(username);

            // });


//to prevent having to list all names in the array, you can rely on process global object's argv property. It returns command line arguments in  an array

const users = process.argv.slice(2);


users.forEach(username => {
    getProfile(username);

});


