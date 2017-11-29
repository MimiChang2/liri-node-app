var Keys = require("./keys.js");

var request = require("request");

var command = process.argv[2];
var inputName = process.argv[3];

switch(command) {
    case "my-tweets":
        runTwitter();
        break;

    case "spotify-this-song":
        runSpotify();
        break;

    case "movie-this":
        runOMDB();
        break;

    case "do-what-it-says":
        runText();
        break;
}

function runTwitter() {

    var Twitter = require('twitter');

    var client = new Twitter(Keys.twitterKeys);

    var params = { screen_name: 'mimichang77', count: 20 };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if(!error) {
            console.log(tweets);
        }
        else {
            console.log(error);
        }
    });
}

function runSpotify() {
    var Spotify = require('node-spotify-api');

    var spotify = new Spotify(Keys.spotifyKeys);

    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if(err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(JSON.stringify(data));
    });
}

function runOMDB() {

    var queryUrl = "http://www.omdbapi.com/?t=" + inputName + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);

    // If the request is successful
    request(queryUrl, function(error, response, body) {
        console.log(body);

        // If the request is successful (i.e. if the response status code is 200)
        if(!error && response.statusCode === 200) {

            //Log Outputs
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("The movie's release year: " + JSON.parse(body).Released);
            console.log("iMDb Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).imdbRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
        else {
            console.log(error);
        }

        // var MrNobody = "http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy";
        //     return console.log(MrNobody);
    });
};
