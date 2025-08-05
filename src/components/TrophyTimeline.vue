<template>
  <!-- Main card container with dark theme and vertical layout -->
  <div class="card bg-dark text-light h-100 d-flex flex-column">
    <!-- Header section with green background and white text -->
    <div
      class="header-box bg-success text-white text-center w-100 py-2 px-3 rounded mb-3"
    >
      <!-- Title for the timeline section -->
      <h2 class="h6 m-0">Tournament Timeline</h2>
    </div>

    <!-- World Cup logo centered below the header -->
    <img
      src="../assets/wc_logo.png"
      class="icon mb-3 mx-auto"
      alt="World Cup Logo"
    />

    <!-- Display of tournament date range -->
    <p class="logo-date text-white fw-semibold text-center">1934 – 2014</p>
  </div>
</template>

<script>
export default {
  name: "TrophyTimeline",
};
</script>

<style scoped>
/* Logo styling: responsive width with max limit */
.icon {
  width: 60%;
  max-width: 270px;
  height: auto;
}

/* Year range text styling */
.logo-date {
  font-size: 1rem;
  margin-bottom: 0;
}
</style>
