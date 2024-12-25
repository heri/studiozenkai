#!/bin/bash

# Build
hugo

SOURCE_DIR="/Volumes/T7 Shield/work/studiozenkai/public"
TARGET_DIR="/Volumes/T7 Shield/work/studiozenkai"

# Copy contents of public directory to target directory
rsync -av --exclude='/index.html' "$SOURCE_DIR"/ "$TARGET_DIR"/

# index.xml from /post is better than the main one
cp "$SOURCE_DIR"/post/index.xml "$TARGET_DIR"/

rm -rf $SOURCE_DIR

git add post/* tags/* content/* themes/* categories/* css/* index.html index.xml deploy.sh config.toml

read -p "Enter commit message: " commit_message

# If no commit message is provided, generate one based on the first changed markdown file in content/post
if [ -z "$commit_message" ]; then
  first_changed_file=$(git diff --name-only --cached | grep '^content/post/.*\.md$' | head -n 1)
  if [ -n "$first_changed_file" ]; then
    commit_message="Update: $(basename "$first_changed_file" .md) - $(date '+%Y-%m-%d')"
  else
    commit_message="Update: $(date '+%Y-%m-%d')"
  fi
fi

# Commit and push changes
git commit -m "$commit_message"

git push

echo "Deployment complete!"