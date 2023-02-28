import generatePkgJson from 'rollup-plugin-generate-package-json'
import { getPkgJson, resolvePkgPath, getRollupPlugins } from './utils'

// 从react包的package.json中获取name和module字段
const { name, module } = getPkgJson('react')
// react包的路径
const reactPath = resolvePkgPath(name)
// react包产物的路径
const reactDistPath = resolvePkgPath(name, true)

export default [
  // react
  {
    input: `${reactPath}/${module}`,
    output: {
      file: `${reactDistPath}/index.js`,
      name: 'index.js',
      format: 'umd'
    },
    plugins: [
      ...getRollupPlugins(),
      generatePkgJson({
        inputFolder: reactPath,
        outputFolder: reactDistPath,
        baseContents: ({ name, description, version }) => ({
          name,
          description,
          version,
          main: 'index.js'
        })
      })
    ]
  },
  // jsx-runtime
  {
    input: `${reactPath}/src/jsx.ts`,
    output: [
      // jsx-runtime
      {
        file: `${reactDistPath}/jsx-runtime.js`,
        name: 'jsx-runtime.js',
        format: 'umd'
      },
      // jsx-dev-runtime
      {
        file: `${reactDistPath}/jsx-dev-runtime.js`,
        name: 'jsx-dev-runtime.js',
        format: 'umd'
      }
    ],
    plugins: getRollupPlugins()
  }
]
