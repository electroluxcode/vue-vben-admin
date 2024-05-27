<template>
  <LayoutLockPage />
  <SettingDrawer
    v-if="getIsFixedSettingDrawer && (!getShowMultipleTab || getFullContent)"
    :class="prefixCls"
  />
  <SessionTimeoutLogin v-if="getIsSessionTimeout" />
</template>
<script lang="ts" setup>
  import { computed, unref } from 'vue';

  import { useRootSetting } from '@project/hooks/setting/useRootSetting';
  import { useHeaderSetting } from '@project/hooks/setting/useHeaderSetting';
  import { useDesign } from '@project/hooks/web/useDesign';
  import { useUserStoreWithOut } from '@project/store/modules/user';

  import { SettingButtonPositionEnum } from '@project/enums/appEnum';
  import { createAsyncComponent } from '@project/utils/factory/createAsyncComponent';

  import SessionTimeoutLogin from '@project/views/sys/login/SessionTimeoutLogin.vue';

  import { useMultipleTabSetting } from '@project/hooks/setting/useMultipleTabSetting';

  defineOptions({ name: 'LayoutFeatures' });

  const LayoutLockPage = createAsyncComponent(() => import('@project/views/sys/lock/index.vue'));
  const SettingDrawer = createAsyncComponent(() => import('@project/layouts/default/setting/index.vue'));

  const { getShowSettingButton, getSettingButtonPosition, getFullContent } = useRootSetting();
  const userStore = useUserStoreWithOut();
  const { prefixCls } = useDesign('setting-drawer-feature');
  const { getShowHeader } = useHeaderSetting();

  const getIsSessionTimeout = computed(() => userStore.getSessionTimeout);

  const getIsFixedSettingDrawer = computed(() => {
    if (!unref(getShowSettingButton)) {
      return false;
    }
    const settingButtonPosition = unref(getSettingButtonPosition);

    if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
      return !unref(getShowHeader) || unref(getFullContent);
    }
    return settingButtonPosition === SettingButtonPositionEnum.FIXED;
  });

  const { getShowMultipleTab } = useMultipleTabSetting();
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-setting-drawer-feature';

  .@{prefix-cls} {
    display: flex;
    position: absolute;
    z-index: 10;
    top: 45%;
    right: 0;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 6px 0 0 6px;
    background-color: @primary-color;
    color: @white;
    cursor: pointer;

    svg {
      width: 1em;
      height: 1em;
    }
  }
</style>
