let title;
if(process.env.is_managerContainer) {
    title = ` ▄▄▄▄███▄▄▄▄      ▄████████ ███▄▄▄▄      ▄████████    ▄██████▄     ▄████████    ▄████████ 
    ▄██▀▀▀███▀▀▀██▄   ███    ███ ███▀▀▀██▄   ███    ███   ███    ███   ███    ███   ███    ███ 
    ███   ███   ███   ███    ███ ███   ███   ███    ███   ███    █▀    ███    █▀    ███    ███ 
    ███   ███   ███   ███    ███ ███   ███   ███    ███  ▄███         ▄███▄▄▄      ▄███▄▄▄▄██▀ 
    ███   ███   ███ ▀███████████ ███   ███ ▀███████████ ▀▀███ ████▄  ▀▀███▀▀▀     ▀▀███▀▀▀▀▀   
    ███   ███   ███   ███    ███ ███   ███   ███    ███   ███    ███   ███    █▄  ▀███████████ 
    ███   ███   ███   ███    ███ ███   ███   ███    ███   ███    ███   ███    ███   ███    ███ 
    ▀█   ███   █▀    ███    █▀   ▀█   █▀    ███    █▀    ████████▀    ██████████   ███    ███ 
                                                                                  ███    ███ `
  } else {
    title = `     _____                 _                           _     _                 
    |_   _|               | |                         | |   (_)                
      | |    _ __    ___  | |_   _ __   _   _    ___  | |_   _    ___    _ __  
      | |   | '_ \\  / __| | __| | '__| | | | |  / __| | __| | |  / _ \\  | '_ \\ 
     _| |_  | | | | \\__ \\ | |_  | |    | |_| | | (__  | |_  | | | (_) | | | | |
    |_____| |_| |_| |___/  \\__| |_|     \\__,_|  \\___|  \\__| |_|  \\___/  |_| |_|`
}
console.log(title + `\n• Instruction = ${process.env.entrypointOption}`)

const moduleSystem = require('module')
const filesystem = require('fs')
const path = require('path')
const { execSync, spawn, spawnSync } = require('child_process')
const configuration = require('../setup/configuration/configuration.export.js')
const projectFolder = configuration.directory.projectContainerRootFolder
// Install nodejs packages before  
function installModule({ currentDirectory }) { spawnSync('yarn', ["install --pure-lockfile --production=false"], { cwd: currentDirectory, shell: true, stdio:[0,1,2] }) }

// IMPORTANT WORKING - add root path (app base path) to the resolved module paths.
// Define server base path. Hackish way to make sure the path is always consistent. Base path in Nodejs is where the closest parent node_modules is located to the initiated js script.
process.env.NODE_PATH = `${process.env.NODE_PATH || ''}:${__dirname}/node_modules`.replace(/(^\:+)/, '')
console.log(`• Node additional module resolution paths: ${process.env.NODE_PATH}`)
moduleSystem._initPaths()

{
  let directory = __dirname
  let isNodeModuleExist = filesystem.existsSync(`${directory}/node_modules`)
  if (!isNodeModuleExist) {
    installModule({ currentDirectory: __dirname })
    // spawnSync('yarn', ["upgrade appscript"], { cwd: directory, shell: true, stdio:[0,1,2] });
  }
}

// Important ISSUE - if the module being imported/required needs to install node_modules if will fail to read the installed modules in case it was installed from a js file inside the module or in nested folders, where the resolution logarithm checks the higher parent folders for node_modules folder.
// {
//   let directory = `${projectFolder}/application/setup/entrypoint/install`
//   let isNodeModuleInstallExist = filesystem.existsSync(`${directory}/node_modules`)
//   if (!isNodeModuleInstallExist) {
//     installModule({ currentDirectory: directory })
//   }
// }
  
{ // install babel transpilation
  let directory = `${projectFolder}/dependency/appDeploymentLifecycle/babel_javascriptTranspilation.js/`
  const babelJSCompiler = require(directory)
  installModule({ currentDirectory: directory })
  babelJSCompiler({ babelConfigurationFile: 'es2015.BabelConfig.js' })
}

// Run app
require('./app.js')
