<script lang="ts">
  import type { ActionData } from './$types';
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { Card } from 'flowbite-svelte';
  import { EditOutline, TrashBinOutline } from 'flowbite-svelte-icons';
  import moment from 'moment-timezone';

  export let data;
  export let form: ActionData;
  $: {
    if (form?.success) {
      goto('/board');
    }
  }

  const board = data?.boardFirst;
  export let title = board?.title;
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="container mx-auto flex justify-center p-4">
  <Card img={board?.photo ? `/${board?.photo}` : ''} size="lg">
    <div>
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {board?.title}
      </h5>
      <p class="font-normal leading-tight text-gray-700 dark:text-gray-400">
        {board?.content}
      </p>
    </div>

    <div class="container flex items-center justify-between">
      <div>
        <span>작성일:</span>
        <span>{moment(board?.created_at).tz('Asia/Seoul').format('YYYY/MM/DD HH:mm')}</span>
      </div>

      <div class="flex">
        <form
          use:enhance
          action="?/delete"
          use:enhance={({ formData, cancel }) => {
            if (!confirm('메모를 정말로 삭제하시겠습니까?')) {
              cancel();
            } else {
              formData.append('idx', String(board?.idx));
            }
          }}
          method="POST"
        >
          <button class="me-2 cursor-pointer" type="submit">
            <TrashBinOutline class="text" size="xl" />
          </button>
        </form>

        <button
          class="cursor-pointer text-orange-500"
          on:click={() => {
            goto(`/board/${data.slug}/edit`);
          }}
        >
          <EditOutline size="xl" />
        </button>
      </div>
    </div>
  </Card>
</div>
