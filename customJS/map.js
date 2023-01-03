var map = L.map('map').setView([51.505, -0.09], 3);
map.setMaxBounds([[-90, -180], [90, 180]]);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 2,
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);




function showCountry(countryName, gold, silver, bronze) {
    if (countryName in countries) {
        let [lat, lng] = countries[countryName];
        L.marker([lat, lng]).addTo(map).bindPopup('Country: ' + countryName + '<br>Gold Medals: ' + gold + '<br>Silver Medals: ' + silver + '<br>Bronze Medals: ' + bronze);
    }
}

// Define arrays to store the country names and medal counters
var countryNames = [];
var goldMedals = [];
var silverMedals = [];
var bronzeMedals = [];

$.ajax({
    url: 'http://192.168.160.58/Olympics/api/Statistics/Medals_Country',
    dataType: 'json',
    data: JSON.stringify({}),
    success: function(data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            // Extract the country name and add it to the country names array
            countryNames.push(data[i].CountryName);
          
            // Iterate over the medals in the current data item
            for (var j = 0; j < data[i].Medals.length; j++) {
              // Extract the counter for the current medal
              var counter = data[i].Medals[j].Counter;
          
              // Add the counter to the appropriate array based on the medal name
              if (data[i].Medals[j].MedalName === 'Gold') {
                goldMedals.push(counter);
              } else if (data[i].Medals[j].MedalName === 'Silver') {
                silverMedals.push(counter);
              } else if (data[i].Medals[j].MedalName === 'Bronze') {
                bronzeMedals.push(counter);
              }
            }
          }
    },
    complete: function(thing){
        for (var i = 0; i < countryNames.length; i++) {
            showCountry(countryNames[i], goldMedals[i], silverMedals[i], bronzeMedals[i])
        }
        hideMapLoader()
    }
});




