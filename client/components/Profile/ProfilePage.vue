<!-- Display freets on profile -->

<template>
  <div>
    <main v-if="isValidUsername">
      <section>
        <header>
          <h2>Profile: @{{ $route.params.username }}</h2>
        </header>
        <section>
          <router-link :to="{ name: 'Following', params: { username: $route.params.username } }">View Following
          </router-link>
          <router-link :to="{ name: 'Followers', params: { username: $route.params.username } }">View Followers
          </router-link>
        </section>
        <section v-if="$store.state.freets.length">
          <FreetComponent v-for="freet in $store.state.freets" :key="freet.id" :freet="freet" />
        </section>
        <article v-else>
          <h3>No freets found.</h3>
        </article>
      </section>
    </main>
    <NotFound v-else />
  </div>
</template>

<script>
import NotFound from '../../NotFound.vue';
import FreetComponent from '@/components/Freet/FreetComponent.vue';

export default {
  name: 'ProfilePage',
  components: { NotFound, FreetComponent },
  async mounted() {
    await this.getFreets();
  },
  data() {
    return {
      isValidUsername: true
    };
  },
  watch: {
    async '$route'() {
      await this.getFreets();
    }
  },
  methods: {
    async getFreets() {
      const value = this.$route.params.username
      const url = `/api/freets?author=${value}`;
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        this.isValidUsername = true;
        this.$store.commit('updateFilter', value);
        this.$store.commit('updateFreets', res);
      } catch (e) {
        this.isValidUsername = false;
      }
    }
  }
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
