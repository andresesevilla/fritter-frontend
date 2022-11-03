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
    <section>
      <header>
        <h2>Anxiety Shield</h2>
      </header>
      <AnxietyShieldComponent />
    </section>
  </main>
</template>

<script>
import ChangePasswordForm from '@/components/Settings/ChangePasswordForm.vue';
import AnxietyShieldComponent from '@/components/AnxietyShield/AnixetyShieldComponent.vue'

export default {
  name: 'AccountPage',
  components: {
    ChangePasswordForm, AnxietyShieldComponent
  }
};
</script>
