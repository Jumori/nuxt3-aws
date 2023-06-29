export default defineComponent({
  render() {
    return <h1>Users {this.$route.params.action} {this.$route.params.id} page</h1>;
  },
});

