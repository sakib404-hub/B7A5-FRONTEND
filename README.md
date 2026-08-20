# 🏕️ GEAR-UP — Outdoor Gear Rental & Sharing Marketplace

### 🚀 Rent Smart. Explore More. Gear Up!

**GEAR-UP** is a modern, full-stack **multi-vendor gear rental and sharing marketplace** where outdoor enthusiasts can discover and rent top-tier camping, hiking, and expedition equipment from trusted providers. Providers can effortlessly list and manage their gear inventory and track incoming rental orders through dedicated role-based dashboards.

Built with **Next.js 16 (App Router & Turbopack), React 19, TypeScript, Tailwind CSS v4, Framer Motion, Prisma, PostgreSQL, Express.js, and Stripe**, GEAR-UP provides an end-to-end rental experience with real-time catalog discovery, interactive filtering, client pagination, secure authentication gates, online checkout, and lifecycle order management.

---

## 🌐 Live Application & Links

<div align="center">

| 🚀 Frontend Application | ⚙️ Backend API Service | 💻 Backend GitHub Repo |
| :---: | :---: | :---: |
| [**🔗 Visit GEAR-UP**](https://gearup-client-sand.vercel.app) | [**🔗 Explore Backend API**](https://gearup-olive.vercel.app) | [**🔗 View Backend Repo**](https://github.com/sakib404-hub/GEAR-UP-B7A4.git) |

</div>

---

## ✨ Why GEAR-UP?

Outdoor adventures shouldn't require thousands of dollars in gear purchases and storage hassles. GEAR-UP bridges the gap between **explorers who need gear** and **providers who own equipment**.

### 🎯 Core Capabilities:
* 🔍 **Real-Time Gear Discovery**: Instant client-side search across titles, brands, descriptions, and provider names.
* 🎛️ **Multi-Criteria Filtering & Pagination**: Filter by brand, availability, and daily rate with customizable items-per-page pagination.
* 🛡️ **Authentication-Gated Rentals**: Unauthenticated visitors can browse freely; active session required to reserve gear.
* 💳 **Secure Stripe Payments**: Frictionless and safe checkout for rental confirmations.
* 📦 **Complete Order Lifecycle**: Track rentals from `PENDING` $\to$ `CONFIRMED` $\to$ `PICKED_UP` $\to$ `RETURNED`.
* 🏪 **Provider Business Suite**: Inventory creation, equipment updates, and order status transitions.
* 👑 **Admin Governance**: Platform-wide user management, gear moderation, and revenue analytics.
* 🧭 **Floating Pill Sidebar**: Minimalist floating navigation in dashboards without public footer distractions.
* 📄 **Rich Animated Public Pages**: Dedicated About Us, Contact, FAQ, Blog, Privacy, Terms, and Rental Policy pages.

---

# 🚀 Key Platform Features

## 1. 🔍 Interactive Gear Catalog & Filtering (`/gear`)
* **Instant Client Search**: Instant search filtering as you type with single-click reset.
* **Filter Drawer**: Multi-facet filtering by dynamic brand list, availability toggles, and daily price bounds.
* **Active Filter Chips**: Removable tags with a "Clear all" button.
* **Sorting Options**: Sort by *Featured*, *Price: Low to High*, *Price: High to Low*, *Rating*, and *Name: A to Z*.
* **Client-Side Numbered Pagination**: First/prev/numbered/next/last buttons with 4, 8, 12, 16, or 24 items per page.

## 2. 🛡️ Authentication Gate for Rentals
* Equipment reservation is gated: guests see a clear sign-in requirement banner with a direct link to `/login`.
* Logged-in users enjoy seamless date picking, dynamic day/price calculation, and instant order creation.

## 3. 🧭 Compact Floating Pill Sidebar
* Role-based floating sidebar (`w-14 h-[65vh]`) with hover tooltips and responsive mobile drawer.
* Clean separation of concerns: public footer is exclusively scoped to public pages.

## 4. 🔐 Animated Auth Showcase (`/login` & `/register`)
* Replaced static auth imagery with an interactive value-proposition showcase.
* Staggered Framer Motion slide-in animations, trust badges, verified alpine trekker reviews, and ambient glowing backgrounds.

## 5. 📄 7 Interactive Animated Public Pages
* **`/about`**: Live metrics counters (`10K+ Rentals`, `500+ Gear`), core values, and mission statement.
* **`/contact`**: Interactive inquiry submission with topic selector and Sonner toast confirmations.
* **`/faq`**: Real-time search with category pills and animated accordions.
* **`/blog`**: Featured adventure guide, category filters, and reading time chips.
* **`/privacy`**: Structured data protection and privacy policy.
* **`/terms`**: Legal user agreement and equipment inspection clauses.
* **`/rental-policy`**: Handover checklists, cleaning standards, late return penalties, and cancellation rules.

## 6. 🔔 Enhanced Global Toast Notifications
* Top-right positioned toasts powered by `Sonner` with rich colors, close buttons, custom icons, and 3.5s duration.

---

# 👥 User Roles & Dashboard Routes

| Role | Dashboard Base | Key Capabilities |
| :--- | :--- | :--- |
| 👤 **CUSTOMER** | `/customer-dashboard` | Manage active rentals, view order history, complete payments, track delivery status. |
| 🏪 **PROVIDER** | `/provider-dashboard` | Add/edit/delete equipment listings, approve incoming orders, manage order statuses. |
| 👑 **ADMIN** | `/admin-dashboard` | Platform metrics, manage all users (roles, bans), inspect and moderate all gear listings. |

---

# 🔄 Rental Order Lifecycle

```text
       ┌─────────────┐
       │   PENDING   │ ◄── Customer places rental order
       └──────┬──────┘
              │
              ▼
       ┌─────────────┐
       │  CONFIRMED  │ ◄── Provider confirms order
       └──────┬──────┘
              │
              ▼
       ┌─────────────┐
       │  PICKED_UP  │ ◄── Customer receives / picks up gear
       └──────┬──────┘
              │
              ▼
       ┌─────────────┐
       │  RETURNED   │ ◄── Gear returned & inspected (Completed)
       └─────────────┘

       PENDING / CONFIRMED
              │
              ▼
       ┌─────────────┐
       │  CANCELLED  │ ◄── Order cancelled by customer / provider
       └─────────────┘
```

---

# 💻 Tech Stack

<div align="center">

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-16.3.0_(Turbopack)-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer)
![Sonner](https://img.shields.io/badge/Sonner-Toasts-059669?style=for-the-badge)

### Backend & Database
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe)

</div>

---

# 🗺️ Application Routes

### 🌐 Public Routes (`app/(publicRoutes)`)
* `/` — Landing page with Hero, Categories, Featured Gear, and How It Works.
* `/gear` — Browse gear with real-time search, multi-filter drawer, sorting, and pagination.
* `/gear/[id]` — Detailed gear specs, image gallery, reviews, and booking card.
* `/categories` — Category directory.
* `/how-it-works` — Workflow and platform rental steps.
* `/about` — Company mission, animated stats, core values.
* `/contact` — Inquiry form with validation and contact cards.
* `/faq` — Searchable accordion FAQ.
* `/blog` — Adventure guides and equipment articles.
* `/privacy` — Privacy and cookie policy.
* `/terms` — Terms and conditions.
* `/rental-policy` — Handover checklists, cleaning, and late fee guidelines.
* `/profile` — User profile view and modal editor.

### 🔐 Authentication Routes (`app/(auth)`)
* `/login` — Animated split layout login with credential validation.
* `/register` — Customer and Provider role-based registration.

### 📊 Dashboard Routes (`app/(dashboards)`)
* **Customer**: `/customer-dashboard`, `/customer-dashboard/orders`, `/customer-dashboard/completed`
* **Provider**: `/provider-dashboard`, `/provider-dashboard/my-gears`, `/provider-dashboard/orders`, `/provider-dashboard/completed`
* **Admin**: `/admin-dashboard`, `/admin-dashboard/gear`, `/admin-dashboard/users`

---

# 📁 Project Directory Structure

```text
gearup-client/
├── app/
│   ├── (auth)/                     # Auth Route Group
│   │   ├── _actions/               # Login & Register server actions
│   │   ├── _components/            # LoginForm, RegisterForm
│   │   ├── login/                  # /login
│   │   ├── register/               # /register
│   │   └── layout.tsx              # Animated Auth Layout
│   │
│   ├── (dashboards)/               # Role-Based Dashboards Route Group
│   │   ├── _components/            # Floating Sidebar, Tooltip Content
│   │   ├── admin-dashboard/        # Admin overview, gear, users
│   │   ├── customer-dashboard/     # Customer orders & completed rentals
│   │   ├── provider-dashboard/     # Provider my-gears, orders, inventory
│   │   └── layout.tsx              # Dashboard layout (no public footer)
│   │
│   ├── (publicRoutes)/             # Public Marketing & Browse Route Group
│   │   ├── about/                  # /about
│   │   ├── blog/                   # /blog
│   │   ├── categories/             # /categories
│   │   ├── contact/                # /contact
│   │   ├── faq/                    # /faq
│   │   ├── gear/                   # /gear (Catalog, Search, Pagination)
│   │   │   └── [id]/               # /gear/[id] (Details & Booking)
│   │   ├── how-it-works/           # /how-it-works
│   │   ├── privacy/                # /privacy
│   │   ├── profile/                # /profile
│   │   ├── rental-policy/          # /rental-policy
│   │   ├── terms/                  # /terms
│   │   └── layout.tsx              # Public layout with Navbar & Footer
│   │
│   ├── apple-icon.tsx              # Dynamic 180x180 Apple touch icon
│   ├── globals.css                 # Tailwind CSS v4 theme variables
│   ├── icon.tsx                    # Dynamic 32x32 Brand Favicon
│   └── layout.tsx                  # Root HTML Layout & Global Toaster
│
├── components/
│   ├── modules/                    # Compound domain components
│   ├── shared/                     # Header, AuthHeader, Footer
│   └── ui/                         # shadcn/ui & Sonner Toaster
├── lib/                            # Utility functions (cn)
├── services/                       # Profile & Session services
├── types/                          # TypeScript definitions
├── package.json
└── README.md
```

---

# ⚙️ Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Backend API Base URL
BACKEND_APP_URL="https://gearup-olive.vercel.app"
NEXT_PUBLIC_API_BASE_URL="https://gearup-olive.vercel.app/api"

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Stripe Publishable Key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

---

# 🏃 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/sakib404-hub/B7A5-FRONTEND.git
cd B7A5-FRONTEND
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

# 👨‍💻 Author

### **Md. Shakib Hossen**
* **Role**: Frontend & Full-Stack Web Developer
* **GitHub**: [@sakib404-hub](https://github.com/sakib404-hub)
* **Project**: GEAR-UP Outdoor Equipment Rental Marketplace

---

<div align="center">

### ⭐ GEAR-UP — Rent the Gear. Explore More.

**Built with ❤️ using Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion & PostgreSQL.**

</div>
