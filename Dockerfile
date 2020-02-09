FROM node:current
RUN /bin/bash -c 'apt update -y && apt upgrade -y \
&& yarn global add -y jspm \
&& apt install -y rsync'
