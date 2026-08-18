# 🏕️ GEAR-UP — Gear Rental Marketplace

### 🚀 Rent Smart. Explore More. Gear Up!

**GEAR-UP** is a modern **multi-vendor gear rental marketplace** where customers can discover and rent equipment from providers, while providers can manage their gear inventory and rental orders through dedicated dashboards.

Built with **Next.js, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Express.js, and Stripe**, GEAR-UP provides a complete rental experience with role-based dashboards, secure authentication, online payments, and rental order management.

---

## 🌐 Live Application

<div align="center">

### 🚀 Frontend

**[🔗 Visit GEAR-UP](https://gearup-client-sand.vercel.app)**

### ⚙️ Backend API

**[🔗 Explore Backend API](https://gearup-olive.vercel.app)**

### 💻 Backend Repository

**[🔗 View Backend on GitHub](https://github.com/sakib404-hub/GEAR-UP-B7A4.git)**

</div>

---

## ✨ Why GEAR-UP?

Finding and renting the right equipment shouldn't be complicated.

GEAR-UP connects **customers who need equipment** with **providers who own equipment**, creating a simple marketplace for renting gears.

### 🎯 The platform allows:

* 🔍 Discover available gears
* 📂 Browse gears by category
* 🛒 Create rental orders
* 💳 Pay securely with Stripe
* 📦 Track rental order status
* 🏪 Providers can list and manage gears
* 📋 Providers can manage incoming orders
* 👑 Admins can manage users, gears, and categories
* 📊 Dashboards provide role-specific insights

---

# 🚀 Key Features

## 🌍 Modern Landing Experience

A visually engaging landing page designed to introduce the GEAR-UP platform and guide users toward discovering available rental equipment.

* Modern responsive UI
* Smooth animations
* Interactive sections
* Clear call-to-actions
* Mobile-friendly design

---

## 🔎 Gear Discovery

Customers can easily explore available equipment.

### Features

* Browse all gears
* Search and discover equipment
* Browse by category
* View detailed gear information
* Check availability
* View pricing information
* Access provider information

---

## 🛒 Rental Management

Customers can create and manage rental orders directly from the platform.

### Rental Flow

```text
Browse Gear
     ↓
View Gear Details
     ↓
Select Rental Information
     ↓
Create Order
     ↓
Provider Confirmation
     ↓
Online Payment
     ↓
Gear Pickup
     ↓
Gear Return
     ↓
Rental Completed
```

---

# 💳 Secure Stripe Payments

GEAR-UP integrates **Stripe Checkout** for secure online payments.

```text
Customer
   │
   ▼
Rental Order
   │
   ▼
Provider Confirms
   │
   ▼
Stripe Checkout
   │
   ▼
Payment Completed
   │
   ▼
Stripe Webhook
   │
   ▼
Backend Verification
   │
   ▼
Payment Confirmed
```

This provides a secure payment workflow without exposing sensitive payment information to the application.

---

# 👥 User Roles

GEAR-UP uses a role-based architecture with three main user types.

| Role            | Dashboard             | Purpose                             |
| --------------- | --------------------- | ----------------------------------- |
| 👤 **CUSTOMER** | `/customer-dashboard` | Rent gears and manage rentals       |
| 🏪 **PROVIDER** | `/provider-dashboard` | List gears and manage rental orders |
| 👑 **ADMIN**    | `/admin-dashboard`    | Manage the entire platform          |

---

# 👤 Customer Dashboard

Customers get a dedicated dashboard for managing their rental activities.

### Customer Features

* 🛒 Create rental orders
* 📦 View active orders
* ✅ View completed rentals
* 💳 Make payments
* 📊 Track order status
* 👤 Manage profile

### Routes

```text
/customer-dashboard
/customer-dashboard/orders
/customer-dashboard/completed
```

---

# 🏪 Provider Dashboard

Providers can turn their equipment into a rental business.

### Provider Features

* ➕ Add new gears
* ✏️ Edit gear information
* 🗑️ Delete gears
* 📦 View rental orders
* ✅ Manage order status
* 📋 View completed rentals
* 👤 Manage profile

### Routes

```text
/provider-dashboard
/provider-dashboard/my-gears
/provider-dashboard/orders
/provider-dashboard/completed
```

---

# 👑 Admin Dashboard

Admins have complete control over the platform.

### Admin Features

* 👥 Manage users
* 🏕️ Manage gears
* 📂 Manage categories
* 📊 Monitor platform activities
* 🔐 Manage platform-level resources

### Routes

```text
/admin-dashboard
/admin-dashboard/gear
/admin-dashboard/users
```

---

# 🔄 Rental Order Lifecycle

GEAR-UP uses a clear rental lifecycle:

```text
        ┌─────────┐
        │ PENDING │
        └────┬────┘
             │
             ▼
      ┌─────────────┐
      │  CONFIRMED  │
      └──────┬──────┘
             │
             ▼
      ┌─────────────┐
      │  PICKED_UP  │
      └──────┬──────┘
             │
             ▼
      ┌─────────────┐
      │   RETURNED  │
      └─────────────┘

PENDING / CONFIRMED
        │
        ▼
   ┌───────────┐
   │ CANCELLED │
   └───────────┘
```

### Order Statuses

| Status         | Meaning                      |
| -------------- | ---------------------------- |
| 🟡 `PENDING`   | Rental request created       |
| 🔵 `CONFIRMED` | Provider confirmed the order |
| 🟣 `PICKED_UP` | Customer picked up the gear  |
| 🟢 `RETURNED`  | Gear returned successfully   |
| 🔴 `CANCELLED` | Order cancelled              |

---

# 💻 Tech Stack

<div align="center">

### Frontend

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge\&logo=next.js)

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge\&logo=react)

![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge\&logo=typescript)

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge\&logo=tailwindcss)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge\&logo=node.js)

![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge\&logo=prisma)

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge\&logo=postgresql)

### Services & Tools

![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge\&logo=stripe)

![Vercel](https://img.shields.io/badge/Vercel-Deployment-black?style=for-the-badge\&logo=vercel)

</div>

---

## 🧰 Complete Technology Stack

| Category           | Technologies                      |
| ------------------ | --------------------------------- |
| **Framework**      | Next.js 16                        |
| **UI Library**     | React 19                          |
| **Language**       | TypeScript                        |
| **Styling**        | Tailwind CSS v4                   |
| **UI Components**  | shadcn/ui, Radix UI               |
| **Forms**          | React Hook Form                   |
| **Validation**     | Zod                               |
| **Authentication** | JWT / Cookie-based Authentication |
| **Backend**        | Node.js, Express.js               |
| **Database**       | PostgreSQL                        |
| **ORM**            | Prisma                            |
| **Payments**       | Stripe                            |
| **Animations**     | Framer Motion                     |
| **Charts**         | Recharts                          |
| **Notifications**  | Sonner                            |
| **Icons**          | Lucide React                      |
| **Deployment**     | Vercel                            |

---

# 🗺️ Application Routes

## 🌐 Public Routes

| Route           | Description         |
| --------------- | ------------------- |
| `/`             | Home / Landing Page |
| `/categories`   | Browse categories   |
| `/gear`         | Browse all gears    |
| `/gear/[id]`    | Gear details        |
| `/how-it-works` | How GEAR-UP works   |
| `/login`        | Login               |
| `/register`     | Registration        |
| `/profile`      | User profile        |

## 👤 Customer Routes

| Route                           | Description          |
| ------------------------------- | -------------------- |
| `/customer-dashboard`           | Customer overview    |
| `/customer-dashboard/orders`    | Active rental orders |
| `/customer-dashboard/completed` | Completed rentals    |

## 🏪 Provider Routes

| Route                           | Description            |
| ------------------------------- | ---------------------- |
| `/provider-dashboard`           | Provider overview      |
| `/provider-dashboard/my-gears`  | Manage gears           |
| `/provider-dashboard/orders`    | Incoming rental orders |
| `/provider-dashboard/completed` | Completed orders       |

## 👑 Admin Routes

| Route                    | Description     |
| ------------------------ | --------------- |
| `/admin-dashboard`       | Admin overview  |
| `/admin-dashboard/gear`  | Gear management |
| `/admin-dashboard/users` | User management |

---

# 📁 Project Structure

```text
gearup-client/
│
├── app/
│   ├── admin-dashboard/
│   │   ├── gear/
│   │   └── users/
│   │
│   ├── customer-dashboard/
│   │   ├── completed/
│   │   └── orders/
│   │
│   ├── provider-dashboard/
│   │   ├── completed/
│   │   ├── my-gears/
│   │   └── orders/
│   │
│   ├── categories/
│   ├── gear/
│   │   └── [id]/
│   │
│   ├── how-it-works/
│   ├── login/
│   ├── profile/
│   ├── register/
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
├── config/
├── hooks/
├── lib/
├── services/
├── types/
├── public/
│
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── proxy.ts
└── README.md
```

---

# 🔐 Authentication & Authorization

GEAR-UP implements role-based access control.

```text
                   ┌─────────────┐
                   │    USER     │
                   └──────┬──────┘
                          │
              ┌───────────┼───────────┐
              ▼           ▼           ▼
         CUSTOMER      PROVIDER      ADMIN
              │           │           │
              ▼           ▼           ▼
        Customer DB   Provider DB   Admin DB
        Dashboard     Dashboard     Dashboard
```

Protected dashboard routes are accessible according to the authenticated user's role.

---

# ⚙️ Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_BASE_URL="https://gearup-olive.vercel.app/api"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
```

### Variables

| Variable                             | Purpose                  |
| ------------------------------------ | ------------------------ |
| `NEXT_PUBLIC_API_BASE_URL`           | Backend API base URL     |
| `NEXT_PUBLIC_APP_URL`                | Frontend application URL |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key   |

> ⚠️ Never expose Stripe secret keys or other private credentials in frontend environment variables.

---

# 🏃 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/shehabRabby/GEAR-UP-B7A4.git
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Configure Environment Variables

Create:

```text
.env.local
```

Then add the required configuration.

## 4️⃣ Start Development Server

```bash
npm run dev
```

The application will run at:

```text
http://localhost:3000
```

---

# 🏗️ Production Build

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

---

# ☁️ Deployment

GEAR-UP is deployed using **Vercel**.

### Frontend

🚀 **Live Application**

**https://gearup-client-sand.vercel.app**

### Backend

⚙️ **Live API**

**https://gearup-olive.vercel.app**

---

# 🔌 System Architecture

```text
                    GEAR-UP PLATFORM
                          │
              ┌───────────┴───────────┐
              │                       │
          FRONTEND                 BACKEND
          Next.js                 Express.js
              │                       │
              │                       ▼
              │                    Prisma
              │                       │
              │                       ▼
              │                  PostgreSQL
              │
              ▼
        Stripe Checkout
              │
              ▼
        Payment Webhook
              │
              └──────────────► Backend
```

---

# 📊 Platform Architecture

```text
                         ┌───────────────┐
                         │    GEAR-UP    │
                         └───────┬───────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
          CUSTOMER           PROVIDER             ADMIN
              │                  │                  │
              ▼                  ▼                  ▼
         Rent Gears         List Gears        Manage Users
         Make Payment       Manage Orders      Manage Gears
         Track Orders       Update Status       Manage Platform
              │                  │                  │
              └──────────────────┼──────────────────┘
                                 │
                                 ▼
                         PostgreSQL Database
```

---

# 🌟 What Makes GEAR-UP Special?

### 🏕️ Multi-Vendor Marketplace

Multiple providers can list their equipment and manage their own rental business.

### 🔐 Role-Based Architecture

Each user receives a dashboard specifically designed for their role.

### 💳 Integrated Payments

Stripe provides a secure and reliable online payment experience.

### 📦 Complete Rental Lifecycle

From order creation to confirmation, pickup, and return, the complete rental process is managed digitally.

### 📱 Responsive Experience

The application is designed to work across desktop, tablet, and mobile devices.

### ⚡ Modern Full-Stack Architecture

Built using a modern TypeScript-based stack with Next.js, Express.js, Prisma, and PostgreSQL.

---

# 📈 Future Improvements

Potential future improvements include:

* ⭐ Gear reviews and ratings
* 🔔 Real-time notifications
* 💬 Customer-provider messaging
* 📍 Location-based gear discovery
* ❤️ Wishlist functionality
* 🔎 Advanced filtering
* 📅 Calendar-based availability
* 📊 More advanced analytics
* 📱 Progressive Web App support

---

# 🤝 Contributing

Contributions, suggestions, and feedback are welcome.

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Commit your changes
5. Push the branch
6. Open a Pull Request

---

# 👨‍💻 Author

## Md. Shakib Hossen

**Junior Frontend & Full-Stack Web Developer**

Passionate about building modern, scalable, and user-friendly web applications with JavaScript, TypeScript, React, Next.js, and Node.js.

---

# ⭐ GEAR-UP

### **Rent the Gear. Explore More.**

**Built with ❤️ using Next.js, TypeScript, Prisma, PostgreSQL & Stripe.**

---

<div align="center">

### 🚀 Try GEAR-UP Today

**[🌐 Open Frontend](https://gearup-client-sand.vercel.app)**

**[⚙️ Open Backend API](https://gearup-olive.vercel.app)**

</div>
