<!-- A basic navigation bar component -->
<!-- Example of a component which is included on all pages (via App.vue) -->

<template>
  <nav>
    <div class="left">
      <router-link to="/">
        <header>
          <img src="../../public/logo-white.svg">
          <h1 class="title">
            Fritter
          </h1>
        </header>
      </router-link>
      <form @submit.prevent="search" v-if="$store.state.username">
        <input type="text" placeholder="Search for a user..." v-model="usernameToSearch">
        <button type="submit"><span class="material-symbols-outlined">search</span></button>
      </form>
    </div>
    <div v-if="$store.state.username" class="right">
      <router-link to="/" class="nav">
        Home<span class="material-symbols-outlined">Home</span>
      </router-link>
      <router-link :to="{ name: 'Profile', params: { username: this.$store.state.username } }" class="nav">
        Profile<span class="material-symbols-outlined">Person</span>
      </router-link>
      <router-link to="/privatecircles" class="nav">
        Private Circles<span class="material-symbols-outlined">Workspaces</span>
      </router-link>
      <router-link to="/settings" class="nav">
        Settings<span class="material-symbols-outlined">Settings</span>
      </router-link>
      <a href="#" v-on:click="signOut" class="nav">
        Sign Out<span class="material-symbols-outlined">Logout</span>
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
  data() {
    return {
      usernameToSearch: ''
    }
  },
  methods: {
    search() {
      let username = this.usernameToSearch;
      if (username.length > 0) {
        if (username.startsWith('@')) {
          username = username.slice(1);
        }
        this.$router.push({ name: 'Profile', params: { username: username } });
        this.usernameToSearch = '';
      }
    },
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

      // Avoid persisting state across sessions
      this.$store.state.showAllFreets = false;
      this.$store.state.filter = null;
      this.$store.state.freets = [];
      this.$store.state.shieldedTopics = [];
      this.$store.state.alerts = [];
      this.$store.state.username = null;
      this.$store.state.privateCircles = [];

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
button {
  padding: 5px 25px;
  height:100%;
}

form {
  background-color: inherit;
  position: inherit;
  box-shadow: inherit;
  margin: 0;
  border-radius: inherit;
  padding: 0;

  display: grid;
  grid-auto-flow: column;
  align-items: center;

  box-shadow: var(--primary-shadow);
  margin-left: 20px;
}

input {
  padding: 15px;
  height: 45px;
  width: 250px;
}

nav {
  padding: 0 2vw;
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  z-index: 1;
  min-height: 79px;
}

.title {
  font-size: 32px;
  margin: 0 5px;
  box-shadow: none;
}

a {
  color: inherit;
  text-decoration: none;
  position: relative;

  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-gap: 5px;
  height: 100%;
}

.nav {
  padding: 20px 15px;
  transition-duration: 0.2s;
}

.nav:hover {
  box-shadow: var(--primary-shadow);
}

img {
  height: 32px;
  margin-left: 5px;
}

.left {
  display: grid;
  gap: 25px;
  grid-auto-flow: column;
  align-items: center;
}

header {
  display: flex;
  align-items: center;
}

.right {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
}

.alerts {
  width: 35%;
}
</style>
