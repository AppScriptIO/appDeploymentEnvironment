console.log('• entrypointConfigurationPath:' + process.env.entrypointConfigurationPath)
console.log('• entrypointOption:' + process.env.entrypointOption)
process.argv = process.argv.slice(2)

import path from 'path'
const filesystem = require('fs')
const configuration = require('../setup/configuration/configuration.export.js')
const managedAppFolder = configuration.directory.managedApplicationRootFolder
const defaultEntrypointPath = path.join(managedAppFolder, `application/setup/entrypoint`)
const { spawn, spawnSync } = require('child_process')

let entrypointName;
if(process.argv[0]) {
    console.log(`Arguments passed: ${process.argv.toString()}`)
    entrypointName = process.argv.shift() // update global argv
} else {
    entrypointName = process.env.entrypointOption
}
let entrypointConfigPath = (process.env.entrypointConfigurationPath) ?
    process.env.entrypointConfigurationPath :
    path.join(defaultEntrypointPath, 'configuration.js');
const entrypointConfigList = require(entrypointConfigPath)
let entrypointConfig = entrypointConfigList[entrypointName] || null

if(entrypointConfig) {

    let modulePath
    if(entrypointConfig.file) {
        modulePath = path.join(managedAppFolder, entrypointConfig.file)
    } else {
        modulePath = path.join(defaultEntrypointPath, `${entrypointName}`) // .js file or folder module.
    }
    
    // install node_modules if not present in case a folder is being passed.
    // ISSUE - installing node_modules of and from within running module, will fail to load the newlly created moduules as node_modules path was already read by the nodejs application.
    function installModule({ currentDirectory }) { spawnSync('yarn', ["install --pure-lockfile --production=false"], { cwd: currentDirectory, shell: true, stdio:[0,1,2] }) }
    let directory;
    //check if javascript module is file or directory 
    if(filesystem.existsSync(modulePath)) {
        directory = modulePath
    } else if(filesystem.existsSync(`${modulePath}.js`)) {
        directory = modulePath.substr(0, modulePath.lastIndexOf("/"))
    }
    let isNodeModuleInstallExist = filesystem.existsSync(`${directory}/node_modules`)
    if (!isNodeModuleInstallExist) {
        installModule({ currentDirectory: directory })
    }
    
    try {
        require(modulePath)
    } catch (error) {
        throw error
    }
} else {
    console.log('Reached switch default - entrypointOption does not match any case/kind/option')
    // var docker = new Docker({socketPath: '/var/run/docker.sock'})
    // var container = docker.getContainer('4ba04235356e8f07d16f2bd2d4aa351a97d50eb3775d7043b63a29861412735a');
    // container.inspect(function (err, data) {
    //     console.log(data);
    // });
}