<script lang="ts">
  import BoardForm from '$lib/components/BoardForm.svelte';
  import type { ActionData } from './$types';
  import { Alert } from 'flowbite-svelte';
  import { goto } from '$app/navigation';

  export let data;
  export let form: ActionData;
  $: {
    if (form?.success) {
      goto(`/board/${data.slug}`);
    }
  }

  export let title = `메모 수정: ${data.slug}번 째 메모`;
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="container mx-auto p-4">
  {#if form?.error}
    <Alert class="mb-3">
      {#each form.errors as error}
        <p>{error.message}</p>
      {/each}
    </Alert>
  {/if}

  <BoardForm boardData={data.BoardFirst} submitName={'수정'} redirectUrl={`/board/${data.slug}`} />
</div>
