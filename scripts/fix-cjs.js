#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'dist', 'index.js');
let code = fs.readFileSync(file, 'utf8');

// 匹配结尾的 exports.FloatingPanel=<var>;
const match = code.match(/\bexports\.FloatingPanel\s*=\s*([A-Za-z_$][\w$]*)\s*;?\s*$/m);
if (!match) {
  throw new Error('fix-cjs: 未找到 CJS FloatingPanel 导出，请检查构建产物');
}

const varName = match[1];
const replacement =
  `module.exports=${varName};` +
  `module.exports.default=${varName};` +
  `module.exports.FloatingPanel=${varName};`;

code = code.replace(match[0], replacement);
fs.writeFileSync(file, code);
console.log(`✓ fix-cjs: 已将 CJS 导出归一化到变量 ${varName}`);
