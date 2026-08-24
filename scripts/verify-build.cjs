#!/usr/bin/env node
'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, '..', 'dist');

// 1) CJS build：module.exports 应为组件本身，且 .default 与 .FloatingPanel 都指向它
const mod = require(path.join(dist, 'index.js'));

assert.strictEqual(typeof mod, 'object', 'CJS module.exports 应为 forwardRef 对象');
assert.ok(mod.default === mod, 'mod.default 应 === module.exports（默认导入互操作）');
assert.ok(mod.FloatingPanel === mod, 'mod.FloatingPanel 应 === module.exports（命名导入）');
assert.strictEqual(typeof mod.render, 'function', '组件应具备 forwardRef 的 render 函数');

// 2) ES build：命名导出存在
const es = fs.readFileSync(path.join(dist, 'index.es.js'), 'utf8');
assert.match(es, /\bFloatingPanel\b/, 'ES 产物应包含 FloatingPanel 命名导出');

console.log('✓ verify-build passed: CJS default/named interop + ES export OK');
