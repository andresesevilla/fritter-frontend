<!-- Form for creating Follows (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateFollowForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/follows',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'username', label: 'Username'}
      ],
      title: 'Follow a user',
      callback: () => {
        const message = 'Successfully followed user!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
