<template>
  <span :class="[prefixCls, theme]" @click="toggleCollapsed">
    <MenuUnfoldOutlined v-if="getCollapsed" /> <MenuFoldOutlined v-else />
  </span>
</template>
<script lang="ts" setup>
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
  import { useMenuSetting } from '@project/hooks/setting/useMenuSetting';
  import { useDesign } from '@project/hooks/web/useDesign';
  import { propTypes } from '@project/utils/propTypes';

  defineProps({
    theme: propTypes.oneOf(['light', 'dark']),
  });
  const { getCollapsed, toggleCollapsed } = useMenuSetting();
  const { prefixCls } = useDesign('layout-header-trigger');
</script>
