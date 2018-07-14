//打包脚本
//1.转为可以导入的es5代码
//2.打包出easyPromise.js
//3.打包出easyPromise.min.js  可以直接script标签引入

const cp = require('child_process');
cp.execSync('npx babel src --out-dir lib --ignore forBrowser.js');

console.log('babel finished');

cp.execSync('npx webpack',{env:{ BUILD_ENV: 'development'}});

console.log('easyPromise.js finished');

cp.execSync('npx webpack',{env:{BUILD_ENV: 'production'}});

console.log('easyPromise.min.js finished');