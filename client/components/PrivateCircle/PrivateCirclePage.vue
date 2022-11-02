<!-- Private Circle main page (create, view, edit) -->

<template>
  <main>
    <h2>Private Circles</h2>
    <CreatePrivateCircleForm />
    <section v-if="$store.state.privatecircles.length">
      <PrivateCircleComponent v-for="privatecircle in $store.state.privatecircles" :key="privatecircle.id" :privatecircle="privatecircle" />
    </section>
  </main>

</template>

<script>
import CreatePrivateCircleForm from '@/components/PrivateCircle/CreatePrivateCircleForm.vue';
import PrivateCircleComponent from '@/components/PrivateCircle/PrivateCircleComponent.vue';

export default {
  name: 'PrivateCirclePage',
  components: { CreatePrivateCircleForm, PrivateCircleComponent },
  async mounted() {
    this.$store.commit('refreshPrivateCircles');
  }
};
</script>