let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

d3.json(queryUrl).then(function (data) {
    earthQuakeData = data.features
    let myMap = L.map("map", {
        center: [15.5994, -28.6731],
        zoom: 3
    });
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
    
    for(let i = 0; i < earthQuakeData.length;i++){
        currentQuake = earthQuakeData[i];
        depth = currentQuake.geometry.coordinates[2]        
        let color = "";
        if (depth <= 10) {
            color = "green";
        }
        else if (depth <=30) {
            color = "yellow";
        }
        else if (depth <=50) {
            color = "green";
        }
        else if (depth <=70) {
            color = "#FFCD0080";
        }
        else if (depth <=90) {
            color = "#FF800080";
        }
        else {
            color = "red";
        }
        console.log()
        L.circle([currentQuake.geometry.coordinates[1],currentQuake.geometry.coordinates[0]], {
            fillOpacity: 0.75,
            color: color,
            radius: Math.abs(currentQuake.properties.mag) * 4000
          }).bindPopup(`<h1>${currentQuake.properties.place}</h1> 
                        <hr> <h3>Magnitude: ${currentQuake.properties.mag}</h3> 
                        <h3>Depth: ${depth}</h3>`).addTo(myMap);                
    }
});



