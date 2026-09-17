import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const distIndex = resolve('dist/index.html')
const distFallback = resolve('dist/404.html')

if (!existsSync(distIndex)) {
  throw new Error('dist/index.html was not generated')
}

copyFileSync(distIndex, distFallback)
