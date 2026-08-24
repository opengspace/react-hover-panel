#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'src', 'index.d.ts');
const dest = path.join(__dirname, '..', 'dist', 'index.d.ts');

if (!fs.existsSync(src)) {
  throw new Error('copy-types: 未找到 src/index.d.ts');
}

fs.copyFileSync(src, dest);
console.log('✓ copy-types: 已复制类型声明到 dist/index.d.ts');
