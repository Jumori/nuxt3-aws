export default defineComponent(() => {
  const runtimeConfig = useRuntimeConfig();

  return () => (
    <div>
      <h1>Index page</h1>
      <p>Env: {runtimeConfig.public.API_ENV}</p>
    </div>
  );
});
