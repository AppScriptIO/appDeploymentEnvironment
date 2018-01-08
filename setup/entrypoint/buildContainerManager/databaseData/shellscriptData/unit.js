const configuration = require('../../../../configuration/configuration.export.js')

let data = [

    /**
     * run container
     */

    {
        key: '63fa6973-58c1-4ae9-b2c3-3a001d94cedd',
        label: {
            name: 'run rethinkdb for using in temporary build container'
        },
        command: 'docker-compose',
        argument: [
            `-f ${configuration.directory.containerManagerRootFolder}/application/setup/container/containerDeployment.dockerCompose.yml`,
            `--project-name appDeploymentEnvironment`,
            `up --force-recreate rethinkdb_build`
        ],
        option: {
            shell: true,
            stdio: [0, 1, 2],
            env: {}
        },
        implementation: 'spawnAsynchronous' 
    },
    {
        key: 'bcc280d1-2dd3-4e57-be19-a11821adc2d4',
        label: {
            name: 'run dockerfile build - temporary container that the build creates'
        },
        command: 'docker-compose',
        argument: [
            `-f ${configuration.directory.containerManagerRootFolder}/application/setup/container/containerDeployment.dockerCompose.yml`,
            `--project-name appDeploymentEnvironment`,
            `build dockerfileContainerManager`
        ],
        option: {
            // cwd: '/',
            shell: true,
            stdio: [0, 1, 2],
            env: {
                dockerImage: process.env.dockerImage,
                DEPLOYMENT: 'imageBuild',
                // entrypointConfigurationPath: process.env.entrypointConfigurationPath,
            }
        },
        implementation: 'spawn'
    },
    {
        key: '7aac8cd8-9399-471c-a14f-a281ea086550',
        label: {
            name: 'stop/remove container rethinkdb which was used for build'
        },
        command: 'docker-compose',
        argument: [
            `-f ${configuration.directory.containerManagerRootFolder}/application/setup/container/containerDeployment.dockerCompose.yml`,
            `--project-name appDeploymentEnvironment`,
            `stop rethinkdb_build`
        ],
        option: {
            shell: true,
            stdio: [0, 1, 2],
            env: {}
        },
        implementation: 'spawn' 
    },
    {
        key: '02ic4cd8-9399-471c-a14f-a281ea086550',
        label: {
            name: 'tag image with specific tag name.'
        },
        command: 'docker',
        argument: [
            `tag ${process.env.dockerImageName}:latest ${process.env.dockerImageName}:${process.env.dockerImageTag}`
        ],
        option: {
            shell: true,
            stdio: [0, 1, 2],
            env: {}
        },
        implementation: 'spawn' 
    },
    {
        key: '13cv6e28-9399-471c-a14f-a281ea086550',
        label: {
            name: 'docker login.'
        },
        command: 'docker',
        argument: [
            `login --username ${process.env.dockerhubUser} --password ${process.env.dockerhubPass}`
        ],
        option: {
            shell: true,
            stdio: [0, 1, 2],
            env: {}
        },
        implementation: 'spawn' 
    },
    {
        key: '93cv6e28-9399-471c-a14f-a281ea086550',
        label: {
            name: 'push image to docker hub latest.'
        },
        command: 'docker',
        argument: [
            `push ${process.env.dockerImageName}:latest`
        ],
        option: {
            shell: true,
            stdio: [0, 1, 2],
            env: {}
        },
        implementation: 'spawn' 
    },
    {
        key: '3f6e9f56-9399-471c-a14f-a281ea086550',
        label: {
            name: 'push image to docker hub tagged.'
        },
        command: 'docker',
        argument: [
            `push ${process.env.dockerImageName}:${process.env.dockerImageTag}`
        ],
        option: {
            shell: true,
            stdio: [0, 1, 2],
            env: {}
        },
        implementation: 'spawn' 
    },
];

export default {
    databaseTableName: 'unit',
    data: data
}