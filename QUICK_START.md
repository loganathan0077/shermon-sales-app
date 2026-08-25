# Quick Start Guide - Deploying to Cloud

## Option 1: Automated Deployment (Recommended)

I've created a deployment script that automates everything for you!

### Steps:

1. **Open Terminal** and navigate to your app:
   ```bash
   cd /Users/log/Desktop/SalesApp
   ```

2. **Run the deployment script:**
   ```bash
   ./deploy.sh
   ```

That's it! The script will:
- Install Firebase CLI (if needed)
- Copy your files to the correct location
- Deploy to Firebase Hosting
- Show you the live URL

### First Time Setup

If this is your first deployment, you'll need to:

1. **Login to Firebase:**
   ```bash
   firebase login
   ```

2. **Initialize Firebase Hosting:**
   ```bash
   firebase init hosting
   ```
   - Choose "Use an existing project"
   - Select "doodles-store"
   - Use "public" as the public directory
   - Say "No" to single-page app
   - Say "No" to GitHub auto-deploy

3. **Run the deployment script:**
   ```bash
   ./deploy.sh
   ```

## Option 2: Manual Deployment

See [DEPLOYMENT.md](file:///Users/log/Desktop/SalesApp/DEPLOYMENT.md) for detailed manual deployment instructions.

## After Deployment

Your app will be live at:
- **https://doodles-store.web.app**
- **https://doodles-store.firebaseapp.com**

### Important: Update Security Rules

After deploying, update your Firestore security rules:

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select **Firestore Database** → **Rules**
3. Replace with:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```
4. Click **Publish**

## Updating Your Deployed App

Whenever you make changes, just run:
```bash
./deploy.sh
```

The script handles everything automatically!

## Troubleshooting

### "Permission denied: ./deploy.sh"
Run this command to make the script executable:
```bash
chmod +x deploy.sh
```

### "firebase: command not found"
Install Firebase CLI:
```bash
npm install -g firebase-tools
```

### Need more help?
See the detailed guide: [DEPLOYMENT.md](file:///Users/log/Desktop/SalesApp/DEPLOYMENT.md)
