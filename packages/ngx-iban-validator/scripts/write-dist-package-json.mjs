// Marks each dist/ folder with its module format so Node and TypeScript read the .js and .d.ts files correctly.
import fs from "node:fs";

for (const [dir, type] of [
  ["dist/esm", "module"],
  ["dist/cjs", "commonjs"],
]) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}/package.json`, `${JSON.stringify({ type })}\n`);
}
