# Render.com Deployment Guide for Daily Quest AI Agent

This guide walks you through deploying the full Daily Quest stack (React, Node.js, Python FastAPI) to Render.com.

## Prerequisites

- GitHub account with your repository pushed
- OpenAI API key (from https://platform.openai.com/api-keys)
- Render.com account (free tier available)
- MongoDB Atlas account (free tier: 512MB storage)

---

## Step 1: Set Up MongoDB Atlas Cloud Database

MongoDB Atlas provides free cloud-hosted MongoDB (512MB tier).

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free
   - Create a new project

2. **Create a Cluster**
   - Click "Build a Cluster"
   - Choose the FREE tier (M0)
   - Select your region (closest to your users)
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access"
   - Add new database user
   - Username: `dailyquest`
   - Password: (generate a secure one, save it!)
   - Select "Read and write to any database"
   - Click "Create User"

4. **Whitelist IP Addresses**
   - Go to "Network Access"
   - Add IP Address
   - Add: `0.0.0.0/0` (allows all IPs - needed for Render)
   - Click "Confirm"

5. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the MongoDB URI (looks like: `mongodb+srv://dailyquest:PASSWORD@cluster0.xxxxx.mongodb.net/myDB?retryWrites=true&w=majority`)
   - Replace `<password>` with your database user password
   - **Save this URI - you'll need it for Render**

---

## Step 2: Prepare Your GitHub Repository

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Verify these files exist in repo:**
   - `render.yaml` (provided)
   - `requirements.txt` (provided)
   - `.env.example` (provided)
   - `package.json` (with updated start scripts)
   - `src/Server.js` (updated for MongoDB Atlas)
   - `src/main.py` (updated for production)

---

## Step 3: Create Services on Render.com

### 3a: Deploy Node Backend + React Frontend

1. **Go to https://dashboard.render.com**
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository**
   - Authorization Render to access your GitHub
   - Select your `Daily-Quest-AI-Agent` repository

4. **Configure the Web Service:**
   - **Name:** `daily-quest-web`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Plan:** Free (or Starter)

5. **Add Environment Variables** (click "Advanced"):
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = `mongodb+srv://dailyquest:PASSWORD@cluster0.xxxxx.mongodb.net/myDB?retryWrites=true&w=majority`
     - Replace with your actual MongoDB Atlas URI
   - `OPENAI_API_KEY` = Your OpenAI API key (from https://platform.openai.com/api-keys)
   - `ADMIN_PASSWORD` = Create a secure password
   - `ENVIRONMENT` = `production`

6. **Click "Create Web Service"**
7. **Wait for deployment** (5-10 minutes)
8. Once deployed, note your **Frontend URL** (e.g., `https://daily-quest-web.onrender.com`)

### 3b: Deploy Python FastAPI Backend

1. **Go to https://dashboard.render.com**
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository** (same repo)

4. **Configure the Web Service:**
   - **Name:** `daily-quest-python`
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `python src/main.py`
   - **Plan:** Free

5. **Add Environment Variables:**
   - `OPENAI_API_KEY` = Your OpenAI API key
   - `ENVIRONMENT` = `production`
   - `HOST` = `0.0.0.0`
   - `PORT` = `8000`

6. **Click "Create Web Service"**
7. **Wait for deployment** (5-10 minutes)
8. Note your **Python Service URL** (e.g., `https://daily-quest-python.onrender.com`)

---

## Step 4: Update Node Backend to Call Python Service

After both services are deployed, update your Node backend to call the Python service by its public URL.

1. **In your Render dashboard**, go to `daily-quest-web` service
2. **Go to "Environment"** tab
3. **Add new environment variable:**
   - Key: `PYTHON_API_URL`
   - Value: `https://daily-quest-python.onrender.com`

4. **Update `src/Server.js`** (if needed):
   - Change any localhost calls to Python from `http://localhost:8000` to `process.env.PYTHON_API_URL || 'http://localhost:8000'`

5. **Update `src/App.jsx`** (if needed):
   - Ensure it communicates with the right Node backend URL (Render assigns one automatically)

---

## Step 5: Test Your Deployment

1. **Visit your frontend:** `https://daily-quest-web.onrender.com`
2. **Test quest generation:**
   - Select a course
   - Add some notes
   - Click "Generate Quest"
3. **Check logs** if there are errors:
   - Render Dashboard → Service → "Logs" tab
   - Look for MongoDB connection issues, API key problems, etc.

---

## Common Issues & Troubleshooting

### "MongoDB connection failed"
- Verify `MONGODB_URI` is correct in Render environment variables
- Ensure MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check username/password in URI

### "OPENAI_API_KEY not found"
- Verify environment variable is set in Render
- Ensure key is valid at https://platform.openai.com/api-keys

### "Python service not reachable"
- Verify `https://daily-quest-python.onrender.com` is accessible
- Check Python service logs for startup errors
- Render free tier services might go to sleep; they'll restart on request

### Frontend shows "Is the backend running?"
- Verify Node service URL is correct
- Check Node service logs in Render dashboard
- Ensure Node service is in "Live" state (not "Deploying")

---

## Monitoring & Maintenance

### View Logs
- Render Dashboard → Select Service → "Logs" tab
- Check for errors or warnings

### Restart Services
- Render Dashboard → Select Service → "Settings" → "Restart Instance"

### Update Code
- Push changes to GitHub
- Render automatically redeploys (configurable via "Auto-Deploy" setting)

### Database Management
- MongoDB Atlas console → "Collections" tab
- View/edit documents directly

---

## Costs

**Free Tier:**
- Single web service: Free
- Multiple web services: Free (limited to 1 free slot; additional ones are paid)
- Render free tier has limits: 0.5 CPU, 512MB RAM per service
- Services spin down after 15 mins of inactivity; restart on request (~30 sec)

**Recommended for Personal Use:**
- Keep both services on free tier
- Monitor usage in Render dashboard
- Upgrade to Starter ($7/month) if you need better performance

**MongoDB Atlas:**
- Free tier: 512MB storage (plenty for personal use)
- Paid tiers start at $57/month for M2 cluster

---

## Next Steps

1. **Enable auto-redeploy:** 
   - Render Dashboard → Service → "Settings" → Enable "Auto-Deploy"

2. **Set up custom domain (optional):**
   - Render Dashboard → Service → "Settings" → Add custom domain

3. **Add monitoring/alerts:**
   - Render Dashboard → Service → Enable notifications for failures

4. **Backup MongoDB:**
   - MongoDB Atlas → "Backup" tab → schedule automatic snapshots

