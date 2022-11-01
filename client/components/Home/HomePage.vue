<!-- Default page: login and feed -->

<template>
  <div>
    <FreetsComponent v-if="$store.state.username" />
    <LoginComponent v-else />
  </div>
</template>

<script>
import LoginComponent from '@/components/Login/LoginComponent.vue';
import FreetsComponent from '@/components/Freet/FreetsComponent.vue';

export default {
  name: 'HomePage',
  components: { LoginComponent, FreetsComponent },
  mounted() {
  }
};
</script>

<style scoped>

</style>
