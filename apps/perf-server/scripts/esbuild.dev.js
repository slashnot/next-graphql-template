import * as esbuild from 'esbuild'
import graphqlLoaderPlugin from '@luckycatfactory/esbuild-graphql-loader/lib/index.mjs'
import aliasPlugin from 'esbuild-plugin-path-alias'
import path from 'path'

const ctx = await esbuild.context({
    entryPoints: ['main.js'],
    bundle: true,
    platform: 'node',
    format: 'esm',
    target: ['node20.12'],
    packages: 'external',
    outfile: 'build/index.js',
    plugins: [
        graphqlLoaderPlugin(),
        aliasPlugin({
            '@gql-app': path.resolve('./')
        })
    ],
})

await ctx.watch()
console.log('watching...')