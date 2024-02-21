<template>
  <PageWrapper title="标签页+多级field表单" v-loading="loading">
    <div class="container_">
      <div class="one"> 第一个 </div>
      <div class="two"> 第er个 </div>
    </div>

    <CollapseContainer title="标签页+多级field表单">
      <div class="my-3 font-600"> 大容器布局 </div>
      <BasicForm ref="formElRef" @register="register" />
      <div class="my-3 font-600"> 小组件布局 </div>

      <Tabs v-model:activeKey="activeKey">
        <TabPane
          v-for="item in tabsFormSchema"
          :key="item.key"
          v-bind="omit(item, ['Form', 'key'])"
        >
          <BasicForm @register="item.Form[0]" />
        </TabPane>
      </Tabs>

      <div class="my-3 font-600"> tab配置 </div>
      <Button class="mb-2" size="small" type="primary" @click="addComp">添加根节点</Button>

      <Tree
        v-if="treeData && treeData.length > 0"
        :autoExpandParent="true"
        :tree-data="treeData"
        :defaultExpandAll="true"
        showLine
        blockNode
      >
        <template v-slot:title="nodeData">
          <span> {{ nodeData.name }} </span>
          <ButtonGroup style="float: right">
            <!--            <Button size="small" @click="slotAddSame(nodeData)" icon="plus-circle" title="添加同级"></Button>-->
            <plus-outlined @click="addComp(nodeData)" class="m-2" />

            <edit-outlined @click="slotModify(nodeData)" class="m-2" />

            <Popconfirm
              title="确定删除该节点吗？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="confirmDel"
            >
              <delete-outlined @click="slotDelete(nodeData)" class="m-2" />
            </Popconfirm>
          </ButtonGroup>
        </template>
      </Tree>

      <div class="flex justify-end mr-1">
        <Button @click="handleSubmit" type="primary"> 提交表单 </Button>
        <Button @click="handleClear" class="mx-2" type="default"> 清除缓存 </Button>
      </div>

      <Modal v-model:open="open" title="新建/修改节点" @ok="handleOk">
        <div class="mx-2">
          名称：<Input v-model:value="compName" placeholder="请输入节点名称" />
        </div>
      </Modal>
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Tabs, Modal, Tree, Button, ButtonGroup, Popconfirm, Input } from 'ant-design-vue';
  import { PageWrapper } from '@/components/Page';
  import { CollapseContainer } from '@/components/Container';
  import { useMessage } from '@/hooks/web/useMessage';
  import { omit } from 'lodash-es';
  import { BasicForm, useForm } from '@/components/Form';
  import { useRouter } from 'vue-router';
  import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';

  import { toRaw, onMounted } from 'vue';
  import { LayoutConfigGet } from './util';
  let routeMessage = useRouter().currentRoute.value.fullPath;

  if(!localStorage.getItem(routeMessage)){
      localStorage.setItem(routeMessage, JSON.stringify(baseUserLayoutConfig));
    }
  let { schemasProps, tabsFormSchema, treeOrigin } = LayoutConfigGet(
    routeMessage
  );
  
  import { convertToCSS } from './util';
  import { baseUserLayoutConfig } from './config';
  
  onMounted(() => {
    
    convertToCSS(baseUserLayoutConfig, routeMessage);
  });

  // 大容器布局
  let [register, { getFieldsValue: BigLayOutGet }] = useForm({
    labelWidth: 120,
    schemas: schemasProps as any ,
    actionColOptions: { span: 22 },
    fieldMapToTime: [['fieldTime', ['startTime', 'endTime'], 'YYYY-MM']],
    showActionButtonGroup: false,
  });

  const TabPane = Tabs.TabPane;

  const { createMessage } = useMessage();
  let defaultKey;
  if (tabsFormSchema) {
    defaultKey = tabsFormSchema[0].key;
  }

  const activeKey = ref(defaultKey);
  const loading = ref(false);

  /**
   * @des 提交
   */
  async function handleSubmit() {
    let lastKey = '';
    loading.value = true;

    // 处理小组件布局 覆盖属性
    try {
      const values: Recordable = {};
      if (tabsFormSchema) {
        for (const item of tabsFormSchema) {
          lastKey = item.key;
          const { validate, getFieldsValue } = item.Form[1];
          await validate();
          if (getFieldsValue().element) {
            values[getFieldsValue().element] = getFieldsValue();
            let override = values[getFieldsValue().element]['override'];
            if (values[getFieldsValue().element]['override']) {
              values[getFieldsValue().element] = {
                ...values[getFieldsValue().element],
                ...JSON.parse(override),
              };
            }
            delete values[getFieldsValue().element]['element'];
            delete values[getFieldsValue().element]['override'];
          }

          console.log(getFieldsValue());
        }
      }

      let res = {
        ...BigLayOutGet(),
        class: values,
        tabs: toRaw(treeData.value),
      };
      // 处理大容器布局 覆盖属性
      if (res['override']) {
        let override = res['override'];
        res = {
          ...res,
          ...JSON.parse(override),
        };
        delete res['override'];
      }

      console.log('BigLayOutGet:', res, routeMessage);
      localStorage.setItem(routeMessage, JSON.stringify(res));
      createMessage.success('提交成功！');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (e) {
      // 验证失败或出错，切换到对应标签页
      activeKey.value = lastKey;
      console.log(e);
      createMessage.error(e);
    } finally {
      loading.value = false;
    }
  }

  /**
   * @des
   */
  const handleClear = () => {
    localStorage.clear();
    createMessage.success('清除缓存成功');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  // tab 树状配置
  const treeData = ref<any>(treeOrigin);
  const parentNode = ref<any>({});
  const open = ref(false);
  const compName = ref('');
  const isUpdate = ref(false);
  const showModal = () => {
    open.value = true;
  };

  // modal 确认
  const handleOk = () => {
    if (isUpdate.value) {
      Object.assign(parentNode.value.dataRef, { name: compName.value });
    } else {
      // 增加
      if (!parentNode.value.name) {
        treeData.value.push({ name: compName.value, children: [], key: 0 });
      } else {
        parentNode.value.children.push({ name: compName.value, children: [], key: Math.random() });
      }
    }
    // console.log("treeData.value",treeData.value)

    open.value = false;
  };

  // 增加根节点 或者是 添加子节点
  function addComp(nodeData) {
    console.log('nodeData:', nodeData);
    isUpdate.value = false;
    compName.value = '';
    parentNode.value = nodeData;
    showModal();
  }

  // 修改当前节点
  function slotModify(nodeData) {
    isUpdate.value = true;
    parentNode.value = nodeData;
    compName.value = nodeData.dataRef.name;
    showModal();
  }

  // 删除当前节点
  function slotDelete(nodeData) {
    parentNode.value = nodeData;
  }

  // 确认删除当前节点
  function confirmDel() {
    Object.assign(parentNode.value.dataRef, null);
    searchOption(parentNode.value.dataRef, treeData.value);
  }

  //  递归查找操作的节点，在父节点的children中删除
  function searchOption(option, arr, obj = {}) {
    //首先循环arr最外层数据
    for (let s = 0; s < arr.length; s++) {
      //如果匹配到了arr最外层中的我需要删除的数据
      if (arr[s].key === option.key) {
        //删除即删除即可
        arr.splice(s, 1);
        break;
      } else if (arr[s].children && arr[s].children.length > 0) {
        // 递归条件
        searchOption(option, arr[s].children, obj);
      } else {
        continue;
      }
    }
  }
</script>

<style scoped>
  .container_ {
    width: 98vw;
    height: 98vh;
  }

  .one {
    background: red;
  }
</style>
