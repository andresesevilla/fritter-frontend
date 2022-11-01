<!-- Display freets on profile -->

<template>
  <div>
    <main v-if="isValidUsername">
      <section>
        <header>
          <h2>{{$route.name}}: @{{ $route.params.username }}</h2>
        </header>
        <section>
          <router-link :to="{ name: 'Profile', params: { username: this.$store.state.username } }">Back to Profile
          </router-link>
        </section>
        <!-- <section v-if="$store.state.freets.length">
          <FreetComponent v-for="freet in $store.state.freets" :key="freet.id" :freet="freet" />
        </section>
        <article v-else>
          <h3>No {{$route.name.toLowerCase()}} found.</h3>
        </article> -->
      </section>
    </main>
    <NotFound v-else />
  </div>
</template>

<script>
import NotFound from '../../NotFound.vue';

export default {
  name: 'FollowPage',
  components: { NotFound },
  async mounted() {
    await this.getFollows();
  },
  data() {
    return {
      isValidUsername: true
    };
  },
  watch: {
    async '$route'() {
      await this.getFollows();
    }
  },
  methods: {
    async getFollows() {
      const username = this.$route.params.username;
      const query = this.$route.name === 'Followers' ? 'followee' : 'follower';
      const url = `/api/follows?${query}Username=${username}`;
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        this.isValidUsername = true;
        this.$store.commit('updateFilter', username);
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
