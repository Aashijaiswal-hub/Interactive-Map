🗺️ Interactive City Map
A robust, responsive web application that allows users to explore points of interest on an interactive map. This project features a hybrid search engine (combining local curated data with live OpenStreetMap API results), category filtering, and real-time geolocation.

!(https://img.shields.io/badge/Status-Completed-success)
!(https://img.shields.io/badge/Difficulty-Hard-red)

🌟 Features
Interactive Map Interface: Built with Leaflet.js using high-contrast CartoDB Voyager tiles.

Hybrid Search System:

Local Bias: Instantly finds curated spots (e.g., "Central Park") from a local database.

Global API: Connects to OpenStreetMap Nominatim API to find real-world places (e.g., "Gas Station", "Hotel") restricted to the user's current view.

Dynamic Filtering: Filter buttons (e.g., [Park], [Museum]) are automatically generated based on the data available.

Geolocation: A "Find My Location" feature that uses the browser's GPS to center the map, complete with a custom CSS pulse animation to indicate user position.

Responsive Design: Fully functional on desktop and mobile devices with touch support.

Custom Animations: Markers "bounce" when selected from the search list.

🛠️ Technologies Used
HTML5: Semantic structure and layout.

CSS3: Flexbox for layout, Keyframes for the "pulse" and "bounce" animations.

JavaScript (ES6): Logic for state management, API fetching, and DOM manipulation.

Leaflet.js (v1.9.4): Open-source JavaScript library for interactive maps.

Nominatim API: Free search API provided by OpenStreetMap.

📂 Project Structuretext
/
├── index.html      # Main HTML structure
├── style.css       # Custom styling and animations
├── main.js         # Application logic, data, and API handling
└── README.md       # Project documentation


## 🚀 How to Run Locally

Since this is a static web application, no backend server or build process is required.

1.  **Download or Clone** this repository.
    ```bash
    git clone https://github.com/Aashijaiswal-hub/Interactive-Map
    ```
2.  **Open** the project folder.
3.  **Launch** `index.html` directly in your web browser (Chrome, Firefox, Edge, etc.).

> **Note on Geolocation:** For the "Find My Location" feature to work correctly, your browser may require the site to be served over HTTPS or localhost. If opening the file directly (file://) blocks location access, try using a simple local server extension like "Live Server" in VS Code.

## 📖 Usage Guide

1.  **Start:** When the map loads, allow location access to zoom into your current city. If denied, it defaults to a world view.
2.  **Search:**
    *   Type a category (e.g., "Pizza") or a name (e.g., "Times Square").
    *   Select a result from the dropdown to fly to that location.
3.  **Filter:** Click the category buttons at the top of the sidebar to isolate specific types of locations.
4.  **Interact:** Click any marker to see a popup with an image and description.

## 🌐 Deployment

This project is ready for deployment on static hosting platforms:

*   **GitHub Pages:** Go to Settings -> Pages -> Select 'main' branch -> Save.
*   **Render/Netlify:** Connect your repository and set the publish directory to the root folder.

## 📄 License

This project is open-source and available for educational purposes.

**Attributions:**
*   Map Data ©(https://www.openstreetmap.org/copyright) contributors.
*   Map Tiles ©(https://carto.com/attributions).

## Project By:
Aashi Jaiswal