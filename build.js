const fs = require('fs');
const cp = require('child_process');
const rimraf = require('rimraf');
const path = require('path');
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

//可执行文件目录
const binDir = path.resolve(__dirname, 'node_modules/.bin/');
console.log(`binDir:${binDir}`);

cp.execSync(`${binDir}/babel src --out-dir lib/src --ignore forBrowser.js`);
cp.execSync(`${binDir}/babel index.js --out-dir lib`);
console.log('babel finished');

//读取package.json
let packString = fs.readFileSync('package.json');
let pack = JSON.parse(packString);
delete pack.devDependencies;
delete pack.scripts;
fs.appendFileSync('./lib/package.json', JSON.stringify(pack));
console.log('copy package.json');

cp.execSync(`${binDir}/webpack`,{env:{ BUILD_ENV: 'development'}});

console.log('easyPromise.js finished');

cp.execSync(`${binDir}/webpack`,{env:{BUILD_ENV: 'production'}});

console.log('easyPromise.min.js finished');

fs.appendFileSync('./dist/README.md', '供浏览器标签引用的包');
fs.appendFileSync('./lib/README.md', '供npm安装的包');

console.log('build finished');