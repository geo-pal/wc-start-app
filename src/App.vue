<template>
  <div class="app d-flex flex-column text-light bg-dark">
    <!-- Header -->
    <header
      class="app-header bg-black py-3 shadow-sm d-flex justify-content-center align-items-center position-relative"
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

    <!-- Main Dashboard -->
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
  name: "App",
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

.app-header {
  min-height: 72px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  gap: 1rem;
  height: calc(100vh - 72px);
  padding: 1rem;
  background-color: #757070;
}

.card-wrapper {
  background-color: #746e6e;
  border-radius: 0.5rem;
  padding: 0.75rem;
  overflow: auto;
}

/* Logos */
.header-logo {
  width: 40px;
  height: auto;
}

/* Responsive Design */
@media (max-width: 991.98px) {
  .app {
    height: auto;
    overflow: auto;
  }

  .header-logo {
    width: 25px;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    height: auto;
    gap: 0.75rem;
  }

  .card-wrapper {
    min-height: 300px;
  }
}
</style>
