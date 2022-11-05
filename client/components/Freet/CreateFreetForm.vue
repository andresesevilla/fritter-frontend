<!-- Form for creating freets (based on BlockForm) -->

<template>
  <form @submit.prevent="submit">
    <section>
      <div>
        <textarea name="content" v-model="content" id="content" placeholder="What's happening?"></textarea>
      </div>
      <div>
        <label for="privatecircle">Private Circle (Optional):</label>
        <select v-if="$store.state.privatecircles.length" name="privatecircle" v-model="privatecircle" id="privatecircle">
          <option v-for="privatecircle in $store.state.privatecircles">{{privatecircle.name}}</option>
        </select>
        <input v-else placeholder="You do not have any Private Circles" readonly/>
      </div>
    </section>
    <button type="submit">
      Create a freet
    </button>
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

        this.$store.commit('alert', {
          message: 'Successfully created a freet!', status: 'success'
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