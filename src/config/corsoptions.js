const { cors } = require('./config');


const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    // Extract the origin header from the request
    const { origin } = req.headers;
  
    // Check if the origin is in the whitelist
    if (cors.whitelist.includes(origin)) {
      // If the origin is whitelisted, allow the request
      corsOptions = { origin };
    } else {
      // If the origin is not whitelisted, block the request
      corsOptions = { origin: false };
    }
  
    // Pass the CORS options to the callback
    callback(null, corsOptions);
  };
  
  module.exports = corsOptionsDelegate;