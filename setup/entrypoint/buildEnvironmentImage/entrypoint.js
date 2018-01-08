console.log(`BUILD - Environment Image.`)

process.env.SZN_DEBUG = true
import path from 'path'
const { spawn, spawnSync } = require('child_process')
import rethinkDB from 'rethinkdb'
import configuration from '../../configuration/configuration.js'
let createStaticInstanceClasses = require('appscript/module/reusableNestedUnit')
import { lastImageTagInRepository } from './utilityFunction.js'

process.env.dockerImageName = process.env.dockerImageName || 'myuserindocker/deployment-environment'

;(async function() {

    const initializeDatabaseData = require('./databaseData/initializeDatabaseData.js') // insert data after setting default values
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
        appBasePath: configuration.appBasePath, 
        dockerImageTag: process.env.dockerImageTag,
        dockerImageName: process.env.dockerImageName
    })
    await shellscriptController.initializeNestedUnit({ nestedUnitKey: '0676d0b7-aa35-47fa-ac63-59fc594356eb' })
    
    // https://docs.docker.com/registry/spec/api/#listing-image-tags
    // Example for base endpoint of docker registry api - https://gist.github.com/kizbitz/e59f95f7557b4bbb8bf2
    // Working example - GET https://hub.docker.com/v2/repositories/myuserindocker/deployment-environment/tags
    // client api v2 - https://github.com/joyent/node-docker-registry-client
    // lastImageTagInRepository()

    connection.close()
})()

