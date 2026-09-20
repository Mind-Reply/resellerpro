#!/bin/bash
# RESELLERPRO PRODUCTION DEPLOYMENT SCRIPT
# Deploy to Vercel with one command

set -e

echo "🚀 RESELLERPRO PRODUCTION DEPLOYMENT"
echo "===================================="
echo ""

cd C:\Users\Mindr\resellerpro-new

echo "✅ Step 1: Repository verified"
echo ""

# Check if .vercelignore exists, create if needed
if [ ! -f ".vercelignore" ]; then
  cat > .vercelignore << 'EOF'
docs/
DEPLOYMENT_GUIDE.md
.git/
.gitignore
node_modules/
.next/cache/
coverage/
*.md
.env.local
.env.*.local
EOF
  echo "✅ Step 2: Created .vercelignore"
else
  echo "✅ Step 2: .vercelignore already exists"
fi

echo ""

# Create vercel.json if needed
if [ ! -f "vercel.json" ]; then
  cat > vercel.json << 'EOF'
{
  "buildCommand": "pnpm build",
  "installCommand": "pnpm install",
  "outputDirectory": ".next",
  "env": {
    "NEXT_PUBLIC_APP_URL": "@next_public_app_url"
  },
  "envs": {
    "preview": {
      "NEXT_PUBLIC_APP_URL": "https://$DEPLOYMENT_URL"
    },
    "production": {
      "NEXT_PUBLIC_APP_URL": "https://resellerpro.io"
    }
  }
}
EOF
  echo "✅ Step 3: Created vercel.json"
else
  echo "✅ Step 3: vercel.json already exists"
fi

echo ""
echo "🌐 DEPLOYMENT INSTRUCTIONS:"
echo ""
echo "1. Run: vercel login"
echo "   (This opens your browser to connect GitHub account)"
echo ""
echo "2. Run: vercel --prod"
echo "   (This deploys to production)"
echo ""
echo "3. After deployment, your app will be live at:"
echo "   https://resellerpro-[username].vercel.app"
echo ""
echo "4. To add custom domain (resellerpro.io):"
echo "   - In Vercel Dashboard → Your Project → Settings → Domains"
echo "   - Add domain and update nameservers"
echo ""
echo "Ready to deploy? Run:"
echo "  vercel login"
echo "  vercel --prod"
echo ""
