import { spawn, exec } from 'child_process'
import path from 'path'
import shell from 'shelljs'
import rethinkDB from 'rethinkdb'
let createStaticInstanceClasses = require('appscript/module/reusableNestedUnit')
import initializeDatabaseData from './databaseData/initializeDatabaseData.js'
import configurationMain from '../../configuration/configuration.js'
const configuration = require('../../configuration/configuration.export.js')
const projectFolder = configuration.directory.projectContainerRootFolder

;(async function() {
    let connection = await rethinkDB.connect({ host: 'rethinkdb', port: 28015 })

    await initializeDatabaseData(connection)
    
    // Run linux commands on container image OS.
    console.log('Installing all necessary files.')
    let ShellscriptController = await createStaticInstanceClasses({
        implementationType: 'Shellscript',
        cacheName: true, 
        rethinkdbConnection: connection
    })
    // Initialize database data from files.
    let shellscriptController = await ShellscriptController.createContext({ 
        appBasePath: configurationMain.appBasePath,
        shellscriptPath: path.join(projectFolder, 'dependency/appDeploymentLifecycle/packageShellScript')
    })
    await shellscriptController.initializeNestedUnit({ nestedUnitKey: '8762516e-26fe-444b-b72f-dce374a33266' })
    
    connection.close()
})()
