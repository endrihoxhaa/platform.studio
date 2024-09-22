import tsup from 'tsup'

await tsup.build({
  entry: ['src/index.ts'],
  outDir: 'dist',
  dts: true,
  format: ['esm'],
  platform: 'browser',
  external: ['react', "react-dom"],
  watch: true,
})
