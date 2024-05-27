import type { AppRouteModule } from '@project/router/types';

import { LAYOUT } from '@project/router/constant';
import { t } from '@project/hooks/web/useI18n';

const about: AppRouteModule = {
  path: '/about',
  name: 'About',
  component: LAYOUT,
  redirect: '/about/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:aboutdotme',
    title: t('routes.dashboard.about'),
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'AboutPage',
      component: () => import('@project/views/sys/about/index.vue'),
      meta: {
        title: t('routes.dashboard.about'),
        icon: 'simple-icons:aboutdotme',
        hideMenu: true,
      },
    },
  ],
};

export default about;
