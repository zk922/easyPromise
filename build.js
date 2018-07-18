const fs = require('fs');
const cp = require('child_process');
const rimraf = require('rimraf');
//打包脚本
//1.转为可以导入的es5代码
//2.打包出easyPromise.js
//3.打包出easyPromise.min.js  可以直接script标签引入
if(fs.existsSync('dist')){
  rimraf.sync('dist');
  console.log('dist removed');
}
if(fs.existsSync('lib')){
  rimraf.sync('lib');
  console.log('lib removed');
}

cp.execSync('npx babel src --out-dir lib/src --ignore forBrowser.js');
cp.execSync('npx babel index.js --out-dir lib');
console.log('babel finished');

//读取package.json
let packString = fs.readFileSync('package.json');
let pack = JSON.parse(packString);
delete pack.devDependencies;
fs.appendFileSync('./lib/package.json', JSON.stringify(pack));
console.log('copy package.json');

cp.execSync('npx webpack',{env:{ BUILD_ENV: 'development'}});

console.log('easyPromise.js finished');

cp.execSync('npx webpack',{env:{BUILD_ENV: 'production'}});

console.log('easyPromise.min.js finished');

fs.appendFileSync('./dist/README.md', '供浏览器标签引用的包');
fs.appendFileSync('./lib/README.md', '供npm安装的包');

console.log('build finished');