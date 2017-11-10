const router = require("express").Router();
const _ = require("lodash");
const request = require("request");
const cheerio = require("cheerio");
const parseAll = require("html-metadata").parseAll;
const GoogleMapsAPI = require("googlemaps");
const publicConfig = {
  key: "AIzaSyAxF2aW5TWMiclJI5MdizMLBUFzXECbWM0",
  stagger_time: 1000,
  secure: true
};
const url =
  "https://www.nycourts.gov/courts/2jd/kings/civil/foreclosures/2017/"; //url to auction listing
const gmAPI = new GoogleMapsAPI(publicConfig);

module.exports = router;

var properties = gatherData();
router.get("/", (req, res, next) => {
  //   if (!err && propertiesDataStore && propertiesDataStore.query_value.length > 1 && new Date(propertiesDataStore.query_value[0].auction_date) > new Date()) {
  //     return json.res(propertiesDataStore);
  //   } else {
  //     gatherData();
  //   }

  //properties.then(res.json, res.status(500).json);
  properties.then(r => {
    res.status(200).json(r);
  });
});

function gatherData() {
  console.log("gathering data");
  var query = "a";
  var options = {
    url: url,
    headers: {
      "User-Agent": "Chrome/33.0.1750.117"
    }
  };
  return new Promise((resolve, reject) => {
    request(options, function(err, response, body) {
      if (err) reject(Error(err)); //checking errors
      if (response.statusCode !== 200) reject(body);
      var $ = cheerio.load(body);
      var counter = 0;
      var tempArray = [];
      var day = new Date();

      parseAll($, (err, metadata) => {
        if (err) reject(err);
        var result = {
          metadata: metadata
        };
        function performQuery(q) {
          var pdfArray = [];
          if (!q) return null;
          if (!q.length && !_.isObject(q)) return null;
          var queryMatcher = q;

          if (_.isObject(q)) {
            queryMatcher = q.match;
          }
          $("a").map(function(i, link) {
            var href = $(link).attr("href");
            if (href) {
              if (!href.match(".pdf") || href.length < 5) return;
              pdfArray.push({
                PDFlink: `${url}${href.split("/")[7]}`,
                address:
                  href
                    .split("/")[7]
                    .replace(/-/g, " ")
                    .replace(/.pdf/g, "") + ", Brooklyn, Ny",
                auctionDate: day.setDate(
                  day.getDate() + (4 + 7 - day.getDay()) % 7
                ),
                time: "2:30 PM",
                room: "224"
              });
            }
          });
          _.each(pdfArray, function(prop) {
            var geocodeParams = {
              address: prop.address,
              language: "en",
              region: "US"
            };
            // geocode API
            gmAPI.geocode(geocodeParams, function(err, result) {
              counter++;
              if (!err && result.status !== "ZERO_RESULTS") {
                prop.formatedAddress = result.results[0];
                var params = {
                  location:
                    result.results[0].geometry.location.lat +
                    "," +
                    result.results[0].geometry.location.lng,
                  size: "800x400",
                  heading: 108.4,
                  pitch: 7,
                  fov: 40
                };
                prop.formatedAddress.streetView = gmAPI.streetView(params);
                if (counter === pdfArray.length) {
                  tempArray = pdfArray;
                  result.lastRan = new Date();
                  result.query_value = pdfArray;
                  // lib.utils.storage.set(
                  //   "propertiesDataStore",
                  //   result,
                  //   (err, value) => {}
                  // );
                  // console.log(result.query_value);
                  resolve(result);
                }
              }
            });
          });
          resolve(pdfArray);
        }

        result.url = url;

        if (_.isArray(query)) {
          result.query = [];
          result.query_value = [];
          result.query_error = [];
          _.each(query, q => {
            try {
              let data = performQuery(q);
              result.query.push(q);
              result.query_value.push(data);
            } catch (e) {
              result.query_error.push((e && e.message) || e);
            }
          });
        } else if (query && query.length) {
          result.query = query;
          try {
            performQuery(query);
          } catch (e) {
            reject(e);
            // result.query_error = (e && e.message) || e;
            // return res.json(null, result);
          }
        }
        resolve(result);
      });
    });
  });

  // }
  // return p;
}
