#! /usr/bin/node

const assert = require('assert')
const fs = require('fs')
const semver = require('semver')
const path = require('path')
const repo = require('simple-git/promise')(path.join(__dirname, '..'))

const main = async () => {
  const status1 = await repo.status()
  assert(status1.files.length === 0, `\n\nGit working directory must be clean before versioning.\n\n${JSON.stringify(status1, null, 2)}`)

  const release = process.argv[2]

  const argErrorMessage = 'Only argument should be: major | minor | patch'
  assert(release, argErrorMessage)
  assert(release.match(/(major|minor|patch)/g), argErrorMessage)

  const manifest = path.join(__dirname, '../src/manifest.json')
  const pkg = path.join(__dirname, '../package.json')
  const packageLock = path.join(__dirname, '../package-lock.json')

  let nextVersion = null

  const paths = [manifest, pkg, packageLock]

  paths.forEach((p) => {
    const file = fs.readFileSync(p)
    const json = JSON.parse(file)
    const currentVersion = json.version
    if (!nextVersion) {
      nextVersion = semver.inc(currentVersion, release)
    }

    json.version = nextVersion

    console.log(`${p} - Incrementing ${currentVersion} by ${release} resulting in ${nextVersion}`)

    fs.writeFileSync(p, JSON.stringify(json, null, 2))
    fs.appendFileSync(p, '\n')
  })

  const api = path.join(__dirname, '../src/utils/api.js')
  fs.writeFileSync(api, `module.exports = 'https://sutra.newnoetic.com/api/v${semver.major(nextVersion)}'\n`)

  await repo.add('.')
  const commit1 = await repo.commit(nextVersion)
  await repo.addTag(nextVersion)
  await repo.pushTags()
  console.log(`\nBumped versions and commited/tagged\n: ${commit1.commit}).`)
}

main().then()
