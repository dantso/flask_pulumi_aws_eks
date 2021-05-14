import * as eks from "@pulumi/eks";
import * as k8s from "@pulumi/kubernetes";

// Create an EKS cluster with the default configuration.
const cluster = new eks.Cluster("task");

// Deploy redis app
const appName_3 = "redis";
const appLabels_3 = { appClass: appName_3 };
const deployment_3 = new k8s.apps.v1.Deployment(`${appName_3}-dep`, {
    metadata: { labels: appLabels_3 },
    spec: {
        replicas: 1,
        selector: { matchLabels: appLabels_3 },
        template: {
            metadata: { labels: appLabels_3 },
            spec: {
                containers: [{
                    name: appName_3,
                    image: "redis",
                    ports: [{ name: "redis", containerPort: 6379 }]
                }],
            }
        }
    },
}, { provider: cluster.provider });
const service_3 = new k8s.core.v1.Service(`${appName_3}-svc`, {
    metadata: { labels: appLabels_3 },
    spec: {
        type: "LoadBalancer",
        ports: [{ port: 6379, targetPort: "redis" }],
        selector: appLabels_3,
    },
}, { provider: cluster.provider });

// Deploy num flask app
const appName_1 = "app1";
const appLabels_1 = { appClass: appName_1 };
const deployment_1 = new k8s.apps.v1.Deployment(`${appName_1}-dep`, {
    metadata: { labels: appLabels_1 },
    spec: {
        replicas: 1,
        selector: { matchLabels: appLabels_1 },
        template: {
            metadata: { labels: appLabels_1 },
            spec: {
                containers: [{
                    name: appName_1,
                    image: "dantso/app1",
                    ports: [{ name: "http", containerPort: 5000 }],
                    env: [{ name: "REDIS_URL", value: service_3.status.loadBalancer.ingress[0].hostname}]
                }],
            }
        }
    },
}, { provider: cluster.provider });
const service_1 = new k8s.core.v1.Service(`${appName_1}-svc`, {
    metadata: { labels: appLabels_1 },
    spec: {
        type: "LoadBalancer",
        ports: [{ port: 5000, targetPort: "http" }],
        selector: appLabels_1,
    },
}, { provider: cluster.provider });

// Deploy average flask app
const appName_2 = "app2";
const appLabels_2 = { appClass: appName_2 };
const deployment_2 = new k8s.apps.v1.Deployment(`${appName_2}-dep`, {
    metadata: { labels: appLabels_2 },
    spec: {
        replicas: 1,
        selector: { matchLabels: appLabels_2 },
        template: {
            metadata: { labels: appLabels_2 },
            spec: {
                containers: [{
                    name: appName_2,
                    image: "dantso/app2",
                    ports: [{ name: "http", containerPort: 5001 }],
                    env: [{ name: "REDIS_URL", value: service_3.status.loadBalancer.ingress[0].hostname}]
                }],
            }
        }
    },
}, { provider: cluster.provider });
const service_2 = new k8s.core.v1.Service(`${appName_2}-svc`, {
    metadata: { labels: appLabels_2 },
    spec: {
        type: "LoadBalancer",
        ports: [{ port: 5001, targetPort: "http" }],
        selector: appLabels_2,
    },
}, { provider: cluster.provider });


// Export the URL for the load balanced service.
export const url_1 = service_1.status.loadBalancer.ingress[0].hostname;
export const url_2 = service_2.status.loadBalancer.ingress[0].hostname;
export const url_3 = service_3.status.loadBalancer.ingress[0].hostname;

// Export the cluster's kubeconfig.
export const kubeconfig = cluster.kubeconfig;