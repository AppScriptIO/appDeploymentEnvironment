console.log(`\x1b[33m\x1b[1m\x1b[7m\x1b[36m%s\x1b[0m \x1b[2m\x1b[3m%s\x1b[0m`, `Container:`, `NodeJS App`)

/* Entrypoint chain */
;(async ()=>{ 
    // install node_modules - this is a workaround for the module when it is loaded as a volume from a repository where it is installed in node_modules as a package. The package may not have a local node_modules as it is shared with the repositoty's root node_modules.
    await installModule({ installPath: __dirname, options: { checkIfInstalled: true } })

    // Transpilation - babelJSCompiler
    require('@dependency/javascriptTranspilation')({ babelConfigurationFile: 'serverRuntime.BabelConfig.js' })
    // Setup environment 
    await require('../setup/script/appRuntimeScript/runtimeSetupEnvironment.js').setupEnvironment()
    // Run
    require('./app.js')
})().catch(error => console.error(error)) // async wrapper


const { execSync, spawn, spawnSync } = require('child_process'),
      { constants: filesystemConstants, promises: filesystem } = require('fs'),
      path = require('path')
async function installModule({ 
    installPath,  // path of package.json.
    options = { checkIfInstalled: true } 
}) { // Install nodejs packages before  
    let nodeModulesPath = path.join(installPath, 'node_modules')
    let nodeModulesExist
    if(options.checkIfInstalled)
        nodeModulesExist = await filesystem.access(nodeModulesPath, filesystemConstants.F_OK) // check if directory exist
                                                .then(() => true).catch(error => false)
    if(!nodeModulesExist || !options.checkIfInstalled) {
        console.log(`\x1b[2m%s\x1b[0m'`, `• yarn install for folder: ${installPath}`)
        spawnSync('yarn', ["install --pure-lockfile --production=false"], { cwd: installPath, shell: true, stdio:[0,1,2] }) 
    } else {
        // skip installation
    }
}
