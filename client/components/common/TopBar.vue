<!-- A basic navigation bar component -->
<!-- Example of a component which is included on all pages (via App.vue) -->
<!-- This TopBar takes advantage of both flex and grid layouts for positioning elements; feel free to redesign as you see fit! -->

<template>
  <nav>
    <router-link to="/">
      <div class="left">
        <img src="../../public/logo.svg">
        <h1 class="title">
          Fritter
        </h1>
      </div>
    </router-link>
    <section class="alerts">
      <article v-for="(status, alert, index) in $store.state.alerts" :key="index" :class="status">
        <p>{{ alert }}</p>
      </article>
    </section>
  </nav>
</template>

<style scoped>
nav {
  padding: 1vw 2vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height:65px;
  z-index: 1;
}

.title {
  font-size: 32px;
  margin: 0 5px;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  height: 32px;
}

.left {
  display: flex;
  align-items: center;
}

.right {
  font-size: 20px;
  display: grid;
  gap: 16px;
  grid-auto-flow: column;
  align-items: center;
}

.right a {
  margin-left: 5px;
}

.alerts {
  width: 25%;
}
</style>
