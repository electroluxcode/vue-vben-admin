// const fs = require('fs');
import fs from "fs"
function getAllFilesInFolder(folderPath) {
     // 获取文件夹下的所有文件名
     const files = fs.readdirSync(folderPath);

     // 返回文件名数组
     return files;
}

let path2 = getAllFilesInFolder("./")

let enumString = '';

 // 遍历文件名数组，拼接枚举项
 path2.forEach((fileName, index) => {
   // 将文件名转换为枚举项格式
   const enumItem = `export * from "./${fileName}" \n`;
   enumString += ` ${enumItem}\n`;

   // 如果是最后一个文件名，则不添加逗号
   if (index ===  path2.length - 1) {
     enumString = enumString.slice(0, -1) + '\n';
   }
 });

 // 结尾
 enumString += '}';

 console.log(enumString);