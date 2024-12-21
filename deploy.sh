#!/bin/bash

# Build the site
hugo

# Define the source and target directories
SOURCE_DIR="/Volumes/T7 Shield/work/studiozenkai/public"
TARGET_DIR="/Volumes/T7 Shield/work/studiozenkai"

# Copy the contents of the public directory to the target directory
cp -r "$SOURCE_DIR"/* "$TARGET_DIR"/

# Optionally remove the public directory after copying
# rm -rf $SOURCE_DIR

echo "Deployment complete!"