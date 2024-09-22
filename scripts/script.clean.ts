import { log } from 'console'

await Bun.$`rm -r ./build && rm -r ./api && rm -r ./node_modules && rm bun.lockb`
