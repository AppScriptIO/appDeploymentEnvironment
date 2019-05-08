const path = require('path')
const projectPath = "/project";
const resolvedModule = {
    get appDeploymentLifecyclePath() { return path.dirname( require.resolve(`@dependency/appDeploymentLifecycle/package.json`) )  }
}
const managerAppRootFolder = `${projectPath}/managerApp`,        
      externalAppRootFolder = process.env.externalAppBasePath || `${projectPath}/application`;

// try to find module in externalApp
let externalAppAppDeploymentLifecycle;
try {
    externalAppAppDeploymentLifecycle = path.dirname( require.resolve(`@dependency/appDeploymentLifecycle/package.json`, { paths: [ externalAppRootFolder ] }) )  
} catch (error) {
    // console.log(`• Cannot find appDeploymentLifecycle module in external app.`)
    externalAppAppDeploymentLifecycle = null
} 


module.exports = {
    directory: {
        projectPath,
        root:  path.resolve(`${__dirname}/../..`),
        application: {
            hostAbsolutePath: path.resolve(`${__dirname}/../..`),
            containerAbsolutePath: `${projectPath}/application`
        }
    },
    script: {
        hostMachine: [
            { // example for module path
                type: 'module',
                key: 'containerManager',
                path: './setup/node_modules/@dependency/appDeploymentManager/setup/script/bin/containerManager.js'
            },
            {
                type: 'directory',
                path: './setup/script/hostMachine' // relative to applicaiton repository root.
            }
        ],
        container: [ // entrypoint configuration map, paths are relative to external app.
            {
                key: 'buildContainerImage',
                path: `${__dirname}/../script/container/buildContainerImage`,
            },
            {
                key: 'setupOSEnvironmentContainerScript',
                path: `${__dirname}/../script/container/setupOSEnvironmentContainerScript`,
            },
            {
                key: 'sleep',
                path: `${resolvedModule.appDeploymentLifecyclePath}/container/sleep`,
            },
        ]
    },
    buildEnvironmentImage: {
        dockerComposeVersion: '1.22.0',
        dockerMachineVersion: '0.15.0'
    },
    externalApp: {
        rootFolder: externalAppRootFolder,
        entrypointFolder: `${externalAppRootFolder}/setup/script/containerManagerScript`,
        configurationFilePath: `${externalAppRootFolder}/setup/configuration/configuration.js`,
        dependency: {
            appDeploymentLifecycle: externalAppAppDeploymentLifecycle
        }
    },
    managerApp: {
        rootFolder: managerAppRootFolder,
        dependency: {
            appDeploymentLifecycle: `${managerAppRootFolder}/dependency/gitSubmodule/appDeploymentLifecycle`,
        }
    }

}
