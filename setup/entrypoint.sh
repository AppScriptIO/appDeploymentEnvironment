#!/usr/bin/env bash
# For managing the the development, build, & testing of this project.
# USAGE: 
# • ./entrypoint.sh [build|run] entrypointConfigurationPath=./entrypoint/configuration.js entrypointConfigurationKey=[run | install | build | buildContainerManager/buildEnvironmentImage ] dockerImageTag=X dockerhubUser=x dockerhubPass=x [dockerImageName=x]

shellsciptFilePath="${0}"
message_prefix="\e[3m\e[2m•[entrypoint.sh shell script]:\e[0m\n"
message_noCommand="No command argument passed. Please choose either \"run\" or \"build\""
message_title="Shellscript:"; 
echo -e "\e[33m\e[1m\e[7m${message_title}\e[0m"
echo -e "\e[2m\e[3m\tFile path (relative to execution):\e[0m \e[33m${shellsciptFilePath}\e[0m"

hostOSUsername=$(whoami)
currentScriptFilePath=$(dirname "$0") # currentScriptFilePath - path of this shell script, relative to where shell was executed from.
applicationHostPath="`pwd`/$currentScriptFilePath/.." # applicationHostPath - The path of the host machine that is accesible from inside the virtual container. will be used when calling docker-compose from inside 'manager' container to point to the host VM path rather than trying to mount from manager container. as mounting volumes from other container causes issues.
dockerComposeFilePath="${currentScriptFilePath}/container/containerDeployment.dockerCompose.yml"
echo -e "${message_prefix} Application host path inside container: $applicationHostPath"

build() {
    echo -e "${message_prefix}\e[33mƒ build\e[0m"

    # pull previously built image
    # docker-compose -f $dockerComposeFilePath pull containerDeploymentManagement
    # docker pull myuserindocker/deployment-environment:latest

    # Check if docker image exists
    # dockerImage=myuserindocker/deployment-environment:latest;
    # if [[ "$(docker images -q $dockerImage 2> /dev/null)" == "" ]]; then 
    #     dockerImage=node:latest
    # fi; 
    # export dockerImage;
    # echo -e "${message_prefix} dockerImage=$dockerImage";

    export applicationHostPath;

    title="> docker-compose up";
    echo -e "\n\e[33m\e[1m\e[7m${title}\e[0m"
    serviceName="containerManager_run"
    projectName="appDeploymentEnvironment"
    echo -e "\t\e[3m\e[2myml file path:\e[0m \e[33m${dockerComposeFilePath}\e[0m"
    echo -e "\t\e[3m\e[2mService name:\e[0m \e[33m${serviceName}\e[0m"
    echo -e "\t\e[3m\e[2mService name:\e[0m \e[33m${projectName}\e[0m"
    # run container manager
    docker-compose \
        -f ${dockerComposeFilePath} \
        --project-name $projectName \
        up --force-recreate --no-build --abort-on-container-exit $serviceName;

    title="> docker-compose down"
    echo -e "\n\e[33m\e[1m\e[7m${title}\e[0m \e[3m\e[2m(stop  running containers) output\e[0m"
    echo -e "\t\e[3m\e[2myml file path:\e[0m \e[33m${dockerComposeFilePath}\e[0m"
    echo -e "\t\e[3m\e[2mService name:\e[0m \e[33m${projectName}\e[0m"
    # stop and remove containers related to project name.
    docker-compose \
        -f ${dockerComposeFilePath} \
        --project-name $projectName \
        down; 
}

run() { # for development to check the image or try to install packages on it before writting it to the code of the build.
    echo -e "${message_prefix}\e[33mƒ run\e[0m"

    echo -e "\e[3m\e[2m > docker run\e[0m"
    image="myuserindocker/deployment-environment:latest"
    command="node /project/application/source/entrypoint.js run"
    echo -e "\t\e[3m\e[2mimage:\e[0m myuserindocker/deployment-environment:latest"
    echo -e "\t\e[3m\e[2mcommand:\e[0m node /project/application/source/entrypoint.js run"
    docker run \
        --volume /var/run/docker.sock:/var/run/docker.sock \
        --volume $applicationHostPath:/project/application \
        --volume $applicationHostPath:/project/appDeploymentEnvironment \
        --env "hostPath=$applicationHostPath" \
        --env "entrypointConfigurationPath=/project/application/setup/entrypoint/configuration.js" \
        $image \
        $command
}

### Export command arguments
if [[ $# -eq 0 ]] ; then # if no arguments supplied, fallback to default command.
    echo -e "\n${message_prefix}\e[97m\e[41m${message_noCommand}\e[0m"
    exit 1
else # Export arguments & execute first command.
    echo -e "${message_prefix} Exporting arguments' values."

    for ARGUMENT in "${@:2}"; do # iterate over arguments, skipping the first.
        KEY=$(echo $ARGUMENT | cut -f1 -d=); VALUE=$(echo $ARGUMENT | cut -f2 -d=);
        case "$KEY" in

                entrypointConfigurationKey)         entrypointConfigurationKey=${VALUE}; export entrypointConfigurationKey ;;
                entrypointConfigurationPath)     entrypointConfigurationPath=${VALUE}; export entrypointConfigurationPath ;;
                externalAppBasePath)     externalAppBasePath=${VALUE}; export externalAppBasePath ;;
                dockerImageTag)         dockerImageTag=${VALUE}; export dockerImageTag ;;
                dockerImageTag_environment)         dockerImageTag_environment=${VALUE}; export dockerImageTag_environment ;;
                dockerImageTag_manager)         dockerImageTag_manager=${VALUE}; export dockerImageTag_manager ;;
                dockerhubUser)         dockerhubUser=${VALUE}; export dockerhubUser ;;
                dockerhubPass)         dockerhubPass=${VALUE}; export dockerhubPass ;;
                dockerImageName)         dockerImageName=${VALUE}; export dockerImageName ;;
                *)
        esac
    done

    if [[ $1 != *"="* ]]; then # if first argument is a command, rather than a key-value pair. e.g. ./setup/entrypoint.sh <command> <key>=<value> <key>=<value>
        echo -e "${message_prefix} Command as argument passed, executing passed command as function."
        # run first argument as function.
        $@ # Important: call arguments verbatim. i.e. allows first argument to call functions inside file. So that it could be called as "./setup/entrypoint.sh <functionName>".
    else # if all arguments are in pattern of <key>=<value> pairs.
        message="All passed arguments are Key-Value pairs, ${message_noCommand}"
        echo -e "\n${message_prefix}\e[97m\e[41m${message}\e[0m"
        exit 1
    fi

fi




