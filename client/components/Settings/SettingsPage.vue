<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>Settings</h2>
      </header>
      <ChangePasswordForm />
    </section>
  </main>
</template>

<script>
import ChangePasswordForm from '@/components/Settings/ChangePasswordForm.vue';

export default {
  name: 'AccountPage',
  components: {
    ChangePasswordForm
  }
};
</script>
