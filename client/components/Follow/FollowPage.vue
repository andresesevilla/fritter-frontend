<!-- Display freets on profile -->

<template>
  <div>
    <main v-if="isValidUsername">
      <section>
        <header>
          <h2>
            {{ $route.name }}:&nbsp;
            <router-link :to="{ name: 'Profile', params: { username: $route.params.username } }">
               @{{ $route.params.username }}
            </router-link>
          </h2>
        </header>
        <article v-if="follows.length">
          <router-link v-for="follow in follows" :to="{ name: 'Profile', params: { username: follow } }"> @{{ follow }}
          </router-link>
        </article>
        <article v-else>
          <h3>No {{ $route.name.toLowerCase() }} found.</h3>
        </article>
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
      isValidUsername: true,
      follows: []
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
      const desired = this.$route.name === 'Followers' ? 'follower' : 'followee';
      const url = `/api/follows?${query}Username=${username}`;
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        this.isValidUsername = true;
        this.follows = res.map((value) => { return value[desired] })
      } catch (e) {
        this.isValidUsername = false;
      }
    }
  }
};
</script>