<!-- Reusable component representing a single freet and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
  <article class="privatecircle">
    <h3>{{ privatecircle.name }}</h3>
    <section>
      <router-link v-for="member in privatecircle.members" :to="{ name: 'Profile', params: { username: member } }"> @{{
          member
      }}</router-link>
    </section>
    <button @click="deletePrivateCircle">
        🗑️ Delete
      </button>
  </article>
</template>

<script>
export default {
  name: 'PrivateCircleComponent',
  props: {
    // Data from the stored private circle
    privatecircle: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    };
  },
  methods: {
    async deletePrivateCircle() {
      const options = {
        method: 'DELETE', headers: { 'Content-Type': 'application/json' }
      };
      try {
        const r = await fetch(`/api/privatecircles/${this.privatecircle.name}`, options);
        if (!r.ok) {
          const res = await r.json();
          console.log(`The following error occurred when trying to delete the private circle: ${res.error}`)
        }
        this.$store.commit('refreshPrivateCircles');
      } catch (e) {
        console.log(`The following error occurred when trying to delete the private circle: ${e}`)
      }
    },
  }
};
</script>

<style scoped>
.privatecircle {
  border: 1px solid #111;
  padding: 20px;
  position: relative;
}
</style>
