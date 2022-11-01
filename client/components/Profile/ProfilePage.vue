<!-- Profile page: view a user's freets -->

<template>
  <div>
    <p>You are viewing {{$route.params.username}}'s profile</p>
    <p>In the future, this will show their freets</p>
    <p>If the username cannot be found, a 404 error will be shown</p>
  </div>
</template>

<script>

export default {
  name: 'ProfilePage',
  components: { },
  mounted() {
  }
};
</script>

<style scoped>

</style>
