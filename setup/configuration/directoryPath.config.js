/**
 * Paths to module directories in the Docker container.
 */
module.exports = [
  {
    deploymentType: 'selfManaged',
    directory: {
      containerManagerRootFolder: "/project",
      managedApplicationRootFolder: '/project'
    }
  },
  {
    deploymentType: 'containerManager',
    directory: {
      containerManagerRootFolder: "/project/appDeploymentEnvironment",
      managedApplicationRootFolder: '/project'      
    }      
  }

]
