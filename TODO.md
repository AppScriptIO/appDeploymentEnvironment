• Spin up "portainer" container along side the container manager. To allow easier container management through the wenb ui Portainer offers.

docker run -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer --no-auth
