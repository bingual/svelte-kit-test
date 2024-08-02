<script lang="ts">
  import type { ActionData } from './$types';
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { Card } from 'flowbite-svelte';
  import { EditOutline, TrashBinOutline } from 'flowbite-svelte-icons';

  export let data;
  export let form: ActionData;
  $: {
    if (form?.success) {
      goto('/board');
    }
  }

  const boardDetail = data?.boardFirst;

  const handleDelete = (event: Event) => {
    if (!confirm('정말로 이 글을 삭제하시겠습니까?')) {
      event.preventDefault();
    }
  };
</script>

<div class="container">
  <Card size="xl" padding="md">
    <article>
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {boardDetail?.title}
      </h5>
      <p class="font-normal leading-tight text-gray-700 dark:text-gray-400">
        {boardDetail?.content}
      </p>
    </article>

    <article>
      <div class="flex justify-end">
        <form use:enhance action={`?/delete`} method="POST" on:submit={handleDelete}>
          <button class="me-1 cursor-pointer" type="submit">
            <TrashBinOutline size="xl" />
          </button>
        </form>

        <button
          class="cursor-pointer"
          on:click={() => {
            goto(`/board/${data.slug}/edit`);
          }}
        >
          <EditOutline size="xl" />
        </button>
      </div>
    </article>
  </Card>
</div>
