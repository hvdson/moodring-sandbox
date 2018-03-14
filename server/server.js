// require('dotenv').config(); // add to dependencies

// const express = require('express');
// const request = require('request'); // add to dependencies
// const querystring = require('querystring'); // add to dependencies
// const cookieParser = require('cookie-parser');

// const app = express();

// // moodring client credentials and callback uri
// const client_id = process.env.SPOTIFY_CLIENT_KEY;
// const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
// const redirect_uri = 'http://localhost:8888/callback';

// const generateRandomString = function(length) {
//   let text = '';
//   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

//   for (let i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// };

// let stateKey = 'spotify_auth_state';
// console.log("here!");

// app.use(express.static(__dirname + '../public'))
//   .use(cookieParser());

// // need user to login
// app.get('/login', function(req, res) {
//   let state = generateRandomString(16);
//   res.cookie(stateKey, state);

// // need to generate OAuth token using app credentials to get user login
//   // application requests authorization
//   let scope = 'user-read-private user-read-email';
//   res.redirect('https://accounts.spotify.com/authorize?' +
//     querystring.stringify({
//       response_type: 'code',
//       client_id: client_id,
//       scope: scope,
//       redirect_uri: redirect_uri,
//       state: state
//     }));
// });

// app.get('/callback', function(req, res) {
//   let code = req.query.code || null;
//   let state = req.query.state || null;
//   let storedState = req.cookies ? req.cookies[stateKey] : null;

//   if (state === null || state !== storedState) {
//     res.redirect('/#' +
//       querystring.stringify({
//         error: 'state_mismatch'
//       }));
//   } else {
//     res.clearCookie(stateKey);
//     let authOptions = {
//       url: 'https://account.spotify.com/api/token',
//       form: {
//         code: code,
//         redirect_uri: redirect_uri,
//         grant_type: 'authorization_code'
//       },
//       headers: {
//         'Authorization': 'Basic' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//       },
//       json: true
//     };

//     request.post(authOptions, function(error, response, body) {
//       if (!error && response.statusCode === 200) {

//         var access_token = body.access_token,
//             refresh_token = body.refresh_token;

//         var options = {
//           url: 'https://api.spotify.com/v1/me',
//           headers: { 'Authorization': 'Bearer ' + access_token },
//           json: true
//         };

//         // use the access token to access the Spotify Web API
//         request.get(options, function(error, response, body) {
//           console.log(body);
//         });

//         // we can also pass the token to the browser to make requests from there
//         res.redirect('http://localhost:3000/#' +
//           querystring.stringify({
//             access_token: access_token,
//             refresh_token: refresh_token
//           }));
//       } else {
//         res.redirect('/#' +
//           querystring.stringify({
//             error: 'invalid_token'
//           }));
//       }
//     });
//   }
// });


// // need to create a get request to spotify API's playlist search
//   // this needs the OAuth token
//   // needs to make an object to include search params


// // needs to interact with the public view


// // need to handle the response from the API

// console.log('Listening on 8888');
// app.listen(8888);