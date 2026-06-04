import { build, context } from 'esbuild';
import { cpSync, existsSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = join(__dirname, 'src');
const distDir = join(__dirname, "ChillTool's 4.0.2", 'dist');

if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}

const isWatch = process.argv.includes('--watch');

const buildOptions = {
  entryPoints: [join(srcDir, 'main.js')],
  bundle: true,
  outfile: join(distDir, 'bundle.js'),
  format: 'iife',
  target: 'es2020',
  sourcemap: false,
  minify: false,
  define: {
    'process.env.NODE_ENV': '"production"'
  }
};

async function run() {
  if (isWatch) {
    const ctx = await context(buildOptions);
    await ctx.watch();
    console.log('Watching for changes...');
  } else {
    await build(buildOptions);
    // Copy bypass.js as-is (MAIN world, not bundled) - skip if already in dist
    const bypassSrc = join(__dirname, "ChillTool's 4.0.2", 'dist', 'bypass.js');
    const bypassDest = join(distDir, 'bypass.js');
    if (bypassSrc !== bypassDest && existsSync(bypassSrc)) {
      cpSync(bypassSrc, bypassDest);
    }
    console.log('Build complete → dist/bundle.js + dist/bypass.js');
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
