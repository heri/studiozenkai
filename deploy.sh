#!/bin/bash
set -e

echo "Building site..."
hugo

echo ""
echo "Build complete. Files written to repo root."
echo ""
echo "Next steps:"
echo "  git status"
echo "  git add <changed files>"
echo "  git commit -m \"your message\""
echo "  git push"
