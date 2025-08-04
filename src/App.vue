<template>
  <div
    class="app d-flex flex-column text-light"
    style="background-color: #1a1a1a"
  >
    <!-- Header -->
    <header
      class="bg-black py-3 shadow-sm d-flex justify-content-center align-items-center position-relative"
    >
      <img
        src="./assets/wc_logo.png"
        alt="WVC Logo"
        class="header-logo position-absolute start-0 ms-4"
      />

      <h1 class="h4 fw-bold text-info text-center m-0">
        Football World Cup Dashboard
      </h1>

      <img
        src="./assets/wc_logo.png"
        alt="WVC Logo"
        class="header-logo position-absolute end-0 me-4"
      />
    </header>

    <!-- Dashboard -->
    <main class="dashboard-grid flex-grow-1 px-2 py-2">
      <div class="card-wrapper shadow-lg"><AttendanceMap /></div>
      <div class="card-wrapper shadow-lg"><TrophyTimeline /></div>
      <div class="card-wrapper shadow-lg"><CompetitionStats /></div>
      <div class="card-wrapper shadow-lg"><QualifiedCountries /></div>
      <div class="card-wrapper shadow-lg"><WorldCupWinners /></div>
      <div class="card-wrapper shadow-lg"><HostCountries /></div>
    </main>
  </div>
</template>

<script>
import AttendanceMap from "./components/AttendanceMap.vue";
import TrophyTimeline from "./components/TrophyTimeline.vue";
import CompetitionStats from "./components/CompetitionStats.vue";
import QualifiedCountries from "./components/QualifiedCountries.vue";
import WorldCupWinners from "./components/WorldCupWinners.vue";
import HostCountries from "./components/HostCountries.vue";

export default {
  components: {
    AttendanceMap,
    TrophyTimeline,
    CompetitionStats,
    QualifiedCountries,
    WorldCupWinners,
    HostCountries,
  },
};
</script>

<style scoped>
.app {
  height: 100vh;
  overflow: hidden;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  gap: 1rem;
  flex-grow: 1;
  overflow: hidden;
  height: calc(100vh - 72px); /* subtracting header height */
}

/* Optional: you can still control padding or spacing here if needed */
.card-wrapper {
  background-color: #978d8d;
  border-radius: 0.375rem;
  box-shadow: 0 8px 20px rgba(153, 143, 143, 0.6); /* stronger shadow */
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  overflow: auto;
  min-height: 0;
}
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  gap: 0.5rem;
  flex-grow: 1;
  overflow: hidden;
  height: calc(100vh - 72px);
  background-color: #807676; /* ← change this to any color you want */
  padding: 1rem; /* optional, for spacing around the grid */
}
.header-logo {
  width: 40px;
  height: auto;
}

/* Responsive adjustments */
@media (max-width: 991.98px) {
  .app {
    height: auto;
    overflow: auto;
  }
  .header-logo {
    width: 25px;
  }

  .dashboard-grid {
    display: grid;
    grid-template-columns: 1fr; /* change this to 1 column */
    grid-auto-rows: auto; /* let rows size automatically */
    gap: 0.5rem;
    flex-grow: 1;
    overflow: hidden;
    height: auto; /* change height to auto for scrolling */
    background-color: #867979;
    padding: 1rem;
  }

  .card-wrapper {
    min-height: 300px;
  }
}
</style>
