#!/bin/bash

# Doodles Store - Firebase Hosting Deployment Script
# This script automates the deployment process

echo "🎨 Doodles Store - Deployment Script"
echo "===================================="
echo ""

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null
then
    echo "❌ Firebase CLI is not installed."
    echo "📦 Installing Firebase CLI..."
    npm install -g firebase-tools
    
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Firebase CLI. Please install manually:"
        echo "   npm install -g firebase-tools"
        exit 1
    fi
    echo "✅ Firebase CLI installed successfully!"
    echo ""
fi

# Check if public directory exists
if [ ! -d "public" ]; then
    echo "📁 Creating public directory..."
    mkdir -p public
fi

# Copy files to public directory
echo "📋 Copying files to public directory..."
cp login.html public/index.html
cp final.html public/final.html
cp firebase-config.js public/firebase-config.js
cp auth.js public/auth.js
cp manifest.json public/manifest.json
cp service-worker.js public/service-worker.js
cp icon-192.png public/icon-192.png
cp icon-512.png public/icon-512.png

if [ $? -eq 0 ]; then
    echo "✅ Files copied successfully!"
else
    echo "❌ Failed to copy files. Make sure all files exist."
    exit 1
fi

echo ""
echo "🚀 Deploying to Firebase Hosting..."
echo ""

# Deploy to Firebase
firebase deploy --only hosting

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "🌐 Your app is now live at:"
    echo "   https://doodles-store.web.app"
    echo "   https://doodles-store.firebaseapp.com"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Test the deployed app by visiting the URL above"
    echo "   2. Share the URL with your team"
    echo "   3. Update Firestore security rules (see DEPLOYMENT.md)"
    echo ""
else
    echo ""
    echo "❌ Deployment failed!"
    echo ""
    echo "🔍 Troubleshooting:"
    echo "   1. Make sure you're logged in: firebase login"
    echo "   2. Check if firebase.json exists"
    echo "   3. Verify your Firebase project is set up correctly"
    echo ""
    echo "📖 See DEPLOYMENT.md for detailed instructions"
    exit 1
fi
