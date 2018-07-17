const path = require('path')
const   projectPath = "/project",
        managerAppRootFolder = `${projectPath}/appDeploymentEnvironment`,        
        externalAppRootFolder = process.env.externalAppBasePath || `${projectPath}/application`,
        externalAppAppDeploymentLifecycle = `${externalAppRootFolder}/dependency/appDeploymentLifecycle`

module.exports = {
    projectPath,
    entrypoint: { // entrypoint configuration map, paths are relative to external app.
        install: {
            path: './setup/entrypoint/install',
        },
        buildEnvironmentImage: {
            path: './setup/entrypoint/buildEnvironmentImage',
        },
        // buildContainerManager: {
        //     path: './setup/entrypoint/buildContainerManager',
        // },
        sleep: {
            path: `${externalAppAppDeploymentLifecycle}/entrypoint/sleep`,
        }
    },
    externalApp: {
        rootFolder: externalAppRootFolder,
        entrypointFolder: `${externalAppRootFolder}/setup/entrypoint`,
        configurationFilePath: `${externalAppRootFolder}/setup/configuration/configuration.js`,
        dependency: {
            appDeploymentLifecycle: externalAppAppDeploymentLifecycle
        }
    },
    managerApp: {
        rootFolder: managerAppRootFolder,
        dependency: {
            appDeploymentLifecycle: `${managerAppRootFolder}/dependency/appDeploymentLifecycle`,
        }
    },
    buildEnvironmentImage: {
        dockerComposeVersion: '1.21.2',
        dockerMachineVersion: '0.15.0'
    }
}
