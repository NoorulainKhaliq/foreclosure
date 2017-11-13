const request = require("request");
const cheerio = require("cheerio");
const GoogleMapsAPI = require("googlemaps");

module.exports = gatherData;

async function gatherData() {
  const propertiesPage = await getPropertiesPage().catch(console.error);
  const links = extractLinks(propertiesPage);
  const properties = [];
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const shortAddress =
      link
        .split("/")[9]
        .replace(/-/g, " ")
        .replace(/.pdf/g, "") + ", Brooklyn, Ny";

    const property = {
      PDFlink: link
    };

    const locationInfo = await getLocationInfo(shortAddress);
    if (locationInfo) {
      const { formattedAddress, lat, lng, streetView } = locationInfo;
      property.address = formattedAddress;
      property.lat = lat;
      property.lng = lng;
      property.streetView = streetView;
    } else {
      property.address = shortAddress;
    }
    properties.push(property);
  }
  return properties;
}

function getPropertiesPage() {
  return new Promise((resolve, reject) => {
    const url =
      "https://www.nycourts.gov/courts/2jd/kings/civil/foreclosures/2017/";

    request(url, function(err, res, body) {
      if (err) reject(err);
      if (res.statusCode !== 200) reject(new Error(body));
      resolve(body);
    });
  });
}

//parsed all the html page, extracted links and put them into an array
//mapped over the array and included only the tags that included pdf.
function extractLinks(html) {
  var $ = cheerio.load(html);
  const links = Array.from($("a"));
  return links
    .map(a => "https://www.nycourts.gov" + a.attribs.href)
    .filter(href => href.includes("pdf"));
}

//this function uses the address to retrieve the geoode from google.
async function getLocationInfo(address) {
  return new Promise((resolve, reject) => {
    const publicConfig = {
      key: "AIzaSyAxF2aW5TWMiclJI5MdizMLBUFzXECbWM0",
      stagger_time: 1000,
      secure: true
    };
    const gmAPI = new GoogleMapsAPI(publicConfig);
    const params = {
      address,
      language: "en",
      region: "US"
    };
    gmAPI.geocode(params, function(err, result) {
      var locationInfo = {};
      if (err) {
        reject(err);
      }
      if (result.status === "ZERO_RESULTS" || !result.results[0]) {
        return resolve(undefined);
      }
      const rawLocationInfo = result.results[0];
      locationInfo.formattedAddress = rawLocationInfo.formatted_address;
      locationInfo.lat = rawLocationInfo.geometry.location.lat;
      locationInfo.lng = rawLocationInfo.geometry.location.lng;
      const svParams = {
        location: locationInfo.lat + "," + locationInfo.lng,
        size: "800x400",
        heading: 108.4,
        pitch: 7,
        fov: 40
      };
      locationInfo.streetView = gmAPI.streetView(svParams);
      resolve(locationInfo);
    });
  });
}
