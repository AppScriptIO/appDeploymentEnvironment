console.log('• entrypointConfigurationPath:' + process.env.entrypointConfigurationPath)
console.log('• entrypointOption:' + process.env.entrypointOption)

import path from 'path'
const configuration = require('../../setup/configuration/configuration.export.js')
const entrypointConfigList = require('../../setup/entrypoint/configuration.js')

let entrypointName = process.env.entrypointOption
let entrypointConfig = entrypointConfigList[entrypointName] || null

if(entrypointConfig) {
    let relativeFilePath = entrypointConfig.file || `./application/setup/entrypoint/${entrypointName}.js`
    let moduleAbsolutePath = path.join(configuration.directory.projectContainerRootFolder, relativeFilePath)
    try {
        require(moduleAbsolutePath)
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