import { log } from 'console'
import packageJSON from '../package.json'

class Version {
  major: number
  minor: number
  patch: number

  constructor(versionString: string) {
    const [major, minor, patch] = versionString.split('.')
    this.major = Number(major)
    this.minor = Number(minor)
    this.patch = Number(patch)
  }

  increase(type: 'major' | 'minor' | 'patch' = 'patch', tick: number = 1) {
    switch (type) {
      case 'major':
        this.incMajor(tick)
        return
      case 'minor':
        this.incMinor(tick)
        return
      case 'patch':
        this.incPatch(tick)
        return
    }
  }

  incMajor(by: number = 1) {
    this.major += by
  }

  incMinor(by: number = 1) {
    this.minor += by
    if (this.minor > 9) {
      this.minor = 0
      this.incMajor()
    }
  }

  incPatch(by: number = 1) {
    this.patch += by
    if (this.patch > 9) {
      this.patch = 0
      this.incMinor()
    }
  }

  toString() {
    return `${this.major}.${this.minor}.${this.patch}`
  }
}

import { parseArgs } from 'util'
const { values } = parseArgs({
  args: Bun.argv,
  allowPositionals: true,
  options: {
    type: {
      type: 'string',
      default: 'patch',
      short: 't',
    },
    tick: {
      type: 'string',
      default: '1',
    },
  },
})

const version = new Version(packageJSON.version)

version.increase(values.type as any, Number(values.tick))

packageJSON.version = version.toString()

Bun.write('./package.json', JSON.stringify(packageJSON, null, 2))

log('new version:', version.toString())
