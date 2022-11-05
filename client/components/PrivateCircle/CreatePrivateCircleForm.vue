<!-- Form for creating Private Circles (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreatePrivateCircleForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/privatecircles',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'name', label: 'Name', value: ''}
      ],
      title: 'Create a Private Circle',
      refreshPrivateCircles: true,
      callback: () => {

        this.$store.commit('alert', {
          message: 'Successfully created a Private Circle!', status: 'success'
        });
      }
    };
  }
};
</script>
