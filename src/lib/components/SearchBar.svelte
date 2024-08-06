<script lang="ts">
  import { page } from '$app/stores';
  import { Search } from 'flowbite-svelte';

  $: query = $page.url.searchParams.get('q') ?? '';
</script>

<form method="GET">
  <Search name="q" placeholder="검색어를 입력하세요." value={query} />
</form>
