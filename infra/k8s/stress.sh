#!/bin/bash
for i in {1..10000}; do
  curl localhost:30100/product
  sleep $1
done
