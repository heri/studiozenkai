#!/bin/bash

# Build the site
hugo

# Define the source and target directories
SOURCE_DIR="/Volumes/T7 Shield/work/studiozenkai/public"
TARGET_DIR="/Volumes/T7 Shield/work/studiozenkai"

# Copy the contents of the public directory to the target directory
rsync -av --exclude='/index.html' "$SOURCE_DIR"/ "$TARGET_DIR"/

# Copy the index.xml file from the post directory
cp "$SOURCE_DIR"/post/index.xml "$TARGET_DIR"/

# Optionally remove the public directory after copying
# rm -rf $SOURCE_DIR

echo "Deployment complete!"