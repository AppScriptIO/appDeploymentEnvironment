import configuration from '../../../../configuration/configuration.js'

let data = [
    /**
     * Linux update and install
     */
    {
        key: 'c639cd53-c764-4967-b052-1e1652107923',
        label: {
            name: 'linux upgrade'
        },
        command: 'apt-get',
        argument: ['upgrade -y'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        },
        implementation: 'spawn'
    },
    {
        key: '3baa9ad3-aff2-4486-a046-0b07ed7882be',
        label: {
            name: 'linux update'
        },
        command: 'apt-get',
        argument: ['update -y'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        },
        implementation: 'spawn'        
    },
    {
        key: 'e971b884-1b33-4044-9c93-162ee145b807',
        label: {
            name: 'linux update fix-missing'
        },
        command: 'apt-get',
        argument: ['update -y --fix-missing'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'spawn'        
    },

    /** 
     * Installation of packages
     */ 
    { 
        key: '16181bdc-16f2-4fb3-af1f-4fe301ab6a18',
        label: {
            name: 'Run this command to download the latest version of Docker Compose:', 
        },
        command: 'curl',
        argument: [`-L https://github.com/docker/compose/releases/download/${configuration.buildEnvironmentImage.dockerComposeVersion}/docker-compose-\`uname -s\`-\`uname -m\` -o /usr/local/bin/docker-compose`],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        },
        implementation: 'spawn'
    },
    {
        key: '1a4c633a-24a0-4255-834f-0181a6ce48f0',
        label: {
            name: 'Apply executable permissions to the binary', 
        },
        command: 'chmod',
        argument: ['+x /usr/local/bin/docker-compose;'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        },
        implementation: 'spawn'
    },
    {
        key: '19f404a4-d0f6-41a5-9b66-0e5136c76ddb',
        label: {
            name: 'docker-compose version'
        },
        command: 'docker-compose',
        argument: ['--version'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        },
        implementation: 'spawn'
    },
    {
        key: '5bd9f5e6-f53f-48eb-8411-7bbe442b40c8',
        label: {
            name: 'install apt-utils'
        },
        command: 'apt-get',
        argument: ['install apt-utils -y'], // use --no-install-recommends (Doesn't WORK) to prevent errors
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'spawn'        
    },
    {
        key: '4d97a40d-d891-46ef-8c30-b7c6b2b273dd',
        label: {
            name: 'Install wget'
        },
        command: 'apt-get',
        argument: ['install wget -y'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'spawn'        
    },
    {
        key: '4214796e-97cc-46d6-84a4-e7004fe1e90f',
        label: {
            name: 'Install curl'
        },
        command: 'apt-get',
        argument: ['install curl -y'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'spawn'        
    },
    {
        key: 'abffa7d2-100f-4283-b03c-42f9c4a806a7',
        label: {
            name: 'Install nano'
        },
        command: 'apt-get',
        argument: ['install nano -y'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'spawn'        
    },
    {
        key: '837f4b32-8884-4112-8760-77ad69a7af42',
        label: {
            name: 'Install vim'
        },
        command: 'apt-get',
        argument: ['install vim -y'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'spawn'        
    },
    {
        key: '9945d6d5-1f51-4ee0-8183-bbbb19b6ca80',
        label: {
            name: 'Install zip & unzip'
        },
        command: 'apt-get',
        argument: ['install zip unzip -y'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'spawn'        
    },

    {
        key: 'aef9a3c7-b9a8-4485-8786-41f7daeaacfb',
        label: {
            name: 'Install git'
        },
        filename: 'git.installation.sh',
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'file'
    },
    {
        key: '7da4e483-2c3b-49c6-9b99-baa6bc7d0ab6',
        label: {
            name: 'Install yarn'
        },
        filename: 'yarn.installation.sh',
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'file'        
    },
    {
        key: '0bf7e089-8eeb-430e-aa08-e15f44ab8208',
        label: {
            name: 'Install bower'
        },
        filename: 'bower.installation.sh',
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'file'        
    },
    {
        key: 'a121a83e-7022-4021-8b25-04669964a126',
        label: {
            name: 'Install gulp'
        },
        filename: 'gulp.installation.sh',
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'file'        
    },
    {
        key: '82764a24-022c-4d8b-9fd5-e40d68e0bce0',
        label: {
            name: 'Install rsync'
        },
        filename: 'rsync.installation.sh',
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'file'        
    },
    {
        key: '87319ca8-c3e5-4d41-bd79-df3031736c96',
        label: {
            name: 'Install jspm'
        },
        filename: 'jspm.installation.sh',
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'file'        
    },
    {
        key: '0529b2ab-3a9f-4a79-b784-9ff451c8b8be',
        label: {
            name: 'Install composer'
        },
        filename: 'composer.installation.sh',
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'file'        
    },

    /** 
     * Installation of nodejs npm packages
     */ 
    {
        key: '3722377d-72c6-4d29-b966-dafb844fe795',
        label: {
            name: 'Install Yeoman'
        },
        command: 'npm',
        argument: ['install -g yo generator-generator'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'spawn'        
    },
    {
        key: 'd59d1b82-a886-4b20-a06a-e8b03d377236',
        label: {
            name: 'prevent error permission denied when using Yeoman `yo` command'
        },
        command: 'chmod',
        argument: ['g+rwx /root'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        },
        implementation: 'spawn'        
    },
    {
        key: '4fdf7070-a91c-47e2-952b-3f7a8e0609fe',
        label: {
            name: 'nodmod - live server reloading'
        },
        command: 'npm',
        argument: ['install -g nodemon'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        },
        implementation: 'spawn'        
    },
    {
        key: '57b04fad-829b-4f82-9d60-67fddcf197a0',
        label: {
            name: 'babel'
        },
        command: 'npm',
        argument: ['install -g babel-cli babel-register'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        },
        implementation: 'spawn'        
    },

    /*
     * Docker installation
     */
    { // https://docs.docker.com/engine/installation/linux/docker-ce/debian/#set-up-the-repository
        key: '7e5e95f8-ba76-460d-8063-8a33ad13ede6',
        label: {
            name: 'Docker install: Install packages to allow apt to use a repository over HTTPS', 
        },
        command: 'apt-get',
        argument: ['install -y apt-transport-https ca-certificates curl gnupg2 software-properties-common'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        },
        implementation: 'spawn'
    },
    { 
        key: '21fbd3e6-065c-432c-8a51-485ad9b3cc6e',
        label: {
            name: 'Docker install: Add Docker’s official GPG key', 
        },
        command: 'curl',
        argument: ['-fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg | apt-key add -'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        },
        implementation: 'spawn'
    },
    { 
        key: '6cf9256b-8d3b-44b6-b555-c3861f4efd56',
        label: {
            name: 'Docker install: add stable repository', 
        },
        command: 'add-apt-repository',
        argument: ['"deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") $(lsb_release -cs) stable"'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        },
        implementation: 'spawn'
    },
    { 
        key: 'a3d03a70-c0ba-4350-95f7-41b7c84e7cec',
        label: {
            name: 'Docker install: Update the apt package index', 
        },
        command: 'apt-get',
        argument: ['update'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        },
        implementation: 'spawn'
    },
    { 
        key: '973db5dd-3737-44c1-aaaf-848db94097af',
        label: {
            name: 'Docker install: Install the latest version of Docker CE', 
        },
        command: 'apt-get',
        argument: ['install -y docker-ce'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        },
        implementation: 'spawn'
    },
    { 
        key: '5ed83cbf-9c98-426a-bee7-0a7a65e9e21b',
        label: {
            name: 'Docker install: verify installation', 
        },
        command: 'docker',
        argument: ['-v'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        },
        implementation: 'spawn'
    },

    /*
     * Docker machine command line tool installation
     */ 
    {
        key: '5d9b7d5c-d736-4850-9865-0770dddf4901',
        label: {
            name: 'Docker machine install: curl', 
        },
        command: 'curl',
        argument: [`-L https://github.com/docker/machine/releases/download/v${configuration.buildEnvironmentImage.dockerMachineVersion}/docker-machine-\`uname -s\`-\`uname -m\` >/tmp/docker-machine`],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        },
        implementation: 'spawn'
    },
    {
        key: '0e74d0ca-2c41-41e3-b555-bcbef537ee24',
        label: {
            name: 'Docker machine install: chmod', 
        },
        command: 'chmod',
        argument: ['+x /tmp/docker-machine'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        },
        implementation: 'spawn'
    },
    {
        key: '61aec6d6-49dd-4d2c-9442-417654233956',
        label: {
            name: 'Docker machine install: cp', 
        },
        command: 'cp',
        argument: ['/tmp/docker-machine /usr/local/bin/docker-machine'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        },
        implementation: 'spawn'
    },
    {
        key: 'd5c70eec-04a2-4781-8fd5-2b95cc783123',
        label: {
            name: 'Docker machine install: Verify installation', 
        },
        command: 'docker-machine',
        argument: ['-v'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        },
        implementation: 'spawn'
    },

];

export default {
    databaseTableName: 'unit',
    data: data
}