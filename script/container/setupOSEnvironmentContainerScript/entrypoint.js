import { spawn, exec } from 'child_process'
import path from 'path'
import shell from 'shelljs'
import rethinkDB from 'rethinkdb'
import createStaticInstanceClasses from '@dependency/nodeRelationshipGraph'
import initializeDatabaseData from '@dependency/databaseUtility/source/initializeDatabaseData.js'
import configuration from '../../configuration/configuration.js'
import { interfaceDatabaseName as databaseData } from './shellscriptDatabaseData'

;(async function() {
    let connection = await rethinkDB.connect({ host: 'rethinkdb', port: 28015 })

    await initializeDatabaseData({ databaseData, connection })
    
    // TODO: install `apt-get  install netcat`
    // TODO: install docker cli, docker-machine tool.
    
    // Run linux commands on container image OS.
    console.log('Installing all necessary files.')
    let ShellscriptController = await createStaticInstanceClasses({
        implementationType: 'Shellscript',
        cacheName: true, 
        rethinkdbConnection: connection
    })
    // Initialize database data from files.
    let shellscriptController = await ShellscriptController.createContext({
        // - probably these are used for passing variables to the executed functions.
        appBasePath: configuration.externalApp.rootFolder,
        shellscriptPath: path.join(configuration.managerApp.dependency.appDeploymentLifecycle, 'packageShellScript')
    })
    await shellscriptController.initializeNestedUnit({ nestedUnitKey: '8762516e-26fe-444b-b72f-dce374a33266' })
    
    connection.close()
})()
