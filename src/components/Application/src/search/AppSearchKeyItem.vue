<template>
  <span :class="$attrs.class">
    <Icon :icon="icon" />
  </span>
</template>
<script lang="ts" setup>
  import Icon from '@project/components/Icon/Icon.vue';

  defineProps({
    icon: String,
  });
</script>
