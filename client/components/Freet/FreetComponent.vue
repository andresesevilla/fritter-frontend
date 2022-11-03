<!-- Reusable component representing a single freet and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
  <article class="freet">
    <div v-if="!freet.topics.some((e) => { return $store.state.shieldedTopics.includes(e) }) || viewAnyway">
      <header>
        <h3 class="author">
          <router-link :to="{ name: 'Profile', params: { username: freet.author } }">
            @{{ freet.author }}
          </router-link>
        </h3>
      </header>
      <p class="content">
        {{ freet.content }}
      </p>
      <p class="info">
        Posted at {{ freet.dateCreated }}
      </p>
      <p v-if="freet.restrictAccess">Private Circle: {{ freet.restrictAccess }}</p>
      <div v-if="$store.state.username === freet.author" class="actions">
        <button @click="deleteFreet">
          🗑️ Delete
        </button>
      </div>
      <section class="alerts">
        <article v-for="(status, alert, index) in alerts" :key="index" :class="status">
          <p>{{ alert }}</p>
        </article>
      </section>
    </div>
    <div v-else>
      <h3>
        Anxiety Shield
      </h3>
      <p>This Freet contains the following topic(s): {{ freet.topics.join(" ") }}</p>
      <button @click="()=>{viewAnyway = true}">View Anyway</button>
    </div>
  </article>
</template>

<script>
export default {
  name: 'FreetComponent',
  props: {
    // Data from the stored freet
    freet: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      alerts: {}, // Displays success/error messages encountered during freet modification
      viewAnyway: false
    };
  },
  watch: {
    freet() {
      this.viewAnyway = false;
    }
  },
  methods: {
    deleteFreet() {
      /**
       * Deletes this freet.
       */
      const params = {
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully deleted freet!', status: 'success'
          });
        }
      };
      this.request(params);
    },
    async request(params) {
      /**
       * Submits a request to the freet's endpoint
       * @param params - Options for the request
       * @param params.body - Body for the request, if it exists
       * @param params.callback - Function to run if the the request succeeds
       */
      const options = {
        method: params.method, headers: { 'Content-Type': 'application/json' }
      };
      if (params.body) {
        options.body = params.body;
      }

      try {
        const r = await fetch(`/api/freets/${this.freet._id}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.$store.commit('refreshFreets');

        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>

<style scoped>
.freet {
  border: 1px solid #111;
  padding: 20px;
  position: relative;
}
</style>
