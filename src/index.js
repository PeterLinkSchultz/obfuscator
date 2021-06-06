import { parse, VariableDeclarator } from 'esprima'
import { generate } from 'escodegen'

import transform from "./transform/transform-block";

const result = parse("var x = 3; function y() { const v = 34; x = 4; if (v === 33) { x = 2; } const d = { l: 1, x: { s: 1, z: { d: 3 } } }; d.x.z.d = 4; d.l = 1; d['s'] = 4;  const ad = d.l; const ds = () => { const l = 34; x = 5; }; return v; }; y()")

console.debug(generate(result));
// transform(result.body)
console.debug(result)
console.debug(transform(result.body))

console.debug(generate(result))