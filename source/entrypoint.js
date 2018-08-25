const managerApp = require('./managerApp').run

if (require.main === module) { // if executed directly from the command-line
    console.log(managerApp)
    managerApp().catch(error => {
      console.error(error);
      process.exitCode = 1;
    })
} else { // else if required in another module then export modules.
    module.exports = {
        runManagerAppInContainerWithClientApp: require('./hostMachineClientEntrypoint').runManagerAppInContainerWithClientApp,
        managerApp
    }
}
  