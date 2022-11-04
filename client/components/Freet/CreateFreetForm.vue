<!-- Form for creating freets (based on BlockForm) -->

<template>
  <form @submit.prevent="submit">
    <h3>Create a freet</h3>
    <section>
      <div>
        <label for="content">Content:</label>
        <textarea name="content" v-model="content" id="content"></textarea>
      </div>
      <div>
        <label for="privatecircle">Private Circle (Optional):</label>
        <select v-if="$store.state.privatecircles.length" name="privatecircle" v-model="privatecircle" id="privatecircle">
          <option v-for="privatecircle in $store.state.privatecircles">{{privatecircle.name}}</option>
        </select>
        <input v-else value="(You do not have any Private Circles)" readonly/>
      </div>
    </section>
    <button type="submit">
      Create a freet
    </button>
    <section class="alerts">
      <article v-for="(status, alert, index) in alerts" :key="index" :class="status">
        <p>{{ alert }}</p>
      </article>
    </section>
  </form>
</template>

<script>

export default {
  name: 'BlockForm',
  async mounted() {
    await this.$store.commit('refreshPrivateCircles');
  },
  data() {
    return {
      content: '',
      privatecircle: '',
      alerts: {},
    };
  },
  methods: {
    async submit() {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin'
      };
      const fields = {
        content: this.content,
        private_circle: this.privatecircle
      }
      options.body = JSON.stringify(fields);

      try {
        const r = await fetch('/api/freets', options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.$store.commit('refreshFreets');

        this.content = '';
        this.privatecircle = '';

        const message = 'Successfully created a freet!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);

      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

section>div {
  display: flex;
  flex-direction: column;
}

form>section p {
  margin: 0;
}

form h3,
form>* {
  margin: 0.3em 0;
}

form h3 {
  margin-top: 0;
}
</style>