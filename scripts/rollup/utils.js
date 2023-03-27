import path from 'path'
import fs from 'fs'
import ts from 'rollup-plugin-typescript2'
import cjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'

// 获取包的路径
const pakPath = path.resolve(__dirname, '../../packages')
// 获取dist的路径
const distPath = path.resolve(__dirname, '../../dist/node_modules')

export function resolvePkgPath(pkgName, isDist = false) {
  // 判断是否是dist环境
  if (isDist) {
    return `${distPath}/${pkgName}`
  }
  return `${pakPath}/${pkgName}`
}

export function getPkgJson(pkgName) {
  // 获取传入包名的package.json文件
  const path = `${resolvePkgPath(pkgName)}/package.json`
  // 读取文件内容
  const str = fs.readFileSync(path, { encoding: 'utf-8' })
  // 返回解析后的json对象
  return JSON.parse(str)
}

export function getRollupPlugins({
  alias = { __DEV__: true },
  typescript = {}
} = {}) {
  return [cjs(), ts(typescript)]
}
