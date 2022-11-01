<!-- Profile page: view a user's freets -->

<template>
  <div>
    <ProfileFreetsComponent />
    <!-- <p>You are viewing {{$route.params.username}}'s profile</p>
    <p>In the future, this will show their freets</p>
    <p>If the username cannot be found, a 404 error will be shown</p> -->
  </div>
</template>

<script>
import ProfileFreetsComponent from '@/components/Profile/ProfileFreetsComponent.vue';

export default {
  name: 'ProfilePage',
  components: { ProfileFreetsComponent },
  mounted() {
  }
};
</script>