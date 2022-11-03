<!-- Component for displaying user's Anxiety Shield -->

<template>
  <article class="anxietyshield">
    <h3>Your Anxiety Inducing Topics</h3>
    <ul>
      <li v-for="topic in $store.state.shieldedTopics">{{ topic }}</li>
    </ul>
    <h3>Toggle Shielding of a Topic</h3>
    <label for="topic">Topic:</label>
    <form @submit.prevent="submit" v-on:change="editAnxietyShield">
      <select name="topic" id="topic" v-model="toggledTopic">
        <option value="mass_casualty_event">Mass Casualty Event</option>
        <option value="disaster">Disaster</option>
        <option value="sexual_violence">Sexual Violence</option>
        <option value="other_anxiety">Other Anxiety</option>
      </select>
    </form>

  </article>
</template>

<script>
export default {
  name: 'AnxietyShieldComponent',
  async mounted() {
    this.$store.commit('refreshShieldedTopics');
  },
  data() {
    return {
      toggledTopic: ''
    };
  },
  methods: {
    async editAnxietyShield() {
      const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin'
      };
      const fields = {
        topic: this.toggledTopic,
      }
      options.body = JSON.stringify(fields);
      try {
        const r = await fetch(`/api/anxietyshield`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.toggledTopic = '';
        this.$store.commit('refreshShieldedTopics');

      } catch (e) {
        console.log(`Encountered the following error: ${e}`)
      }
    }
  }
};
</script>

<style scoped>
.anxietyshield {
  border: 1px solid #111;
  padding: 20px;
  position: relative;
}
</style>
