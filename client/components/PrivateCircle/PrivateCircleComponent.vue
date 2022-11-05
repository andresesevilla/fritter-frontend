<!-- Reusable component representing a single freet and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
  <article class="privatecircle">
    <h3>{{ privatecircle.name }}</h3>
    <section>
      <router-link v-for="member in privatecircle.members" :to="{ name: 'Profile', params: { username: member.username } }">
        @{{ member.username }}</router-link>
    </section>
    <form @submit.prevent="submit" v-on:change="editPrivateCircle">
      <div v-if="$store.state.privatecircles.length">
        <label for="username">Toggle a user's membership:</label>
        <select name="username" v-model="username" id="username">
          <option v-for="username in followers">{{ username }}</option>
        </select>
      </div>
      <div v-else>(You do not have any Private Circles, so options are hidden)</div>
    </form>
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
      required: true,
    },
    followers: {
      type: Array,
      required: true
    }
  },
  async mounted() {
  },
  data() {
    return {
      username: '',
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
          this.$store.commit('alert', {
          message: e, status: 'error'
        });
        }
        this.$store.commit('refreshPrivateCircles');
        this.$store.commit('alert', {
            message: `Successfully deleted Private Circle!`, status: 'success'
          });
      } catch (e) {
        this.$store.commit('alert', {
          message: e, status: 'error'
        });
      }
    },
    async editPrivateCircle() {
      const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin'
      };
      const fields = {
        username: this.username,
      }
      options.body = JSON.stringify(fields);
      try {
        const r = await fetch(`/api/privatecircles/${this.privatecircle.name}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.$store.commit('refreshPrivateCircles');
        this.username = '';
        this.$store.commit('alert', {
            message: `Successfully edited Private Circle!`, status: 'success'
          });

      } catch (e) {
        this.$store.commit('alert', {
          message: e, status: 'error'
        });
      }
    }
  }
};
</script>