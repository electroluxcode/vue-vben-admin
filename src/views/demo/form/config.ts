
import {ConfigType} from "@/hook/config/UserLayout"
export const baseUserLayoutConfig:ConfigType = {
	element: "container_",
	display: "grid",
	"grid-template-columns": "1fr 1fr 1fr 1fr 1fr",
	"grid-template-rows": "1fr 1fr  1fr ",
	class: {
		// 类名
		one: {
			"grid-column": "1 / span 1",
			"grid-row": "1 / span 2",
		},
		two:{
			
		}
	},
	tabs: {
		// 类名
		one: ["测试项目", "测试"],
		two: ["测试项目", "22测试"],
	},
};