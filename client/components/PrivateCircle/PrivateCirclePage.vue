<!-- Private Circle main page (create, view, edit) -->

<template>
  <main>
    <h2>Private Circles</h2>
    <CreatePrivateCircleForm />
  </main>

</template>

<script>
import CreatePrivateCircleForm from '@/components/PrivateCircle/CreatePrivateCircleForm.vue';

export default {
  name: 'PrivateCirclePage',
  components: { CreatePrivateCircleForm },
  mounted() {
  }
};
</script>