import tsup from 'tsup'

await tsup.build({
  entry: ['src/index.ts'],
  outDir: 'dist',
  dts: true,
  format: ['esm'],
  platform: 'neutral',
  watch: true,
  external: ['react', "reflect-metadata", "platform"],
})
