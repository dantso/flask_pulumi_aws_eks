# Pulumi_AWS_EKS_Flask

This repository will create 2 simple flask applications. One will allow you to enter numbers. The other will respond with the average of the numbers entered. The connection between the flask application is managed through redis. This project can be deployed locally using docker-compose, or on an eks cluster using pulumi.

## Prerequisits
- Python
- AWS
- Docker
- Docker-compose
- Pulumi
- Pip
- Redis
- Flask

## Installation Docker Compose

### Step 1 

Navigate to the root directory containing docker-compose.yaml file

### Step 2 
Run docker compose

```bash
docker-compose up
```
### Step 3

Navigate to localhost:5000 and localhost:5001 to use the flask application

## Installation Pulumi

### Step 1
Follow the [quickguide](https://www.pulumi.com/docs/get-started/) to set up pulumi directory using aws-typescript

### Step 2
Install packages
```bash
npm install --save @pulumi/eks @pulumi/kubernetes
```

### Step 3
Replace index.ts in your pulumi initialized folder with index.ts from the pulumi directory.

### Step 4
Run pulumi up and create resources

### Step 5
Use url1 and url2 from output to navigate to flask applications

## Notes
Consul was not included in this project as now. In the future consul will be implemented as well. Comments will be added in a future update as well.