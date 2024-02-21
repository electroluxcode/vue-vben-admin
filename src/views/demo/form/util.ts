import { FormSchema, useForm, FormProps, UseFormReturnType } from '@/components/Form';

const baseFormConfig: Partial<FormProps> = {
  showActionButtonGroup: false,
  labelWidth: 120,
};

type TabsFormType = {
  key: string;
  tab: string;
  forceRender?: boolean;
  Form: UseFormReturnType;
};

/**
 * @des 读取缓存 创建form的util
 * @param {key} string - localstorage
 * @returns {Object} 返回一个包含表单config信息的对象
 * @property {array} schemasProps - 大容器布局 的 form 配置
 * @property {array} tabsFormSchema - 小容器布局 的 form 配置
 * @property {array} treeData - tab配置的树
 */
export const LayoutConfigGet = (key) => {
  const tabsFormSchema: TabsFormType[] = [];
  let arr
  // arr = {
  //   // 大容器类名
  //   element: 'bim_container',
  //   display: 'grid',
  //   'grid-template-columns': '1fr 1fr 1fr 1fr 1fr',
  //   'grid-template-rows': '1fr 1fr  1fr ',
  //   class: {
  //     // 小容器类名
  //     one: {
  //       'grid-column': '1 / span 1',
  //       'grid-row': '1 / span 2',
  //     },
  //     two: {},
  //   },
  //   tabs: [
  //     {
  //       // 类名
  //       name: '进出场统计',
  //       children: [
  //         {
  //           name: '进出场统计-tab1',
  //           children: [],
  //         },
  //         {
  //           name: '进出场统计-tab2',
  //           children: [],
  //         },
  //       ],
  //     },
  //   ],
  // };
  if(localStorage.getItem(key)){
    arr = JSON.parse(localStorage.getItem(key)!)
    console.log("arr,",arr)
  }else{
    
    return {
      schemasProps:[{}], tabsFormSchema:[{}], treeOrigin:[{}]
    }
  }
  console.log("arr:",JSON.parse(localStorage.getItem(key)!))

  let tabsArr = Object.keys(JSON.parse(JSON.stringify(arr)).class);

  // 生成大容器配置
  let bigContainer = JSON.parse(JSON.stringify(arr));
  delete bigContainer['class'];
  delete bigContainer['tabs'];
  delete bigContainer['element'];
  let schemasProps: any = Object.keys(bigContainer).map((e) => {
    return {
      defaultValue: bigContainer[e],
      field: e,
      label: e,
      component: 'Input',
      colProps: {
        span: 23,
      },
    };
  });

  schemasProps.push(
    {
      field: 'override',
      label: '覆盖属性',
      component: 'InputTextArea',
      colProps: {
        span: 23,
      },
      componentProps: {
        placeholder: `输入该属性那么上面的属性提交后不生效并且会进行覆盖（注意双引号）。示例: {"width":'',...}`,
      },
    },
    {
      defaultValue: arr['element'],
      field: 'element',
      label: '类名',
      component: 'Input',
      colProps: {
        span: 23,
      },
      componentProps: {
        disabled: true,
      },
    },
  );

  // 生成小容器
  let titleArr = tabsArr;
  for (let i = 0; i <= titleArr.length; i++) {
    const tabsKey = titleArr[i];

    // 每个标签页的属性
    let va = arr['class'];
    let schemasProps;
    if (va[tabsKey]) {
      schemasProps = Object.keys(va[tabsKey]).map((e) => {
        console.log('va[e]:', va, e);
        return {
          defaultValue: va[tabsKey][e],
          field: e,
          label: e,
          component: 'Input',
          colProps: {
            span: 23,
          },
        };
      });
    } else {
      schemasProps = [];
    }

    const schemas: FormSchema[] = [
      ...schemasProps,
      {
        field: 'override',
        label: '覆盖属性',
        component: 'InputTextArea',
        colProps: {
          span: 23,
        },
        componentProps: {
          placeholder: `输入该属性那么上面的属性提交后不生效并且会进行覆盖（注意双引号）。示例: {"width":'',...}`,
        },
      },
      {
        defaultValue: titleArr[i],
        field: 'element',
        label: '类名',
        component: 'Input',
        colProps: {
          span: 23,
        },
        componentProps: {
          disabled: true,
        },
      },
    ];



    tabsFormSchema.push({
      key: tabsKey,
      tab: tabsKey,
      forceRender: true,
      Form: useForm(Object.assign({ schemas }, baseFormConfig) as FormProps),
    });
  }

  return { schemasProps, tabsFormSchema, treeOrigin: arr['tabs'] };
};


type classType = {
  [key in string] :Record<string,string>
}
interface localstorageTabsType {
  name:string;
  route:string;
  children?:localstorageTabsType[]
}

export type ConfigType = {
  class:classType;
  tabs:localstorageTabsType[]
} & {
  element?:string;
  position?:string;
  display?:string;
  "grid-template-columns":string;
  "grid-template-rows":string;
}

/**
 * @des 读取localstorage 设置css
 */
export function convertToCSS(obj:ConfigType,key:string) {
  if(localStorage.getItem(key)){
    // @ts-ignore
    obj = JSON.parse(localStorage.getItem(key))
  }

  console.log("obj:",obj)
  // return
	let cssString = "";

	for (const key in obj.class) {
		if (Object.hasOwnProperty.call(obj.class, key)) {
			const className = ` .${obj.element} .${key} {`;
			cssString += className;

			const properties = obj.class[key];
			for (const prop in properties) {
				if (Object.hasOwnProperty.call(properties, prop)) {
					cssString += `${prop}: ${properties[prop]} !important;`;
				}
			}

			cssString += "}";
		}
	}
	const className = ` .${obj.element}  {`;
	cssString += className;

  let data = JSON.parse(JSON.stringify(obj))
	delete data["class"];
	delete data["tabs"];
	delete data["element"];

	for (const key in data) {
		cssString += `${key}: ${data[key]} !important;`;
	}
	cssString += "}";

	const styleTag = document.createElement("style") as  any ;
	styleTag.type = "text/css";

	// 添加 CSS 字符串到 <style> 标签中
	if (styleTag.styleSheet) {
		styleTag.styleSheet.cssText = cssString;
	} else {
		styleTag.appendChild(document.createTextNode(cssString));
	}
	console.log(cssString);
	document.head.appendChild(styleTag);
}


export const getTabConfig = (obj:string):ConfigType => {
  // @ts-ignore
  return JSON.stringify(JSON.parse(localStorage.getItem(obj)))
}
