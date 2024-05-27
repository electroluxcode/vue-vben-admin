/**
 * Application configuration
 */
import type { ProjectConfig } from '@projectType/config';

import { PROJ_CFG_KEY } from '@project/enums/cacheEnum';
import projectSetting from '@project/settings/projectSetting';

import { updateDarkTheme } from '@project/logics/theme/dark';
import { updateHeaderBgColor, updateSidebarBgColor } from '@project/logics/theme/updateBackground';
import { updateColorWeak } from '@project/logics/theme/updateColorWeak';
import { updateGrayMode } from '@project/logics/theme/updateGrayMode';

import { useAppStore } from '@project/store/modules/app';
import { useLocaleStore } from '@project/store/modules/locale';

import { getCommonStoragePrefix, getStorageShortName } from '@project/utils/env';

import { ThemeEnum } from '@project/enums/appEnum';
import { deepMerge } from '@project/utils';
import { Persistent } from '@project/utils/cache/persistent';

// Initial project configuration
export function initAppConfigStore() {
  const localeStore = useLocaleStore();
  const appStore = useAppStore();
  let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig;
  projCfg = deepMerge(projectSetting, projCfg || {});
  const darkMode = appStore.getDarkMode;
  const {
    colorWeak,
    grayMode,

    headerSetting: { bgColor: headerBgColor } = {},
    menuSetting: { bgColor } = {},
  } = projCfg;
  try {
    grayMode && updateGrayMode(grayMode);
    colorWeak && updateColorWeak(colorWeak);
  } catch (error) {
    console.log(error);
  }
  appStore.setProjectConfig(projCfg);

  // init dark mode
  updateDarkTheme(darkMode);
  if (darkMode === ThemeEnum.DARK) {
    updateHeaderBgColor();
    updateSidebarBgColor();
  } else {
    headerBgColor && updateHeaderBgColor(headerBgColor);
    bgColor && updateSidebarBgColor(bgColor);
  }
  // init store
  localeStore.initLocale();

  setTimeout(() => {
    clearObsoleteStorage();
  }, 16);
}

/**
 * As the version continues to iterate, there will be more and more cache keys stored in localStorage.
 * This method is used to delete useless keys
 */
export function clearObsoleteStorage() {
  const commonPrefix = getCommonStoragePrefix();
  const shortPrefix = getStorageShortName();

  [localStorage, sessionStorage].forEach((item: Storage) => {
    Object.keys(item).forEach((key) => {
      if (key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)) {
        item.removeItem(key);
      }
    });
  });
}
