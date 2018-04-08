import cpf from "child_process"
import fse from "fs-extra"

const _ = console.log
const projectPath = `${__dirname}/..`
const srcPath = `${projectPath}/src`
const distPath = `${projectPath}/dist`

const runBuild = () => {
  _("[INFO] Copy src")
  fse.copySync(srcPath, distPath)

  _("[INFO] Run build")
  const babelLog = cpf.execSync(`babel ${srcPath} --out-dir=${distPath}`).toString()
  _(babelLog)
}

runBuild()
