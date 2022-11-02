<!-- Form for getting freets (all, from user) (inline style) -->
<template>
  <form @submit.prevent="submit" v-on:change="submit">
    <label for="showAllFreets">Show All Freets</label>
    <input v-model="value" type="checkbox" id="showAllFreets">
  </form>
</template>


<script>

export default {
  name: 'GetFreetsForm',
  data() {
    return { value: this.$store.state.showAllFreets };
  },
  mounted() {
    this.submit();
  },
  methods: {
    async submit() {
      this.$store.commit('setShowAllFreets', this.value);
      const url = this.value ? '/api/freets' : '/api/freets?feed';
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        this.$store.commit('updateFilter', null);
        this.$store.commit('updateFreets', res);
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>
