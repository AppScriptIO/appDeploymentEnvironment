import path from 'path'
import assert from 'assert'
import filesystem from 'fs'
import { spawn, spawnSync } from 'child_process'
import configuration from '../setup/configuration/configuration.js'
const   appDeploymentLifecycle = configuration.managerApp.dependency.appDeploymentLifecycle,
        { installModule } = require(`${appDeploymentLifecycle}/utilityModule/installNodeJSModule.js`)

// Set entrypoint configuration path
let entrypointConfigList,
    entrypointConfigurationKey = process.env.entrypointConfigurationKey, 
    absolutePath;

// assert entrypoint env variables exist & entrypoint configuration objects/options exist.
console.assert(entrypointConfigurationKey, '\x1b[41m%s\x1b[0m', '❌ entrypointConfigurationKey must be set.')
console.assert(filesystem.existsSync(configuration.externalApp.configurationFilePath), '\x1b[41m%s\x1b[0m', `❌ Configuration file doesn't exist in ${configuration.externalApp.configurationFilePath}`)
// load entrypoint configuration (entrypoint key - entrypoint path map)
entrypointConfigList = (process.env.entrypointConfigurationPath) ? 
    require(process.env.entrypointConfigurationPath)['entrypoint'] :
    require(configuration.externalApp.configurationFilePath)['entrypoint'];
console.assert(entrypointConfigList, '\x1b[41m%s\x1b[0m', `❌ "entrypoint" option in externalApp configuration must exist.`)

// get specific entrypoint configuration option
let entrypointConfig = entrypointConfigList[entrypointConfigurationKey]

if(entrypointConfig) {

    // Create entrypoint module path
    let entrypointModulePath // entrypoint module path
    if(entrypointConfig['path']) {
        // check if is relative then build path.
        entrypointModulePath = (!path.isAbsolute(entrypointConfig['path'])) ? 
            path.join(configuration.externalApp.rootFolder, entrypointConfig['path']) : 
            entrypointConfig['path'];
    } else {
        // default entrypoint file location if no file path present in configuration file.
        entrypointModulePath = path.join(configuration.externalApp.entrypointFolder, `${entrypointConfigurationKey}`) // .js file or folder module.
    }
    
    // install node_modules for entrypoint module if not present in case a folder is being passed.
    // ISSUE - installing node_modules of and from within running module, will fail to load the newlly created moduules as node_modules path was already read by the nodejs application.
    let directory;
    // Check if javascript module is a module file or directory module.
    if(filesystem.existsSync(entrypointModulePath) && filesystem.lstatSync(entrypointModulePath).isDirectory()) {
        directory = entrypointModulePath
    } else if(filesystem.existsSync(`${entrypointModulePath}.js`) || filesystem.existsSync(entrypointModulePath) && filesystem.lstatSync(entrypointModulePath).isFile()) {
        directory = entrypointModulePath.substr(0, entrypointModulePath.lastIndexOf("/")) // get directory path from filepath.
    }
    let isNodeModuleInstallExist = filesystem.existsSync(`${directory}/node_modules`)
    if (!isNodeModuleInstallExist) {
        installModule({ currentDirectory: directory }) // install modules
    }
    
    // run entrypoint module.
    try {
        console.log('\x1b[45m%s\x1b[0m \x1b[2m\x1b[3m%s\x1b[0m', `Module:`, `Running NodeJS entrypoint module`)
        console.log(`\t\x1b[2m\x1b[3m%s\x1b[0m \x1b[95m%s\x1b[0m`, `File path:`, `${entrypointModulePath}`)
        require(entrypointModulePath)
    } catch (error) {
        throw error
    }

} else {
    console.log(`Error - Reached switch default as entrypointConfigurationKey "${entrypointConfigurationKey}" does not match any case/kind/option`)
    console.log(entrypointConfigList)
}