import { resolve } from 'node:path';

import dayjs from 'dayjs';
import { readPackageJSON } from 'pkg-types';
import { defineConfig, loadEnv, mergeConfig, type UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createPlugins } from '../plugins';
import { generateModifyVars } from '../utils/modifyVars';
import { commonConfig } from './common';
import dts from 'vite-plugin-dts';
interface DefineOptions {
  overrides?: UserConfig;
  options?: {
    //
  };
}

function defineApplicationConfig(defineOptions: DefineOptions = {}) {
  const { overrides = {} } = defineOptions;

  return defineConfig(async ({ command, mode }) => {
    const root = process.cwd();
    const isBuild = command === 'build';
    const { VITE_PUBLIC_PATH, VITE_USE_MOCK, VITE_BUILD_COMPRESS, VITE_ENABLE_ANALYZE } = loadEnv(
      mode,
      root,
    );

    const defineData = await createDefineData(root);
    const plugins = await createPlugins({
      isBuild,
      root,
      enableAnalyze: VITE_ENABLE_ANALYZE === 'true',
      enableMock: VITE_USE_MOCK === 'true',
      compress: VITE_BUILD_COMPRESS,
    });

    const pathResolve = (pathname: string) => resolve(root, '.', pathname);
    const timestamp = new Date().getTime();
    const applicationConfig: UserConfig = {
      base: VITE_PUBLIC_PATH,
      resolve: {
        alias: [
          {
            find: 'vue-i18n',
            replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
          },
          // @/xxxx => src/xxxx
          {
            find: /@\//,
            replacement: pathResolve('src') + '/',
          },
          // #/xxxx => types/xxxx
          {
            find: /#\//,
            replacement: pathResolve('types') + '/',
          },
        ],
      },
      define: defineData,
      build: {
        target: 'es2015',
        cssTarget: 'chrome80',
        rollupOptions: {
          output: {
            // 入口文件名
            entryFileNames: `assets/entry/[name]-[hash]-${timestamp}.js`,
            manualChunks: {
              vue: ['vue', 'pinia', 'vue-router'],
              antd: ['ant-design-vue', '@ant-design/icons-vue'],
            },
          },
        },
      },
      css: {
        preprocessorOptions: {
          less: {
            modifyVars: generateModifyVars(),
            javascriptEnabled: true,
          },
        },
      },
      plugins,
    };

    const mergedConfig = mergeConfig(commonConfig(mode), applicationConfig);

    return mergeConfig(mergedConfig, overrides);
  });
}

async function createDefineData(root: string) {
  try {
    const pkgJson = await readPackageJSON(root);
    const { dependencies, devDependencies, name, version } = pkgJson;

    const __APP_INFO__ = {
      pkg: { dependencies, devDependencies, name, version },
      lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
    return {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    };
  } catch (error) {
    return {};
  }
}
function defineApplicationConfigZp(defineOptions: DefineOptions = {}) {
  return defineConfig(async ({ command, mode }) => {
    const root = process.cwd();

    const defineData = await createDefineData(root);
 
    const pathResolve = (pathname: string) => resolve(root, '.', pathname);
    const applicationConfig: UserConfig = {
      base: "./",
      resolve: {
        alias: [
          {
            find: 'vue-i18n',
            replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
          },
          // @/xxxx => src/xxxx
          {
            find: /@\//,
            replacement: pathResolve('src') + '/',
          },
          // #/xxxx => types/xxxx
          {
            find: /#\//,
            replacement: pathResolve('types') + '/',
          },
        ],
      },
      define: defineData,
      
      build: {
        lib: {
          entry: './src/main',
          name: 'BundleZp',
          fileName: 'bundleZp',
          
        },
        
        sourcemap: true,
        outDir: 'distp', // 指定输出路径，要和库的包区分开
        assetsDir: 'static/img/', // 指定生成静态资源的存放路径
        rollupOptions: {
          
          external: ['vue', 'virtual:svg-icons-names','uno.css','virtual:svg-icons-register','ant-design-vue'],
          output: [{
            chunkFileNames: 'static1/chunk/[name]-[hash].js',
            entryFileNames: 'static1/entry/[name]-[hash].js',
            assetFileNames: 'static1/[ext]/[name]-[hash].[ext]',
            name: 'name1/[ext]/[name]-[hash].[ext]',
            globals: {
              vue: 'Vue',
            },
          },{
            chunkFileNames: 'main/chunk/[name]-[hash].js',
            entryFileNames: 'main/entry/[name].js',
            assetFileNames: 'main/[ext]/[name]-[hash].[ext]',
            name: 'main/[ext]/[name]-[hash].[ext]',
            globals: {
              vue: 'Vue',
            },
            
          }],
        },
      },

      css: {
        preprocessorOptions: {
          less: {
            modifyVars: generateModifyVars(),
            javascriptEnabled: true,
          },
        },
      },
      // plugins,
      plugins: [
        vue(),
        dts({ include: './src/components' ,insertTypesEntry:true,outDir:"distp/main/entry"}),
      ],
    };

    // const mergedConfig = applicationConfig;

    // return mergeConfig(mergedConfig, overrides);
    return applicationConfig;
  });
}
export { defineApplicationConfig, defineApplicationConfigZp };
