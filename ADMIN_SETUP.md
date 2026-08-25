# Admin Setup Guide

## Setting Up Admin Access

To secure your application, we've removed the hardcoded admin password and replaced it with Firebase-based admin verification.

### Step 1: Add Your Email as Admin

You need to add your admin email to Firestore. You can do this in two ways:

#### Option A: Using Firebase Console (Recommended)
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **sales-app**
3. Go to **Firestore Database**
4. Click **Start collection**
5. Collection ID: `admins`
6. Document ID: `adminList`
7. Add field:
   - Field: `emails`
   - Type: `array`
   - Value: Add your admin email (e.g., `your-email@gmail.com`)
8. Click **Save**

#### Option B: Using the Browser Console
1. Log into your app at https://sales-app.web.app
2. Open Browser DevTools (F12)
3. Go to **Console** tab
4. Run this command (replace with your email):

```javascript
import { db } from './firebase-config.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

await setDoc(doc(db, 'admins', 'adminList'), {
    emails: ['your-email@gmail.com']  // Replace with your actual email
});
console.log('✅ Admin email added!');
```

### Step 2: How It Works Now

**Before (Insecure):**
- Admin password `admin123` was visible in source code
- Anyone could see and use it

**After (Secure):**
- No password in the code
- Only users whose email is in the Firestore `admins/adminList` can perform admin actions
- Admin check happens on Firebase (more secure)

### Step 3: Adding More Admins

To add more admin emails later:
1. Go to Firestore Console
2. Navigate to `admins` → `adminList`
3. Edit the `emails` array
4. Add new email addresses

### Default Admin Email Pattern

If you don't set up the Firestore admin list, the system will check if the logged-in user's email matches:
- `admin@salesappstore.com`
- OR any email ending with `@admin.salesappstore.com`

You can customize this in `auth.js` if needed.

## Security Benefits

✅ **No hardcoded passwords** - Nothing sensitive in the source code
✅ **Centralized control** - Manage admins from Firestore
✅ **Easy to update** - Add/remove admins without code changes
✅ **Audit trail** - Firebase tracks who accessed what
