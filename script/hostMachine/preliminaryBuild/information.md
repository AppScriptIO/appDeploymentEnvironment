First simple build using shell scripts without the complexity nodejs scripts brings.
This allows for creating the minimal necessary components in container image that the nodejs scripts modules relay on in their repositories (i.e. use container to run entrypoint scripts - like app manager script).

Installation of the following packages:
• Docker client.
• docker-compose
• nodejs >=10