#!/bin/bash

echo "Building image..."
npm run build && docker build -t arabul-client -f Dockerfile .
echo "Done."
