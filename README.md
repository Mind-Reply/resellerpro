# RessellerPro - Enterprise Platform for Domain, Hosting & Deployment

> **Equal to GoDaddy + Namecheap + IONOS + Vercel**

Modern, white-label SaaS platform enabling resellers to manage domains, hosting, serverless functions, and deployments—all from one beautiful dashboard.

## ⚡ Features

- 🌐 **Domain Registry** - Search, register, manage across multiple registrars
- 🏠 **Managed Hosting** - Shared, VPS, and dedicated servers with auto-provisioning
- ⚡ **Serverless Functions** - Deploy edge functions in Node.js, Python, Go
- 🚀 **Git Deployments** - GitHub/GitLab integration with auto-deploy
- 💳 **Billing & Payments** - Stripe integration, automatic invoicing
- 📊 **Revenue Dashboard** - Real-time analytics and commission tracking
- 🎨 **White Label** - Full branding customization
- 🔐 **Enterprise Security** - SOC 2, GDPR compliant, audit logs

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- Redis 7+
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/Mind-Reply/resellerpro.git
cd resellerpro

# Install dependencies
pnpm install

# Setup environment
cp .env.example .env.local

# Create database
createdb resellerpro_dev

# Run migrations
pnpm prisma migrate dev

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
resellerpro/
├── src/app                  # Next.js 15 App Router
│   ├── (auth)              # Authentication pages
│   ├── (dashboard)         # Protected dashboard
│   │   ├── domains         # Domain management
│   │   ├── hosting         # Hosting management
│   │   ├── functions       # Serverless functions
│   │   ├── deployments     # Git deployments
│   │   ├── billing         # Billing & invoicing
│   │   └── settings        # Account settings
│   ├── (marketing)         # Public pages
│   └── api                 # API routes
├── src/components          # React components
├── src/lib                 # Utilities & helpers
├── src/services            # Business logic
├── src/types               # TypeScript types
├── prisma                  # Database schema
└── public                  # Static assets
```

## 💻 Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express (via API routes), PostgreSQL, Redis
- **Payments:** Stripe API
- **Hosting:** cPanel/WHM integration
- **Serverless:** Cloudflare Workers, AWS Lambda
- **Infrastructure:** Docker, Kubernetes, Terraform

## 📚 API Documentation

### Domain Registry
- `GET /api/domains/search` - Search available domains
- `POST /api/domains/register` - Register domain
- `GET /api/domains` - List user domains
- `GET /api/domains/:id/dns` - Get DNS records
- `POST /api/domains/:id/dns` - Add DNS record

### Hosting
- `GET /api/hosting/plans` - Get hosting plans
- `POST /api/hosting/accounts` - Create account
- `GET /api/hosting/accounts` - List accounts
- `GET /api/hosting/:id/stats` - Get usage stats

### Serverless Functions
- `POST /api/functions/deploy` - Deploy function
- `GET /api/functions` - List functions
- `GET /api/functions/:id/logs` - Get logs

### Billing
- `GET /api/billing/invoices` - List invoices
- `GET /api/billing/usage` - Get usage stats

## 🔌 Integrations

- **GoDaddy, Namecheap, IONOS** - Domain registration
- **Stripe** - Payment processing
- **SendGrid** - Transactional email
- **GitHub/GitLab/Bitbucket** - Git deployments
- **cPanel/WHM** - Hosting management
- **Cloudflare** - DNS & CDN
- **AWS** - Serverless compute

## 💰 Pricing

| Plan | Price | Features |
|------|-------|----------|
| **Starter** | Free | 5 domains, 1 site |
| **Professional** | $29/mo | Unlimited domains/sites |
| **Business** | $99/mo | API access, priority support |
| **Enterprise** | Custom | White-label, dedicated support |

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test:coverage

# E2E tests
pnpm test:e2e

# Watch mode
pnpm test:watch
```

## 📦 Deployment

### Vercel
```bash
vercel --prod
```

### Docker
```bash
docker build -t resellerpro:latest .
docker-compose up -d
```

### AWS
```bash
docker push $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/resellerpro:latest
```

## 📚 Documentation

- [Getting Started](/docs/GETTING_STARTED.md)
- [API Reference](/docs/API.md)
- [Architecture](/docs/ARCHITECTURE.md)
- [Deployment](/docs/DEPLOYMENT.md)
- [Contributing](/docs/CONTRIBUTING.md)

## 🔐 Security

- HTTPS/SSL encryption
- JWT authentication
- Rate limiting
- CSRF protection
- SQL injection prevention (Prisma)
- XSS protection
- Audit logging
- Secrets management

## 📈 Roadmap

- [x] Domain registry
- [x] Hosting management
- [x] Serverless functions
- [x] Git deployments
- [x] Billing system
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Marketplace

## 🤝 Contributing

See [CONTRIBUTING.md](/docs/CONTRIBUTING.md)

## 📞 Support

- Email: support@resellerpro.io
- Docs: https://docs.resellerpro.io
- Community: https://community.resellerpro.io

## 📄 License

MIT - See LICENSE file

---

**RessellerPro: One platform for domains, hosting, functions, and deployments.**

Built by [Mind-Reply](https://mindreply.com)
