<script lang="ts">
  import { Card } from 'flowbite-svelte';
  import { goto } from '$app/navigation';
  import { CirclePlusOutline } from 'flowbite-svelte-icons';
  import SearchForm from '@/lib/components/Search.svelte';

  export let title = '메모 목록';
  export let data;

  $: boardList = data.boardMany ?? [];
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="container">
  <div class="mb-5">
    <SearchForm />
  </div>

  {#if boardList.length > 0}
    <div class="flex flex-col">
      {#each boardList as board}
        <Card href={`/board/${board.idx}`} class="mx-auto mb-5" size="xl" padding="md">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {board.title}
          </h5>
          <p class="font-normal leading-tight text-gray-700 dark:text-gray-400">
            {board.content}
          </p>
        </Card>
      {/each}
    </div>
  {/if}

  <div class="flex justify-end">
    <button
      on:click={() => {
        goto('/board/write');
      }}
    >
      <CirclePlusOutline class="text-green-500" size="xl" />
    </button>
  </div>
</div>
