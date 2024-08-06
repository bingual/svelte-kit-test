<script lang="ts">
  import { Card } from 'flowbite-svelte';
  import { goto } from '$app/navigation';
  import { CirclePlusOutline } from 'flowbite-svelte-icons';
  import SearchBar from '$lib/components/SearchBar.svelte';

  export let title = '메모 목록';
  export let data;

  $: boardList = data.boardMany ?? [];
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="container mx-auto p-4">
  <div class="mb-5">
    <SearchBar />
  </div>

  {#if boardList.length > 0}
    <div class="grid grid-cols-4 gap-4">
      {#each boardList as board}
        <Card img={board?.photo ? `/${board?.photo}` : ''} href={`/board/${board.idx}`} size="sm">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {board?.title}
          </h5>
          <p class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
            {board?.content}
          </p>
        </Card>
      {/each}
    </div>
  {/if}

  <div class="fixed bottom-10 right-20">
    <button
      on:click={() => {
        goto('/board/write');
      }}
    >
      <CirclePlusOutline class="h-14 w-14 text-green-500" />
    </button>
  </div>
</div>
