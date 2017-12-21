### Build docker container
### As this is a deployment image - number of layers and subsequently image size doesn't matter.
FROM node:latest
MAINTAINER SZN

ARG PROJECT="/project"
# ContainerManager
ARG containerManager="$PROJECT/appDeploymentEnvironment" 
    ENV containerManager ${containerManager}


# Copy files and make them executable.
# Copy command in dockerfile is relative to the build context specified in docker-compose.
COPY ./application/ $containerManager/application/
COPY ./dependency/ $containerManager/dependency/

### command for build installation - define defaults, which can be overriden by docker-compose file args.
ARG entrypointConfigurationPath
    ENV entrypointConfigurationPath ${entrypointConfigurationPath}
ARG entrypointOption
    ENV entrypointOption ${entrypointOption}
ARG dockerImageTag
    ENV dockerImageTag ${dockerImageTag}
ARG dockerImageName
    ENV dockerImageName ${dockerImageName}
ARG DEPLOYMENT
    ENV DEPLOYMENT ${DEPLOYMENT}
# Apparently when copied from windows, execution permissions should be granted. for sehll scripts.
RUN find $PROJECT/ -type f -exec chmod +x {} \; 
RUN node $containerManager/application/source/

### Define command for runtime. For using container from dockerhub immediately.
ENV DEPLOYMENT=containerManager
ENV entrypointConfigurationPath="$PROJECT/application/setup/entrypoint/configuration.js"
ENV entrypointOption=run
ENV is_managerContainer=true
# Executed only on runtime.
CMD node $containerManager/application/source/entrypoint.js
