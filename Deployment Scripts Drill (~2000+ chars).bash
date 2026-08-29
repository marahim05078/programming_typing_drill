#!/bin/bash
echo "Building Docker image..."
docker build -t myapp:latest .

echo "Pushing to registry..."
docker tag myapp:latest myregistry/myapp:latest
docker push myregistry/myapp:latest

echo "Deploying to Kubernetes..."
kubectl apply -f kubernetes-deployment.yaml
kubectl apply -f kubernetes-service.yaml

echo "Running migrations..."
kubectl exec -it $(kubectl get pod -l app=myapp -o jsonpath="{.items[0].metadata.name}") -- npm run migrate

echo "Deployment complete!"
