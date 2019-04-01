#!/usr/bin/env bash

services="shopfront stockmanager productcatalogue featureflags featureflags-db external-adaptive-pricing"

ip=$(minikube ip)
for service in ${services}; do
    port=$(kubectl get services/${service} -o go-template='{{(index .spec.ports 0).nodePort}}')
    echo "${service} --> http://${ip}:${port}/"
done
