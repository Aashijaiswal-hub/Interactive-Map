const locations = [];

const map = L.map('map', { zoomControl: false }).setView([0, 0], 2);

L.control.zoom({
    position: 'bottomright'
}).addTo(map);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

const markersLayer = L.layerGroup().addTo(map);
const searchLayer = L.layerGroup().addTo(map);

function bounceMarker(marker) {
    if (marker._icon) {
        marker._icon.classList.add('marker-bounce');
        setTimeout(() => {
            marker._icon.classList.remove('marker-bounce');
        }, 1000);
    }
}

function displayMarkers(data) {
    markersLayer.clearLayers();

    data.forEach(location => {
        const marker = L.marker([location.lat, location.lng]);
        const popupContent = `
            <div class="custom-popup-content">
                <img src="${location.image}" alt="${location.title}">
                <div>
                    <h3>${location.title}</h3>
                    <p style="margin: 5px 0;"><b>Type:</b> ${location.category}</p>
                    <p>${location.description}</p>
                </div>
            </div>
        `;

        marker.bindPopup(popupContent, { className: 'custom-popup' });
        marker.addTo(markersLayer);
    });
};

function generateFilterButtons() {
    const container = document.getElementById('filter-buttons');
    const categories = ['All', ...new Set(locations.map(loc => loc.category))];

    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        if (cat === 'All') btn.classList.add('active');
        btn.innerText = cat;

        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (cat === 'All') {
                displayMyMarkers(myLocations);
            } else {
                const filtered = myLocations.filter(item => item.category === cat);
                displayMyMarkers(filtered);
            }
        });

        container.appendChild(btn);
    });
}

function handleSearchResults(results) {
    const list = document.getElementById('results-list');
    list.innerHTML = '';
    searchLayer.clearLayers();
    if (results.length === 0) {
        list.style.display = 'none';
        return;
    }
    list.style.display = 'block';

    results.forEach(place => {
        const li = document.createElement('li');
        let title = place.title;
        let type = place.category;

        if (!title && place.display_name) {
            title = place.display_name.split(',');
            type = place.type;
        }

        li.innerHTML = `
            <h4>${title}</h4>
            <span>${type}</span>
        `;

        li.addEventListener('click', () => {
            const lat = parseFloat(place.lat || place.latitude);
            const lng = parseFloat(place.lng || place.lon || place.longitude);
            map.flyTo([lat, lng], 16);

            const localMatch = locations.find(l => l.title === title);
            if (localMatch && localMatch.marker) {
                localMatch.marker.openPopup();
                bounceMarker(localMatch.marker);
            } else {
                const resultMarker = L.circleMarker([lat, lng], {
                    color: 'red', fillColor: '#f03', fillOpacity: 0.5, radius: 10
                }).addTo(searchLayer);
                resultMarker.bindPopup(`<b>${title}</b>`).openPopup();
            }
            list.style.display = 'none';
        });

        list.appendChild(li);
    });
}

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
let debounceTimer;

async function performSearch() {
    const query = searchInput.value;
    if (query.length < 3) {
        document.getElementById('results-list').style.display = 'none';
        return;
    }
    const localMatches = locations.filter(loc =>
        loc.title.toLowerCase().includes(query.toLowerCase()) || loc.category.toLowerCase().includes(query.toLowerCase())
    );
    const bounds = map.getBounds();
    const viewbox = `${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()},${bounds.getSouth()}`;

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5&viewbox=${viewbox}&bounded=1`;

    try {
        const response = await fetch(url);
        const apiResults = await response.json();

        const combinedResults = [...localMatches, ...apiResults];
        handleSearchResults(combinedResults);

    } catch (error) {
        console.error("Search failed:", error);
        handleSearchResults(localMatches);
    }
}

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(performSearch, 500);
});

function onLocationFound(e) {
    const radius = e.accuracy / 2;

    if (window.userMarker) {
        map.removeLayer(window.userMarker);
        map.removeLayer(window.userCircle);
    }

    const pulseIcon = L.divIcon({
        className: 'pulse-icon',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });

    window.userMarker = L.marker(e.latlng, { icon: pulseIcon }).addTo(map)
        .bindPopup("You are here").openPopup();

    window.userCircle = L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
    console.log("User denied location or error occurred. Defaulting to World View.");
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({ setView: true, maxZoom: 16 });

const locateBtn = document.getElementById('locate-btn');
locateBtn.addEventListener('click', () => {
    map.locate({ setView: true, maxZoom: 16 });
});

displayMarkers(locations);