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
</script>

<div class="container">
  {#if form?.error}
    <Alert class="mb-3">
      {#each form.errors as error}
        <p>{error.message}</p>
      {/each}
    </Alert>
  {/if}

  <BoardForm boardData={data.BoardFirst} submitName={'수정'} redirectUrl={`/board/${data.slug}`} />
</div>
