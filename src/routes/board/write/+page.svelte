<script lang="ts">
  import BoardForm from '$lib/components/BoardForm.svelte';
  import type { ActionData } from './$types';
  import { Alert } from 'flowbite-svelte';
  import { goto } from '$app/navigation';

  export let title = '메모 작성';
  export let form: ActionData;
  $: {
    if (form?.success) {
      goto('/board');
    }
  }
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

  <BoardForm boardData={{}} submitName={'작성'} redirectUrl="/board" />
</div>
