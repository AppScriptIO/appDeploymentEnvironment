module.exports = {
    runManagerAppInContainerWithClientApp: require('./hostMachineClientEntrypoint').runManagerAppInContainerWithClientApp,
    managerApp: function() { require('./managerApp') } // export a js script, that is executed on require.
}