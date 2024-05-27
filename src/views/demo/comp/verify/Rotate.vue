<template>
  <PageWrapper title="旋转校验示例">
    <div class="flex justify-center p-4 items-center bg-gray-700">
      <RotateDragVerify :src="img" ref="el" @success="handleSuccess" />
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { RotateDragVerify } from '@project/components/Verify';

  import img from '@project/assets/images/header.jpg';

  import { PageWrapper } from '@project/components/Page';

  function handleSuccess() {
    console.log('success!');
  }
</script>
