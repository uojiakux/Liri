var dotenv = require("dotenv").config();
var request = require("request");
var Spotify = require('node-spotify-api');
var moment = require("moment");

var keys = require("./keys");

// You'll use Request to grab data from the OMDB API and the Bands In Town API



var arg1 = process.argv[2];
var input = process.argv[3];


if (arg1 === "concert-this") {

    // Run a request to the Bands in Town API with the input specified
    var queryURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";

      request(queryURL, function (error, response, body) {
          if (!error && response.statusCode === 200) {

            console.log(JSON.parse(body));

            // Did not work 
            // console.log(JSON.parse(body[this]).venue.name)
            // console.log(JSON.parse(body[this]).venue.city)
            // console.log(JSON.parse(body[this]).venue.datetime)
          }
      })

    // if (error) {return console.log(error)};
}

if (arg1 === "spotify-this-song") {

    var spotify = new Spotify (keys.spotify);

        spotify.search({ type: 'track', query: input, limit: 1 }, function (err, data) {

        // Did not work 
        // if (!arg1) {
        //         input = "The Sign";
        //         spotify.search({ type: 'track', query: input, limit: 1 }, function (err, data) {
        //             console.log(data.tracks.items[0].album.artists);
        //         })
        // }       

        if (err) {
            return console.log('Error occurred: ' + err);
        }
        
        console.log(data.tracks.items[0].album.artists)

        // Did not work
        // console.log(data.tracks.items.album.artists);
        // console.log(input);
        // console.log((data.tracks.items.album.href);
        // console.log(data.tracks.items.album.name);

    })
}

if (arg1 === "movie-this") {

    // Run a request to the OMDB API API with the input specified
    var queryURL = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

      request(queryURL, function (error, response, body) {
          if (!error && response.statusCode === 200) {

            console.log(JSON.parse(body).Title);
            console.log(JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log(JSON.parse(body).Ratings[1]);
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Plot);
            console.log(JSON.parse(body).Actors);
          }
      })

}

if (arg1 === "do-what-it-says") {
    var fs = require("fs");
    
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
            return console.log(error);
          }

          // I did not finish. It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

    });

}
