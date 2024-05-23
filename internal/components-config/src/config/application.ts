import { resolve } from 'node:path';

import dayjs from 'dayjs';
import { readPackageJSON } from 'pkg-types';
import { defineConfig,  mergeConfig, type UserConfig } from 'vite';
import { createPlugins } from '../plugins';
import { generateModifyVars } from '../utils/modifyVars';
import { commonConfig } from './common';
;
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

    const defineData = await createDefineData(root);
    const plugins = await createPlugins({
      isBuild,
      root,
      enableAnalyze: false,
      compress: "false",
    });

    const pathResolve = (pathname: string) => resolve(root, '.', pathname);
    const applicationConfig: UserConfig = {
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
        target: 'modules',
        cssTarget: 'chrome80',
        lib:{
          entry: ['src/components/index.ts',],
          name: 'zp-lib', // 起个名字，安装、引入用
          fileName: (format) => `zp-lib.${format}.js`, // 打包后的文件名
        },
        
        rollupOptions: {
          //忽略打包文件
          external:  ['vue', "mockjs",'ant-design-vue',"vue-i18n","pinia"],
          input: ['src/components/index.ts'],
          preserveEntrySignatures: 'strict',
          output: [
            {
                format: 'es',
                //不用打包成.es.js,这里我们想把它打包成.js
                entryFileNames: '[name].js',
                //让打包目录和我们目录对应
                preserveModules: true,
                //配置打包根目录
                dir: 'es',
                preserveModulesRoot: 'src/components'
            },
            // {
            //     format: 'cjs',
            //     entryFileNames: '[name].js',
            //     //让打包目录和我们目录对应
            //     preserveModules: true,
            //     //配置打包根目录
            //     dir: 'lib',
            //     preserveModulesRoot: 'src/components'
            // }
        ],
        
        },
       
      },
      // lib: {
      //   entry: './index.ts',
      //   formats: ['es', 'cjs']
      // },
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

export { defineApplicationConfig };
