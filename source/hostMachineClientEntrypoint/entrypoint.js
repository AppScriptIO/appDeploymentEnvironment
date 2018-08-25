import { spawn, spawnSync } from 'child_process'
import operatingSystem from 'os'
import path from 'path'

export function runManagerAppInContainerWithClientApp({
    applicationHostPath,
    managerAppHostPath
}) {

    let image = 'node:latest',
        processCommand = 'docker',
        commandArgument = process.argv.slice(3), // remove first 2 commands - "<binPath>/node", "<path>/entrypoint.js" and the third host machine script name "containerManager"
        containerCommandCase1 = `node /project/application/setup/node_modules/@dependency/appDeploymentEnvironment/ ${commandArgument.join(' ')}`,
        containerCommandCase2 = `node /project/application/node_modules/@dependency/appDeploymentEnvironment/ ${commandArgument.join(' ')}`,
        containerBashCommand = `bash -c "${containerCommandCase1} || ${containerCommandCase2}"`,
        containerPrefix = 'managerApp'
    
    let processArg = [
        `run`,
        `--rm`, // automatically remove after container exists.
        `--volume ${applicationHostPath}:/project/application`,
        // `--volume ${managerAppHostPath}:/project/managerApp`,
        `--volume /var/run/docker.sock:/var/run/docker.sock`,
        `--volume ${operatingSystem.homedir()}/.ssh:/project/.ssh`,
        `--env hostPath=${applicationHostPath}`,
        `--env sshUsername=${operatingSystem.userInfo().username}`,
        `--name ${containerPrefix}`,
        `${image}`,
        `${containerBashCommand}`
    ]
    
    console.log(
        `%s \n %s \n %s`,
        `\x1b[3m\x1b[2m > ${processCommand} ${processArg.join(' ')}\x1b[0m`,
        `\t\x1b[3m\x1b[2mimage:\x1b[0m ${image}`,
        `\t\x1b[3m\x1b[2mcommand:\x1b[0m ${containerBashCommand}`
    )    
    
    let cp = spawn(processCommand, processArg, { detached: false, shell: true, stdio: [0,1,2] })
    cp.on('error', function( err ){ throw err })
    cp.unref() // prevent parent from waiting to child process and un reference child from parent's event loop.
    console.groupEnd()
}    
