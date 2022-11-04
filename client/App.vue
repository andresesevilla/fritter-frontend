<template>
  <div id="app">
    <TopBar />
    <router-view/>
  </div>
</template>

<script>
import TopBar from '@/components/common/TopBar.vue';

export default {
  name: 'App',
  components: { TopBar },
  beforeCreate() {
    // Sync stored username to current session
    fetch('/api/users/session', {
      credentials: 'same-origin' // Sends express-session credentials with request
    }).then(res => res.json()).then(res => {
      const user = res.user;
      this.$store.commit('setUsername', user ? user.username : null);
    });

    // Clear alerts on page refresh
    this.$store.state.alerts = {};
  }
};
</script>

<style>
:root {
  --background-color: #ffffff;
  --accent-color: #4257b2;
  --secondar-accent-color: #3ccfcf;
  --text-color: #455358;

  --content-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  --primary-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}

* {
  box-sizing: border-box;
}

article,
form {
  background-color: var(--background-color);
  padding: 20px;
  position: relative;
  box-shadow: var(--content-shadow);
  margin: 20px 0 20px;
}

nav {
  box-shadow: var(--primary-shadow);
  background-color: var(--accent-color);
  color: var(--background-color);
  font-size: 16px;
}

body {
  background-color: var(--background-color);
  height: 100vh;
  flex-direction: column;
  display: flex;
  padding: 0;
  margin: 0;

  font-size: 1.2em;
  font-family: Inter;
  color: var(--text-color);
}

main {
  max-width: 1000px;
  padding: 0 5em 5em;
  margin: 100px auto !important; 
}

.alerts {
  position: absolute;
  z-index: 99;
  bottom: 0;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 10%);
  width: 100%;
  text-align: center;
}

.alerts article {
  border-radius: 5px;
  padding: 10px 20px;
  color: #fff;
}

.alerts p {
  margin: 0;
}

.alerts .error {
  background-color: rgb(166, 23, 33);
}

.alerts .success {
  background-color: rgb(45, 135, 87);
}
</style>
