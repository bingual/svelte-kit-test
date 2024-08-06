<script lang="ts">
  import { Button, Fileupload, Input, Textarea } from 'flowbite-svelte';
  import { goto } from '$app/navigation';
  import { enhance } from '$app/forms';

  let textareaprops = {
    id: 'content',
    name: 'content',
    label: 'content',
    rows: 10,
    placeholder: '내용을 입력하세요.',
  };

  // TODO: 컴포넌트간 프롭스 전달시에 자동 타입추론 하는 방법이 있는지는 모르겠음. server props는 자동으로됨
  export let boardData;
  export let submitName;
  export let redirectUrl;
</script>

<form use:enhance method="POST" enctype="multipart/form-data">
  <div class="mb-3">
    <Input
      id="title"
      name="title"
      placeholder="제목을 입력하세요."
      value={boardData && boardData?.title}
      required
    />
  </div>

  <div class="mb-2">
    <Textarea {...textareaprops} value={boardData && boardData?.content} required />
  </div>

  <div class="mb-5">
    <Fileupload name="photo" accept=".jpg, .jpeg, .png" required />
  </div>

  <div class="flex justify-end">
    <Button
      class="me-1"
      color="dark"
      on:click={() => {
        goto(redirectUrl);
      }}
    >
      취소
    </Button>

    <Button type="submit">{submitName}</Button>
  </div>
</form>
