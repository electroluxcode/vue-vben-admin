import type { AppRouteModule } from '@project/router/types';

import { getParentLayout, LAYOUT } from '@project/router/constant';
import { t } from '@project/hooks/web/useI18n';

const comp: AppRouteModule = {
  path: '/comp',
  name: 'Comp',
  component: LAYOUT,
  redirect: '/comp/basic',
  meta: {
    orderNo: 30,
    icon: 'ion:layers-outline',
    title: t('routes.demo.comp.comp'),
  },

  children: [
    {
      path: 'basic',
      name: 'BasicDemo',
      component: () => import('@project/views/demo/comp/button/index.vue'),
      meta: {
        title: t('routes.demo.comp.basic'),
      },
    },

    {
      path: 'form',
      name: 'FormDemo',
      redirect: '/comp/form/basic',
      component: getParentLayout('FormDemo'),
      meta: {
        // icon: 'mdi:form-select',
        title: t('routes.demo.form.form'),
      },
      children: [
        {
          path: 'basic',
          name: 'FormBasicDemo',
          component: () => import('@project/views/demo/form/index.vue'),
          meta: {
            title: t('routes.demo.form.basic'),
          },
        },
        {
          path: 'useForm',
          name: 'UseFormDemo',
          component: () => import('@project/views/demo/form/UseForm.vue'),
          meta: {
            title: t('routes.demo.form.useForm'),
          },
        },
        {
          path: 'refForm',
          name: 'RefFormDemo',
          component: () => import('@project/views/demo/form/RefForm.vue'),
          meta: {
            title: t('routes.demo.form.refForm'),
          },
        },
        {
          path: 'advancedForm',
          name: 'AdvancedFormDemo',
          component: () => import('@project/views/demo/form/AdvancedForm.vue'),
          meta: {
            title: t('routes.demo.form.advancedForm'),
          },
        },
        {
          path: 'ruleForm',
          name: 'RuleFormDemo',
          component: () => import('@project/views/demo/form/RuleForm.vue'),
          meta: {
            title: t('routes.demo.form.ruleForm'),
          },
        },
        {
          path: 'dynamicForm',
          name: 'DynamicFormDemo',
          component: () => import('@project/views/demo/form/DynamicForm.vue'),
          meta: {
            title: t('routes.demo.form.dynamicForm'),
          },
        },
        {
          path: 'customerForm',
          name: 'CustomerFormDemo',
          component: () => import('@project/views/demo/form/CustomerForm.vue'),
          meta: {
            title: t('routes.demo.form.customerForm'),
          },
        },
        {
          path: 'appendForm',
          name: 'appendFormDemo',
          component: () => import('@project/views/demo/form/AppendForm.vue'),
          meta: {
            title: t('routes.demo.form.appendForm'),
          },
        },
        {
          path: 'tabsForm',
          name: 'tabsFormDemo',
          component: () => import('@project/views/demo/form/TabsForm.vue'),
          meta: {
            title: t('routes.demo.form.tabsForm'),
          },
        },
      ],
    },
    {
      path: 'table',
      name: 'TableDemo',
      redirect: '/comp/table/basic',
      component: getParentLayout('TableDemo'),
      meta: {
        // icon: 'carbon:table-split',
        title: t('routes.demo.table.table'),
      },

      children: [
        {
          path: 'basic',
          name: 'TableBasicDemo',
          component: () => import('@project/views/demo/table/Basic.vue'),
          meta: {
            title: t('routes.demo.table.basic'),
          },
        },
        {
          path: 'treeTable',
          name: 'TreeTableDemo',
          component: () => import('@project/views/demo/table/TreeTable.vue'),
          meta: {
            title: t('routes.demo.table.treeTable'),
          },
        },
        {
          path: 'fetchTable',
          name: 'FetchTableDemo',
          component: () => import('@project/views/demo/table/FetchTable.vue'),
          meta: {
            title: t('routes.demo.table.fetchTable'),
          },
        },
        {
          path: 'fixedColumn',
          name: 'FixedColumnDemo',
          component: () => import('@project/views/demo/table/FixedColumn.vue'),
          meta: {
            title: t('routes.demo.table.fixedColumn'),
          },
        },
        {
          path: 'customerCell',
          name: 'CustomerCellDemo',
          component: () => import('@project/views/demo/table/CustomerCell.vue'),
          meta: {
            title: t('routes.demo.table.customerCell'),
          },
        },
        {
          path: 'formTable',
          name: 'FormTableDemo',
          component: () => import('@project/views/demo/table/FormTable.vue'),
          meta: {
            title: t('routes.demo.table.formTable'),
          },
        },
        {
          path: 'useTable',
          name: 'UseTableDemo',
          component: () => import('@project/views/demo/table/UseTable.vue'),
          meta: {
            title: t('routes.demo.table.useTable'),
          },
        },
        {
          path: 'refTable',
          name: 'RefTableDemo',
          component: () => import('@project/views/demo/table/RefTable.vue'),
          meta: {
            title: t('routes.demo.table.refTable'),
          },
        },
        {
          path: 'multipleHeader',
          name: 'MultipleHeaderDemo',
          component: () => import('@project/views/demo/table/MultipleHeader.vue'),
          meta: {
            title: t('routes.demo.table.multipleHeader'),
          },
        },
        {
          path: 'mergeHeader',
          name: 'MergeHeaderDemo',
          component: () => import('@project/views/demo/table/MergeHeader.vue'),
          meta: {
            title: t('routes.demo.table.mergeHeader'),
          },
        },
        {
          path: 'expandTable',
          name: 'ExpandTableDemo',
          component: () => import('@project/views/demo/table/ExpandTable.vue'),
          meta: {
            title: t('routes.demo.table.expandTable'),
          },
        },
        {
          path: 'fixedHeight',
          name: 'FixedHeightDemo',
          component: () => import('@project/views/demo/table/FixedHeight.vue'),
          meta: {
            title: t('routes.demo.table.fixedHeight'),
          },
        },
        {
          path: 'footerTable',
          name: 'FooterTableDemo',
          component: () => import('@project/views/demo/table/FooterTable.vue'),
          meta: {
            title: t('routes.demo.table.footerTable'),
          },
        },
        {
          path: 'editCellTable',
          name: 'EditCellTableDemo',
          component: () => import('@project/views/demo/table/EditCellTable.vue'),
          meta: {
            title: t('routes.demo.table.editCellTable'),
          },
        },
        {
          path: 'editRowTable',
          name: 'EditRowTableDemo',
          component: () => import('@project/views/demo/table/EditRowTable.vue'),
          meta: {
            title: t('routes.demo.table.editRowTable'),
          },
        },
        {
          path: 'authColumn',
          name: 'AuthColumnDemo',
          component: () => import('@project/views/demo/table/AuthColumn.vue'),
          meta: {
            title: t('routes.demo.table.authColumn'),
          },
        },
        {
          path: 'resizeParentHeightTable',
          name: 'ResizeParentHeightTable',
          component: () => import('@project/views/demo/table/ResizeParentHeightTable.vue'),
          meta: {
            title: t('routes.demo.table.resizeParentHeightTable'),
          },
        },
        {
          path: 'vxeTable',
          name: 'VxeTableDemo',
          component: () => import('@project/views/demo/table/VxeTable.vue'),
          meta: {
            title: t('routes.demo.table.vxeTable'),
          },
        },
      ],
    },
    {
      path: 'transition',
      name: 'transitionDemo',
      component: () => import('@project/views/demo/comp/transition/index.vue'),
      meta: {
        title: t('routes.demo.comp.transition'),
      },
    },
    {
      path: 'cropper',
      name: 'CropperDemo',
      component: () => import('@project/views/demo/comp/cropper/index.vue'),
      meta: {
        title: t('routes.demo.comp.cropperImage'),
      },
    },

    {
      path: 'timestamp',
      name: 'TimeDemo',
      component: () => import('@project/views/demo/comp/time/index.vue'),
      meta: {
        title: t('routes.demo.comp.time'),
      },
    },
    {
      path: 'countTo',
      name: 'CountTo',
      component: () => import('@project/views/demo/comp/count-to/index.vue'),
      meta: {
        title: t('routes.demo.comp.countTo'),
      },
    },
    {
      path: 'tree',
      name: 'TreeDemo',
      redirect: '/comp/tree/basic',
      component: getParentLayout('TreeDemo'),
      meta: {
        // icon: 'clarity:tree-view-line',
        title: t('routes.demo.comp.tree'),
      },
      children: [
        {
          path: 'basic',
          name: 'BasicTreeDemo',
          component: () => import('@project/views/demo/tree/index.vue'),
          meta: {
            title: t('routes.demo.comp.treeBasic'),
          },
        },
        {
          path: 'editTree',
          name: 'EditTreeDemo',
          component: () => import('@project/views/demo/tree/EditTree.vue'),
          meta: {
            title: t('routes.demo.comp.editTree'),
          },
        },
        {
          path: 'actionTree',
          name: 'ActionTreeDemo',
          component: () => import('@project/views/demo/tree/ActionTree.vue'),
          meta: {
            title: t('routes.demo.comp.actionTree'),
          },
        },
      ],
    },
    {
      path: 'editor',
      name: 'EditorDemo',
      redirect: '/comp/editor/markdown',
      component: getParentLayout('EditorDemo'),
      meta: {
        // icon: 'carbon:table-split',
        title: t('routes.demo.editor.editor'),
      },
      children: [
        {
          path: 'code',
          component: () => import('@project/views/demo/editor/code/index.vue'),
          name: 'codeEditorDemo',
          meta: {
            title: t('routes.demo.editor.codeEditor'),
          },
          children: [
            {
              path: 'code',
              name: 'codeBasicDemo',
              component: () => import('@project/views/demo/editor/code/index.vue'),
              meta: {
                title: t('routes.demo.editor.tinymceBasic'),
              },
            },
            {
              path: 'editor',
              name: 'codeEditorBasicDemo',
              component: () => import('@project/views/demo/editor/code/Editor.vue'),
              meta: {
                title: t('routes.demo.editor.tinymceForm'),
              },
            },
          ],
        },
        {
          path: 'markdown',
          component: getParentLayout('MarkdownDemo'),
          name: 'MarkdownDemo',
          meta: {
            title: t('routes.demo.editor.markdown'),
          },
          redirect: '/comp/editor/markdown/index',
          children: [
            {
              path: 'index',
              name: 'MarkDownBasicDemo',
              component: () => import('@project/views/demo/editor/markdown/index.vue'),
              meta: {
                title: t('routes.demo.editor.tinymceBasic'),
              },
            },
            {
              path: 'editor',
              name: 'MarkDownFormDemo',
              component: () => import('@project/views/demo/editor/markdown/Editor.vue'),
              meta: {
                title: t('routes.demo.editor.tinymceForm'),
              },
            },
          ],
        },

        {
          path: 'tinymce',
          component: getParentLayout('TinymceDemo'),
          name: 'TinymceDemo',
          meta: {
            title: t('routes.demo.editor.tinymce'),
          },
          redirect: '/comp/editor/tinymce/index',
          children: [
            {
              path: 'index',
              name: 'TinymceBasicDemo',
              component: () => import('@project/views/demo/editor/tinymce/index.vue'),
              meta: {
                title: t('routes.demo.editor.tinymceBasic'),
              },
            },
            {
              path: 'editor',
              name: 'TinymceFormDemo',
              component: () => import('@project/views/demo/editor/tinymce/Editor.vue'),
              meta: {
                title: t('routes.demo.editor.tinymceForm'),
              },
            },
          ],
        },
      ],
    },
    {
      path: 'scroll',
      name: 'ScrollDemo',
      redirect: '/comp/scroll/basic',
      component: getParentLayout('ScrollDemo'),
      meta: {
        title: t('routes.demo.comp.scroll'),
      },
      children: [
        {
          path: 'basic',
          name: 'BasicScrollDemo',
          component: () => import('@project/views/demo/comp/scroll/index.vue'),
          meta: {
            title: t('routes.demo.comp.scrollBasic'),
          },
        },
        {
          path: 'action',
          name: 'ActionScrollDemo',
          component: () => import('@project/views/demo/comp/scroll/Action.vue'),
          meta: {
            title: t('routes.demo.comp.scrollAction'),
          },
        },
        {
          path: 'virtualScroll',
          name: 'VirtualScrollDemo',
          component: () => import('@project/views/demo/comp/scroll/VirtualScroll.vue'),
          meta: {
            title: t('routes.demo.comp.virtualScroll'),
          },
        },
      ],
    },

    {
      path: 'modal',
      name: 'ModalDemo',
      component: () => import('@project/views/demo/comp/modal/index.vue'),
      meta: {
        title: t('routes.demo.comp.modal'),
      },
    },
    {
      path: 'drawer',
      name: 'DrawerDemo',
      component: () => import('@project/views/demo/comp/drawer/index.vue'),
      meta: {
        title: t('routes.demo.comp.drawer'),
      },
    },
    {
      path: 'desc',
      name: 'DescDemo',
      component: () => import('@project/views/demo/comp/desc/index.vue'),
      meta: {
        title: t('routes.demo.comp.desc'),
      },
    },

    {
      path: 'verify',
      name: 'VerifyDemo',
      component: getParentLayout('VerifyDemo'),
      redirect: '/comp/verify/drag',
      meta: {
        title: t('routes.demo.comp.verify'),
      },
      children: [
        {
          path: 'drag',
          name: 'VerifyDragDemo',
          component: () => import('@project/views/demo/comp/verify/index.vue'),
          meta: {
            title: t('routes.demo.comp.verifyDrag'),
          },
        },
        {
          path: 'rotate',
          name: 'VerifyRotateDemo',
          component: () => import('@project/views/demo/comp/verify/Rotate.vue'),
          meta: {
            title: t('routes.demo.comp.verifyRotate'),
          },
        },
      ],
    },
    //

    {
      path: 'qrcode',
      name: 'QrCodeDemo',
      component: () => import('@project/views/demo/comp/qrcode/index.vue'),
      meta: {
        title: t('routes.demo.comp.qrcode'),
      },
    },
    {
      path: 'strength-meter',
      name: 'StrengthMeterDemo',
      component: () => import('@project/views/demo/comp/strength-meter/index.vue'),
      meta: {
        title: t('routes.demo.comp.strength'),
      },
    },
    {
      path: 'upload',
      name: 'UploadDemo',
      component: () => import('@project/views/demo/comp/upload/index.vue'),
      meta: {
        title: t('routes.demo.comp.upload'),
      },
    },
    {
      path: 'loading',
      name: 'LoadingDemo',
      component: () => import('@project/views/demo/comp/loading/index.vue'),
      meta: {
        title: t('routes.demo.comp.loading'),
      },
    },
    {
      path: 'cardList',
      name: 'CardListDemo',
      component: () => import('@project/views/demo/comp/card-list/index.vue'),
      meta: {
        title: t('routes.demo.comp.cardList'),
      },
    },
  ],
};

export default comp;
