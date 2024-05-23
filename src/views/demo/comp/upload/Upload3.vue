<template>
  <Alert message="bug" />

  <BasicForm @register="registerCustom" class="my-5" />
  <Button @click="clickMe">clickmE</Button>
</template>

<script setup lang="ts">
  import { Alert } from 'ant-design-vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { h, ref } from 'vue';
  import { Button } from 'ant-design-vue';
  import { useDebounceFn } from '@vueuse/core';

  const clickMe = ()=>{
    console.log("getFieldsValue:",getFieldsValue())
  }
  // 考勤统计-人员姓名
  const Keyword = ref<string>('');
  function remoteOnSearch(value: string) {
    Keyword.value = value;
    console.log('onsearch:', value);
  }

  let mockData: any = (ids) => {
    return new Promise((e) => {
      e([{ label: Number(ids), value: Number(ids) }]);
    });
  };
  const [registerCustom,{getFieldsValue}] = useForm({
    baseColProps: { span: 24 },
    labelWidth: 124,
    schemas: [
      {
        field: 'field3',
        label: 'label',
        component: 'ApiSelect',
     
        componentProps: () => {
          return {
            mode:"multiple",
            showSearch: true,
            params: Keyword.value,
            onSearch: remoteOnSearch,
            filterOption: false,
            api: async (apiReq) => {
              let result = await mockData(apiReq);
              return result;
            },
          };
        },
      },
    ],
  });
</script>



