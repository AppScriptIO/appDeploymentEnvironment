### As this is a deployment image - number of layers and subsequently image size doesn't matter.

FROM node:current
RUN /bin/bash -c 'apt update -y && apt upgrade -y \
&& yarn global add -y jspm \
&& apt install -y rsync'



### Installation of the following packages:
# • Docker client.
# • docker-compose

# # Install Docker Compose - https://docs.docker.com/compose/install/#install-compose
# RUN echo '(Docker compose installation: ↓)' && \
#     curl -L https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose && \
#     chmod +x /usr/local/bin/docker-compose && \
#     docker-compose --version
# # Install Docker CE - https://docs.docker.com/install/linux/docker-ce/debian/#install-using-the-convenience-script
# RUN echo '(Docker CE installation: ↓)' && \
#     apt-get update -y && \
#     apt-get install -y \
#         apt-transport-https \
#         ca-certificates \
#         curl \
#         gnupg2 \
#         software-properties-common && \
#     curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - && \
#     apt-key fingerprint 0EBFCD88 && \
#     add-apt-repository \
#         "deb [arch=amd64] https://download.docker.com/linux/debian \
#         $(lsb_release -cs) \
#         stable" && \
#     apt-get update -y && \
#     apt-get install -y docker-ce && \
#     docker -v
