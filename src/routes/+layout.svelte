<script>
  import '@/globals.scss';
  import Header from '$lib/components/Header.svelte';
</script>

<Header />
<main class="container mx-auto my-10">
  <slot />
</main>
