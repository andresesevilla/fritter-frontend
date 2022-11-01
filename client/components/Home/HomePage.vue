<!-- Default page: login and feed -->

<template>
  <div>
    <FreetsPage v-if="$store.state.username" />
    <LoginPage v-else />
  </div>
</template>

<script>
import LoginPage from '@/components/Login/LoginPage.vue';
import FreetsPage from '@/components/Freet/FreetsPage.vue';

export default {
  name: 'HomePage',
  components: { LoginPage, FreetsPage },
  mounted() {
  }
};
</script>

<style scoped>

</style>
