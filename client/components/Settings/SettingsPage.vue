<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>Account Management</h2>
      </header>
      <ChangePasswordForm />
    </section>
    <section>
      <header>
        <h2>Private Circles</h2>
        <CreatePrivateCircleForm />
      </header>
    </section>
    <section>
      <header>
        <h2>Follows</h2>
        <CreateFollowForm />
      </header>
    </section>
  </main>
</template>

<script>
import ChangePasswordForm from '@/components/Settings/ChangePasswordForm.vue';
import CreatePrivateCircleForm from '@/components/PrivateCircle/CreatePrivateCircleForm.vue';
import CreateFollowForm from '@/components/Follow/CreateFollowForm.vue';

export default {
  name: 'AccountPage',
  components: {
    ChangePasswordForm,
    CreatePrivateCircleForm,
    CreateFollowForm
  }
};
</script>
