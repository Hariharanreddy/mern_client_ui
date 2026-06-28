## 🍕 Pizza Delivery Platform - Client UI Frontend

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

### 🛒 Modern, High-Performance Pizza Ordering App

The **Client UI** is the customer-facing web application for the Pizza Delivery Platform. Built on the **Next.js (v14.1.4, App Router)** framework, it connects securely to the platform's backend microservices (Auth, Catalog, and Order services).

It implements a modern **BFF (Backend-for-Frontend) Proxy Architecture** to manage sensitive user cookies securely on the server-side, alongside **Redux Toolkit** for local persistent state (shopping cart) and **React Query** for optimized server-side caching and mutations.

> [!NOTE]
> For a detailed, comprehensive walkthrough of the BFF patterns, state hydrators, token refresher schedules, and sequence diagrams, please consult the [ARCHITECTURE.md](file:///e:/Hari/Desktop/Code/Pizza%20Delivery%20Platform/mernspace-c-client-ui/ARCHITECTURE.md) file.

---

## ✨ Features

*   **Next.js App Router**: Utilizes React Server Components (RSC) for fast initial rendering, optimized SEO, and suspended streaming.
*   **BFF Token Proxy**: Handles login, registration, and session refreshes via Server Actions and Route Handlers, setting HTTP-only, SameSite=Strict cookies to defend against XSS and CSRF.
*   **Persistent Shopping Cart**: Redux-backed shopping cart that hashes item configurations (selected pizza, crust, size, toppings) to manage unique cart entries, safely hydrated on the client-side to prevent SSR mismatches.
*   **Instant Multi-Tenancy**: Header dropdown lets users pick different franchise stores (tenants), immediately filtering menus and category tabs via route navigation.
*   **Dynamic Customization Modal**: Real-time pricing calculations based on selected configurations (e.g. crust options, sizes) and additive topping checkboxes.
*   **Robust Checkout Form**: Features multi-step order placement using **React Hook Form** and **Zod** validation, supporting address management, coupon validation, and idempotency protection.
*   **Background Session Refresher**: Decentralized token decoder that automatically schedules silent session renewals 5 seconds before token expiration.

---

## 🛠️ Technology Stack

*   **Framework**: Next.js (v14.1.4) & React (v18)
*   **Styling**: TailwindCSS (v3.3.0) + CSS Variables + TailwindCSS Animate
*   **Component Library**: Radix UI (accessible primitives) & shadcn/ui
*   **Global Local State**: Redux Toolkit (v2.2.3) & React Redux
*   **Server Cache State**: TanStack React Query (v5.40.0)
*   **Network Client**: Axios (v1.7.2) for client-side API requests + native Fetch API for server-side fetches
*   **Session Management**: `jose` (JWT decoding) & `cookie` (header parsing)
*   **Validation & Schemas**: React Hook Form (v7.51.5) & Zod (v3.23.8)

---

## 📂 Directory Structure

```yaml
mernspace-c-client-ui/
├── public/                     # 📂 Static assets (images, icons)
├── src/                        # 💻 Source Code
│   ├── app/                    # 🚀 Next.js App Router Pages
│   │   ├── (home)/             # Main menu page (product list & modals)
│   │   ├── api/                # Next.js Route Handlers (token cookies & refresh proxies)
│   │   ├── cart/               # Cart review page
│   │   ├── checkout/           # Multi-step checkout & payment page
│   │   ├── login/              # Login screen
│   │   ├── register/           # Registration screen
│   │   ├── orders/             # Past orders page
│   │   ├── order/              # Real-time order tracking page
│   │   ├── payment/            # Payment gateway mock/return page
│   │   ├── globals.css         # Styling base system (Tailwind & fonts)
│   │   ├── layout.tsx          # Root layout wrapping providers, header & footer
│   │   ├── QueryProvider.tsx   # TanStack React Query wrapper
│   │   └── StoreProvider.tsx   # SSR-safe Redux Store provider & local storage hydrator
│   ├── components/             # 🧩 UI Components
│   │   ├── custom/             # Domain components (Header, Tenant Select, Refresher)
│   │   ├── stepper/            # Wizard progress stepper for checkout & tracking
│   │   └── ui/                 # Reusable shadcn/ui components (buttons, dialogs, inputs)
│   └── lib/                    # 🧪 Helpers, Schemas & Hooks
│       ├── actions/            # Next.js Server Actions (secure login, register, logout)
│       ├── hooks/              # Custom React hooks
│       ├── http/               # Base Axios client configuration (interceptor endpoints)
│       ├── store/              # Redux slices, reducers, and store config
│       ├── session.ts          # Server-side profile session retrieval helper
│       ├── types/              # Common TypeScript definitions & schemas
│       └── utils.ts            # Utility functions (cn, hashTheItem, priceCalculators)
```

---

## 🚀 Quick Start

### 1. Prerequisites
Ensure you have **Node.js** (v18+) installed.

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
# URL of the backend API Gateway (accessible by the Next.js server container)
BACKEND_URL=http://localhost:5501

# Public URL of the backend API Gateway (accessible by the client browser)
NEXT_PUBLIC_BACKEND_URL=http://localhost:5501
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 5. Build and Start in Production
```bash
# Build the production bundle
npm run build

# Start the built Next.js server
npm run start

# Run EsLint checks
npm run lint
```

---

## 🧭 Crucial Architectural Patterns

### 1. SSR-Safe Redux Hydrator
To prevent Hydration Mismatch errors, `StoreProvider.tsx` initializes the Redux store lazily using React's `useRef` hook.
```typescript
const storeRef = useRef<AppStore>();
if (!storeRef.current) {
    storeRef.current = makeStore();
    // Hydrate cart only on client
    if (typeof window !== 'undefined' && window.localStorage) {
        const cartItems = window.localStorage.getItem('cartItems');
        if (cartItems) {
            storeRef.current.dispatch(setInitialCartItems(JSON.parse(cartItems)));
        }
    }
}
```
This guarantees that server-side HTML matches client-side initial markup before browser-side hydration injects `localStorage` details.

### 2. The Token Refresh Cycle
*   **The Problem**: Secure token cookies are flagged as `HTTP-only` and are invisible to client-side scripts.
*   **The BFF Solution**:
    1.  The client mounts the `<Refresher>` component.
    2.  It polls the local Route Handler `/api/auth/accessToken` which exposes the decoded access token value.
    3.  It decodes the expiration timestamp using `jose.decodeJwt`.
    4.  Schedules a `setTimeout` to query `/api/auth/refresh` 5 seconds prior to expiry, which proxies to the backend to renew cookies.
