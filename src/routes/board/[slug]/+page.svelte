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

  const boardDetail = data?.boardFirst;
  export let title = boardDetail?.title;
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="container">
  <Card class="max-w-full">
    <div class="container">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {boardDetail?.title}
      </h5>
      <p class="font-normal leading-tight text-gray-700 dark:text-gray-400">
        {boardDetail?.content}
      </p>
    </div>

    <div class="container flex items-center justify-between">
      <div>
        <span>작성일:</span>
        <span
          >{moment(boardDetail?.created_at).tz('Asia/Seoul').utc().format('YYYY/MM/DD HH:mm')}</span
        >
      </div>

      <div class="flex">
        <form
          use:enhance
          action="?/delete"
          use:enhance={({ formData, cancel }) => {
            if (!confirm('메모를 정말로 삭제하시겠습니까?')) {
              cancel();
            } else {
              formData.append('idx', String(boardDetail?.idx));
            }
          }}
          method="POST"
        >
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
    </div>
  </Card>
</div>
