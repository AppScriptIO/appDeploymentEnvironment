const moduleSystem = require('module')
const filesystem = require('fs')
const { execSync, spawn, spawnSync } = require('child_process')
const path = require('path')
const configuration = require('../../setup/configuration/configuration.export.js')
const babelJSCompiler = require(`${configuration.directory.projectContainerRootFolder}/dependency/babel_javascriptTranspilation.js/entrypoint.js`)
const nodeModuleFolderPath = __dirname + "/node_modules" 

// // add root path (app base path) to the resolved module paths.
// // Define server base path. Hackish way to make sure the path is always consistent. Base path in Nodejs is where the closest parent node_modules is located to the initiated js script.
// process.env.NODE_PATH = `${process.env.NODE_PATH || ''}:${nodeModuleFolderPath}`.replace(/(^\:+)/, '')
// console.log(`• Node additional module resolution paths: ${process.env.NODE_PATH}`)
// moduleSystem._initPaths()

// Install nodejs packages before  
function installModule({ currentDirectory }) {
  let yarnInstall = spawnSync('yarn', ["install"], { cwd: currentDirectory, shell: true, stdio:[0,1,2] });
}

let isNodeModuleExist = filesystem.existsSync(nodeModuleFolderPath)
if (!isNodeModuleExist) {
  installModule({ currentDirectory: __dirname })
  spawnSync('yarn', ["upgrade appscript"], { cwd: currentDirectory, shell: true, stdio:[0,1,2] });
}

let title;
switch (process.env.entrypointOption) {
  case 'manager':  
    title = ` ▄▄▄▄███▄▄▄▄      ▄████████ ███▄▄▄▄      ▄████████    ▄██████▄     ▄████████    ▄████████ 
    ▄██▀▀▀███▀▀▀██▄   ███    ███ ███▀▀▀██▄   ███    ███   ███    ███   ███    ███   ███    ███ 
    ███   ███   ███   ███    ███ ███   ███   ███    ███   ███    █▀    ███    █▀    ███    ███ 
    ███   ███   ███   ███    ███ ███   ███   ███    ███  ▄███         ▄███▄▄▄      ▄███▄▄▄▄██▀ 
    ███   ███   ███ ▀███████████ ███   ███ ▀███████████ ▀▀███ ████▄  ▀▀███▀▀▀     ▀▀███▀▀▀▀▀   
    ███   ███   ███   ███    ███ ███   ███   ███    ███   ███    ███   ███    █▄  ▀███████████ 
    ███   ███   ███   ███    ███ ███   ███   ███    ███   ███    ███   ███    ███   ███    ███ 
    ▀█   ███   █▀    ███    █▀   ▀█   █▀    ███    █▀    ████████▀    ██████████   ███    ███ 
                                                                                  ███    ███ `
  break;
  default:  
    title = `     _____                 _                           _     _                 
    |_   _|               | |                         | |   (_)                
      | |    _ __    ___  | |_   _ __   _   _    ___  | |_   _    ___    _ __  
      | |   | '_ \\  / __| | __| | '__| | | | |  / __| | __| | |  / _ \\  | '_ \\ 
     _| |_  | | | | \\__ \\ | |_  | |    | |_| | | (__  | |_  | | | (_) | | | | |
    |_____| |_| |_| |___/  \\__| |_|     \\__,_|  \\___|  \\__| |_|  \\___/  |_| |_|
    `
  break;
}
console.log(title + `\n• Instruction = ${process.env.entrypointOption}`)

// if(process.env.entrypointOption == 'install') {
  let isNodeModuleInstallExist = filesystem.existsSync(`${configuration.directory.projectContainerRootFolder}/application/source/containerInstallationNodejs/node_modules`)
  if (!isNodeModuleInstallExist) {
    installModule({ currentDirectory: `${configuration.directory.projectContainerRootFolder}/application/source/containerInstallationNodejs/` })
    spawnSync('yarn', ["upgrade appscript"], { cwd: currentDirectory, shell: true, stdio:[0,1,2] });
  }
// }
  
// install babel transpilation
installModule({ currentDirectory: `${configuration.directory.projectContainerRootFolder}/dependency/babel_javascriptTranspilation.js` })
babelJSCompiler({ babelConfigurationFile: 'es2015.BabelConfig.js' })

// Run app
require('./app.js')
