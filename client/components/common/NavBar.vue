<template>
  <nav>
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
  height: 100%;
  width: 160px;
  position: fixed;
  top: 65px;
  z-index: 1;
  background-color: rgb(196, 196, 196);
  overflow-x: hidden;
}

nav a {
  display: block;
}

</style>
