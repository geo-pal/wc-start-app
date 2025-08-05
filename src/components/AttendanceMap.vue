<template>
  <div class="card bg-dark text-light h-100 d-flex flex-column">
    <!-- Title Header -->
    <div
      class="header-box bg-success text-white text-center py-2 px-3 rounded mb-3"
    >
      <h2 class="h6 m-0">Attendance by Country</h2>
    </div>

    <!-- Map Container -->
    <div id="map" class="map-container flex-grow-1 rounded"></div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { loadCSV } from "../utils/loadCSV";

export default {
  name: "AttendanceMap",

  async mounted() {
    try {
      // Load CSV data using Papaparse
      const rawData = await loadCSV("/WorldCups.csv");

      // Aggregate attendance per country
      const attendanceData = this.processAttendanceData(rawData);

      // Initialize Leaflet map with dark tiles
      const map = L.map("map", { zoomControl: false }).setView([20, 0], 2);
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        { attribution: "&copy; OpenStreetMap & CartoDB" }
      ).addTo(map);

      // Load GeoJSON world boundaries
      const geoData = await fetch(
        "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
      ).then((res) => res.json());

      // Add colored country layers to map
      L.geoJSON(geoData, {
        style: (feature) => this.getCountryStyle(feature, attendanceData),
        onEachFeature: (feature, layer) =>
          this.addTooltip(feature, layer, attendanceData),
      }).addTo(map);
    } catch (error) {
      console.error("Failed to load attendance map:", error);
    }
  },

  methods: {
    /**
     * Cleans and aggregates attendance by country.
     * Handles special cases (e.g. split countries) using nameMap.
     */
    processAttendanceData(rawData) {
      const nameMap = {
        "Korea/Japan": ["South Korea", "Japan"],
        "Germany FR": "Germany",
        USA: "United States",
        "Soviet Union": "Russia",
        Czechoslovakia: "Czech Republic",
        Yugoslavia: "Serbia",
      };

      const attendance = {};

      rawData.forEach(({ Country, Attendance }) => {
        if (!Country || !Attendance) return;

        const clean = parseInt(Attendance.toString().replace(/\./g, ""), 10);
        if (!clean) return;

        const mapped = nameMap[Country];

        if (Array.isArray(mapped)) {
          // Split attendance evenly among mapped countries
          mapped.forEach((name) => {
            attendance[name] =
              (attendance[name] || 0) + Math.round(clean / mapped.length);
          });
        } else {
          const name = mapped || Country;
          attendance[name] = (attendance[name] || 0) + clean;
        }
      });

      return attendance;
    },

    /**
     * Returns a dynamic style object for each country based on its total attendance.
     * Higher attendance results in brighter fill color.
     */
    getCountryStyle(feature, attendanceData) {
      const name = feature.properties.name;
      const attendance = attendanceData[name];

      const color = !attendance
        ? "#000" // No data
        : attendance > 5_000_000
        ? "#ffcc00"
        : attendance > 3_000_000
        ? "#ffaa00"
        : attendance > 1_000_000
        ? "#ff8800"
        : "#ff6600";

      return {
        fillColor: color,
        weight: 1,
        color: "#fff",
        fillOpacity: 0.8,
        opacity: 1,
      };
    },

    /**
     * Binds a tooltip showing attendance data to each country layer.
     */
    addTooltip(feature, layer, attendanceData) {
      const name = feature.properties.name;
      const attendance = attendanceData[name];

      if (attendance) {
        layer.bindTooltip(
          `<strong>${name}</strong><br/>Attendance: ${attendance.toLocaleString()}`,
          { sticky: true }
        );
      }
    },
  },
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  min-height: 300px;
  border-radius: 0.375rem;
  overflow: hidden;
}
</style>
