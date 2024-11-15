import * as esbuild from 'esbuild'
import graphqlLoaderPlugin from '@luckycatfactory/esbuild-graphql-loader/lib/index.mjs'
import aliasPlugin from 'esbuild-plugin-path-alias'
import path from 'path'

await esbuild.build({
    entryPoints: ['main.js'],
    bundle: true,
    minify: true,
    platform: 'node',
    format: 'esm',
    target: ['node20.12'],
    packages: 'external',
    sourcemap: true,
    outfile: 'build/index.js',
    plugins: [
        graphqlLoaderPlugin(),
        aliasPlugin({
            '@gql-app': path.resolve('./')
        })
    ],
})