<!-- A basic navigation bar component -->
<!-- Example of a component which is included on all pages (via App.vue) -->

<template>
  <nav>
    <router-link to="/">
      <div class="left">
        <img src="../../public/logo-white.svg">
        <h1 class="title">
          Fritter
        </h1>
      </div>
    </router-link>
    <div v-if="$store.state.username" class="right">
      <router-link to="/">
        Home
      </router-link>
      <router-link :to="{ name: 'Profile', params: { username: this.$store.state.username } }">
        Profile
      </router-link>
      <router-link to="/privatecircles">
        Private Circles
      </router-link>
      <router-link to="/settings">
        Settings
      </router-link>
      <a href="#" v-on:click="signOut">
        Sign Out
      </a>
    </div>
    <section class="alerts">
      <article v-for="(status, alert, index) in $store.state.alerts" :key="index" :class="status">
        <p>{{ alert }}</p>
      </article>
    </section>
  </nav>
</template>


<script>
export default {
  methods: {
    async signOut() {
      // Make the request with the URL and options
      const r = await fetch(
        '/api/users/session',
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'same-origin' // Sends express-session credentials with request
        }
      );
      // Update the username to be empty
      this.$store.commit('setUsername', null);
      // Navigate home if user is not already home
      if (this.$router.currentRoute.name !== 'Home') {
        this.$router.push({ name: 'Home' });
      }
      // Alert user that they have signed out
      this.$store.commit('alert', {
        message: 'You are now signed out!', status: 'success'
      })
    }
  }
};
</script>

<style scoped>
nav {
  padding: 1vw 2vw;
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
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
