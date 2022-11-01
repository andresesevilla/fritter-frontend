<!-- Display freets on profile -->

<template>
  <div>
    <main v-if="isValidUsername">
      <section>
        <header>
          <h2>Profile: @{{ $route.params.username }}</h2>
        </header>
        <!-- <section v-if="$store.state.freets.length">
        <FreetComponent v-for="freet in $store.state.freets" :key="freet.id" :freet="freet" />
      </section>
      <article v-else>
        <h3>No freets found.</h3>
      </article> -->
      </section>
    </main>
    <NotFound v-else />
  </div>
</template>

<script>
import NotFound from '../../NotFound.vue';

export default {
  name: 'ProfileFreets',
  // components: { FreetComponent },
  components: { NotFound },
  // async mounted() {
  //   await this.getFreets();
  // },
  data() {
    return {
      isValidUsername: true
    };
  },
  // methods: {
  //   async getFreets() {
  //     const value = this.$route.params.username
  //     const url = `/api/freets?author=${value}`;
  //     try {
  //       const r = await fetch(url);
  //       const res = await r.json();
  //       if (!r.ok) {
  //         throw new Error(res.error);
  //       }
  //       this.$store.commit('updateFilter', value);
  //       this.$store.commit('updateFreets', res);
  //     } catch (e) {
  //       if (value === this.$store.state.filter) {
  //         this.$store.commit('updateFilter', null);
  //         this.$store.commit('refreshFreets');
  //       } else {
  //         this.isValidUsername = false;
  //       }
  //       this.$set(this.alerts, e, 'error');
  //       setTimeout(() => this.$delete(this.alerts, e), 3000);
  //     }
  //   }
  // }
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

header,
header>* {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  margin-right: 10px;
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}
</style>
