import packageJSON from '../package.json'

await Bun.$`gh release create v${packageJSON.version} --generate-notes`