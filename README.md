# building docker images
in go-service dir
docker build . -t go-service:latest
in node-service dir
docker build . -t node-service:latest

# deploying services
written minimal kube config for both services
deploying go service

Set up a aks in azure (a lot easier then local)

created a service to expose node service for external networking
used this command
kubectl expose deployment node-service --type=LoadBalancer --port=8080

made a service for go service, didn't expose.
got this service cluster ip and passed as environment variable to the node service 
everything is working
