<template>
  <div class="card bg-dark text-light h-100 d-flex flex-column">
    <div
      class="header-box bg-success text-white text-center w-100 py-2 px-3 rounded mb-3"
    >
      <h2 class="h6 m-0">Attendance by Country</h2>
    </div>

    <div id="map" class="map-container flex-grow-1 rounded"></div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { loadCSV } from "../utils/loadCSV";

export default {
  async mounted() {
    const rawData = await loadCSV("/WorldCups.csv");

    const countryNameMap = {
      "Korea/Japan": ["South Korea", "Japan"],
      "Germany FR": "Germany",
      USA: "United States",
      "Soviet Union": "Russia",
      Czechoslovakia: "Czech Republic",
      Yugoslavia: "Serbia",
    };

    const attendanceByCountry = {};

    rawData.forEach((row) => {
      let country = row.Country;
      if (!country || !row.Attendance) return;

      const rawAttendance = row.Attendance.toString();
      const cleanAttendance = rawAttendance.replace(/\./g, "");
      const value = parseInt(cleanAttendance, 10);

      if (!value) return;

      const mapped = countryNameMap[country];

      if (Array.isArray(mapped)) {
        mapped.forEach((mappedCountry) => {
          attendanceByCountry[mappedCountry] =
            (attendanceByCountry[mappedCountry] || 0) +
            Math.round(value / mapped.length);
        });
      } else {
        const finalCountry = mapped || country;
        attendanceByCountry[finalCountry] =
          (attendanceByCountry[finalCountry] || 0) + value;
      }
    });

    const map = L.map("map", { zoomControl: false }).setView([20, 0], 2);
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution: "&copy; OpenStreetMap & CartoDB",
      }
    ).addTo(map);

    const geoData = await fetch(
      "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
    ).then((res) => res.json());

    const getColor = (attendance) => {
      if (!attendance) return "#000";
      if (attendance > 5000000) return "#ffcc00";
      if (attendance > 3000000) return "#ffaa00";
      if (attendance > 1000000) return "#ff8800";
      return "#ff6600";
    };

    const style = (feature) => {
      const name = feature.properties.name;
      const attendance = attendanceByCountry[name];
      return {
        fillColor: getColor(attendance),
        weight: 1,
        color: "#fff",
        fillOpacity: 0.8,
        opacity: 1,
      };
    };

    const onEachFeature = (feature, layer) => {
      const name = feature.properties.name;
      const attendance = attendanceByCountry[name];

      if (attendance && attendance > 0) {
        const display = attendance.toLocaleString();
        layer.bindTooltip(
          `<strong>${name}</strong><br/>Attendance: ${display}`,
          {
            sticky: true,
          }
        );
      }
    };

    L.geoJSON(geoData, {
      style,
      onEachFeature,
    }).addTo(map);
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
