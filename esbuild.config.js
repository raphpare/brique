const pkg = require('./package.json');
const esbuild = require('esbuild');
config = [
    {
        outfile: pkg.main,
        format: 'cjs',
    },
    {
        outfile: pkg.module,
        format: 'esm'
    }
]

const watchChange = process.argv.slice(2).includes('--watch');

function build (watchChange) {
    config.forEach(c => {
        esbuild.build({
            entryPoints: ['./src/index.ts'],
            bundle: true,
            minify: true,
            platform: 'node',
            sourcemap: true,
            target: 'es6',
            ...c,
            watch: watchChange,
        }).then((r) => {
            if (!watchChange) return;
            console.clear();
            console.log('\x1b[32m%s\x1b[0m', 'esbuild watch start');
        }).catch((e) => {
            console.error('esbuild error', e);
            process.exit(1);
        });
    });
}
build(watchChange);

