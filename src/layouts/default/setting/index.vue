<template>
  <div @click="openDrawer(true)">
    <Icon icon="ion:settings-outline" />
    <SettingDrawer @register="register" />
  </div>
</template>
<script lang="ts" setup>
  import SettingDrawer from './SettingDrawer';
  import Icon from '@project/components/Icon/Icon.vue';

  import { useDrawer } from '@project/components/Drawer';

  defineOptions({ name: 'SettingButton' });

  const [register, { openDrawer }] = useDrawer();
</script>
