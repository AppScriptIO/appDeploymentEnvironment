/** Transpilation entrypoint */
let style = { 
  title: '\x1b[33m\x1b[1m\x1b[7m\x1b[36m', 
  message: '\x1b[96m',
  italic: '\x1b[2m\x1b[3m',
  default: '\x1b[0m'
}
console.log(`${style.title}%s${style.default} ${style.italic}%s${style.default}`, `Container:`, `NodeJS App`)
console.log(`\t${style.italic}%s${style.default} ${style.message}%s${style.default}`, `Command:`, `${process.argv.join(' ')}`)
process.argv = process.argv.slice(2) // remove first 2 commands - "<binPath>/node", "<path>/entrypoint.js"
let nodeCommandArgument = process.argv
// Log environment variables & shell command arguments
/* shell script environmnet arguments */
console.log(`\t${style.italic}%s${style.default} ${style.message}%s${style.default}`, `env:`, `entrypointConfigurationKey = ${process.env.entrypointConfigurationKey}`)
console.log(`\t${style.italic}%s${style.default} ${style.message}%s${style.default}`, `env:`, `entrypointConfigurationPath = ${process.env.entrypointConfigurationPath}`)
console.log(`\t${style.italic}%s${style.default} ${style.message}%s${style.default}`, `env:`, `externalAppBasePath = ${process.env.externalAppBasePath}`)

const filesystem = require('fs'),
      path = require('path'),
      jsEntrypointPath = path.dirname(require.main.filename),
      configuration = require('@setup/configuration/configuration.js'),
      appDeploymentLifecycle = configuration.managerApp.dependency.appDeploymentLifecycle,
      babelJSTranspilerPath = `${appDeploymentLifecycle}/babel_javascriptTranspilation.js/`,
      { installModule } = require(`${appDeploymentLifecycle}/utilityModule/installNodeJSModule.js`),
      { addModuleResolutionPath } = require(`${appDeploymentLifecycle}/utilityModule/addModuleResolutionPath.js`)

console.log(`\x1b[2m\x1b[3m• configuration:\x1b[0m \n\t externalAppRootFolder = ${configuration.externalApp.rootFolder}`)

addModuleResolutionPath({ pathArray: [ jsEntrypointPath ] })

{ // Install main/root node_modules
  if (!filesystem.existsSync(`${__dirname}/node_modules`))
    installModule({ currentDirectory: __dirname })
}

{ // Babel install + transpilation
  if (!filesystem.existsSync( path.join(babelJSTranspilerPath, `/node_modules`) ))
    installModule({ currentDirectory: babelJSTranspilerPath })
  const babelJSCompiler = require(babelJSTranspilerPath)
  babelJSCompiler({ babelConfigurationFile: 'serverRuntime.BabelConfig.js' })
}

require('./app.js') // Run app
