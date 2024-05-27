import type { Router } from 'vue-router';
import { useAppStore } from '@project/store/modules/app';
import { useMultipleTabStore } from '@project/store/modules/multipleTab';
import { useUserStore } from '@project/store/modules/user';
import { usePermissionStore } from '@project/store/modules/permission';
import { PageEnum } from '@project/enums/pageEnum';
import { removeTabChangeListener } from '@project/logics/mitt/routeChange';

export function createStateGuard(router: Router) {
  router.afterEach((to) => {
    // Just enter the login page and clear the authentication information
    if (to.path === PageEnum.BASE_LOGIN) {
      const tabStore = useMultipleTabStore();
      const userStore = useUserStore();
      const appStore = useAppStore();
      const permissionStore = usePermissionStore();
      appStore.resetAllState();
      permissionStore.resetState();
      tabStore.resetState();
      userStore.resetState();
      removeTabChangeListener();
    }
  });
}
