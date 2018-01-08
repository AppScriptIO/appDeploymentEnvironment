module.exports = {
    install: {
        file: './application/setup/entrypoint/install',
    },
    buildEnvironmentImage: {
        file: './application/setup/entrypoint/buildEnvironmentImage',
    },
    buildContainerManager: {
        file: './application/setup/entrypoint/buildContainerManager',
    },
    run: {
        file: './application/setup/entrypoint/run',
    }
}