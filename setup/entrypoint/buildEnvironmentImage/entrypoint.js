console.log(`\x1b[95m%s\x1b[0m`,`BUILD - Environment Image.`)
process.env.SZN_DEBUG = true
import path from 'path'
import { spawn, spawnSync } from 'child_process'
import rethinkDB from 'rethinkdb'
import configuration from '../../configuration/configuration.js'
import createStaticInstanceClasses from 'appscript/module/reusableNestedUnit'
import { lastImageTagInRepository } from './utilityFunction.js'
import initializeDatabaseData from '../utilityFunction/initializeDatabaseData.js'
import { interfaceDatabaseName as databaseData } from './shellscriptDatabaseData'

process.env.dockerImageName = process.env.dockerImageName || 'myuserindocker/deployment-environment'

;(async function() {

    let connection = await rethinkDB.connect({ host: 'rethinkdb', port: 28015 })

    try {
        await initializeDatabaseData({ databaseData, connection }) // insert data after setting default values
    } catch(error) {
        throw error
    }
    
    // TODO: 
    // 1. create static instance of class with no specific node initialization implemenation.
    // 2. start transversing the node graph. 

    // Run linux commands on container image OS.
    console.log('Installing all necessary files.')
    let ShellscriptController = await createStaticInstanceClasses({
        implementationType: 'Shellscript',
        cacheName: true, 
        rethinkdbConnection: connection
    })
    // Initialize database data from files.
    let shellscriptController = await ShellscriptController.createContext({
        appBasePath: configuration.externalApp.rootFolder,
        dockerImageTag: process.env.dockerImageTag,
        dockerImageName: process.env.dockerImageName
    })
    await shellscriptController.initializeNestedUnit({
        nestedUnitKey: '0676d0b7-aa35-47fa-ac63-59fc594356eb' 
    })
    
    // https://docs.docker.com/registry/spec/api/#listing-image-tags
    // Example for base endpoint of docker registry api - https://gist.github.com/kizbitz/e59f95f7557b4bbb8bf2
    // Working example - GET https://hub.docker.com/v2/repositories/myuserindocker/deployment-environment/tags
    // client api v2 - https://github.com/joyent/node-docker-registry-client
    // lastImageTagInRepository()

    connection.close()
})()

