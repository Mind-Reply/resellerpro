#!/bin/bash
# deploy-resellerpro.sh - Complete Deployment Script

echo "🚀 RESELLERPRO PRODUCTION DEPLOYMENT"
echo "===================================="
echo ""

# Step 1: Verify we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Are you in the resellerpro directory?"
    exit 1
fi

echo "✅ Step 1: Repository verified"
echo ""

# Step 2: Install dependencies (if needed)
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
    echo ""
fi

# Step 3: Build the project
echo "🔨 Building RessellerPro..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi
echo "✅ Build successful"
echo ""

# Step 4: Deploy to Vercel
echo "🌐 Deploying to Vercel..."
echo ""
echo "Next steps:"
echo "1. If first time: Run 'vercel' to link project"
echo "2. Deploy: vercel --prod"
echo "3. Custom domain: vercel env add NEXT_PUBLIC_APP_URL https://resellerpro.io"
echo ""

# Auto-detect if Vercel CLI is installed
if command -v vercel &> /dev/null; then
    echo "✅ Vercel CLI found, proceeding with deployment..."
    vercel --prod
else
    echo "❌ Vercel CLI not found. Install with:"
    echo "   npm install -g vercel"
    echo ""
    echo "Then run: vercel --prod"
    exit 1
fi

echo ""
echo "🎉 Deployment complete!"
echo "Your site is now live at: https://resellerpro.vercel.app"
echo ""
echo "Next steps:"
echo "1. Add custom domain in Vercel dashboard"
echo "2. Setup Cloudflare DNS"
echo "3. Submit sitemap to Google Search Console"
