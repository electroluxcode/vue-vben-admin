

## git submodule 同步 vben 策略

最终效果:维护一个上游仓库(通过git pull vben主分支即可)，然后下游通过git pull同步上游仓库来进行vben最新代码的同步。举一个例子：我fork 了 vben的 dev 分支在我的代码上面 那么这个 分支我们称他为上游。一般格式如下 https://github.com/electroluxcode/vue-vben-admin.git 。然后我们实际使用的工程地址，我们一般称之为下游。一般来说长这样 git@codeup.aliyun.com:ccccszh/xxx/xxxx.git

使用的注意事项:

- git clone 的时候，默认不会clone 子模块的代码。所以在clone的时候 需要 额外进行 `git submodule update --init` 的操作来clone 子模块
- 下游的别名不能够与上游的别名冲突



具体的例子如下：在下面代码中，我将 fork的fix/mult-upload分支作为上游，然后下游是我们实际使用的工程地址。然后alias 别名按照实际要求修改即可

- step1 :初始化submodule，在你的src/vben-admin-sync 将仓库克隆下来： git submodule add https://github.com/electroluxcode/vue-vben-admin.git -b 你的分支  src/vben-admin-sync

  - 或者直接在根目录新建 .gitmodules 文件写入

    ```git
    [submodule "src/vben-admin-sync"]
    	path = src/vben-admin-sync
    	url = https://github.com/electroluxcode/vue-vben-admin.git
    	branch = fix/mult-upload
    
    ```

    

- step2: **排除掉** **vben-admin-sync**，然后在vscode中， 全局搜索 @/ ，然后将其换成 @project/ 

- step3: **排除掉** **vben-admin-sync**，然后在vscode中，全局 #/ 换成 @projectType/

- step4：internal\vite-config\src\config\application.ts 文件夹中 将alias 改成下面这样

  ```ts
  alias: [
            {
              find: 'vue-i18n',
              replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
            },
            {
              find: /@\//,
              replacement:pathResolve('src')  + '/vben-admin-sync/src/',
            },
            // @projectType/xxxx => types/xxxx
            {
              find: /#\//,
              replacement:pathResolve('src')  +'/vben-admin-sync/types/',
            },
            // @project/xxxx => src/xxxx
            {
              find: /@project\//,
              replacement:pathResolve('src') + '/',
            },
             {
              find: /@projectType\//,
              replacement:pathResolve('types') + '/',
            },
          
          ],
  ```

- step5: 根目录的tsconfig.json 中添加 

  ```json
  "paths": {
        "@project/*": ["src/*"],
        "@projectType/*": ["types/*"],
        "@/*": ["src/vben-admin-sync/src/*"],
        "#/*": ["src/vben-admin-sync/types/*"]
      }
  ```

- step6: 在 `./src/vben-admin-sync/src/components/` 这个文件夹中，将 `import { useI18n } from '@/hooks/web/useI18n'` 替换成 `import { useI18n } from '@project/hooks/web/useI18n'`，commit push 提交后，维护上游即可





