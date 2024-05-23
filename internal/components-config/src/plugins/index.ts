import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { type PluginOption } from 'vite';
import purgeIcons from 'vite-plugin-purge-icons';

// import { configHtmlPlugin } from './html';
import { configSvgIconsPlugin } from './svgSprite';

import dts from 'vite-plugin-dts';

interface Options {
  isBuild: boolean;
  root: string;
  compress: string;
  enableAnalyze?: boolean;
}
import UnoCSS from 'unocss/vite'
async function createPlugins({ isBuild, root, compress, enableAnalyze }: Options) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [vue(), vueJsx()];

  vitePlugins.push(UnoCSS())
  // vite-plugin-html
  // vitePlugins.push(configHtmlPlugin({ isBuild }));

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin({ isBuild }));

  // vite-plugin-purge-icons
  vitePlugins.push(purgeIcons());

  // The following plugins only work in the production environment
  // if (isBuild) {
  //   // rollup-plugin-gzip
  //   vitePlugins.push(
  //     configCompressPlugin({
  //       compress,
  //     }),
  //   );
  // }

  // rollup-plugin-visualizer
  // if (enableAnalyze) {
  //   vitePlugins.push(configVisualizerConfig());
  // }
  let pluginTypes = [
    dts({
      outDir: 'es',
      // insertTypesEntry:true,
      // logLevel:"silent",
      entryRoot:"src/components/index.ts"
    }),
    // dts({
    //   outDir: 'lib',
    //   // logLevel:"silent"
    // }),
  ];
  vitePlugins.push(...pluginTypes);
  return vitePlugins;
}

export { createPlugins };
