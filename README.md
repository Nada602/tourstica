<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project. -->



# Tourstica — Implementation Roadmap & Project Tracker

> **Purpose:** This document is the single source of truth for how Tourstica's remaining features (Auth, Search, Filtering, Booking, Profile, Booking History, Protected Routes) get built. It is not a tutorial — it is a working tracker. Update the checkboxes and the progress table as you go. Re-read the **Notes** section of a phase before starting it, not after finishing it.

**Stack:** React + Vite + Redux (Redux Toolkit) + Tailwind CSS + json-server (mock backend, to be replaced later by the real API)

---

# Phase 0 — Foundations

## Goal
Establish the project's skeleton conventions — folder structure, store shape, mock backend schema, and the API abstraction layer — before any UI exists. Nothing visual is expected to come out of this phase.

## Why this phase comes now
Every later phase depends on conventions established here. Folder structure, the API client, and the Redux store shape are expensive to retrofit once 10+ components already exist and don't follow them. This phase has zero dependencies — it's the only phase that can start with nothing.

## Tasks
- [ ] Decide and document folder structure convention (feature-based: `features/trips`, `features/auth`, `features/booking`, `features/profile`)
- [ ] Set up Redux Toolkit store with empty slices: `auth`, `bookingDraft`, `trips`, `bookings`
- [ ] Design `db.json` schema for json-server: `users`, `trips`, `bookings`, `reviews`, `wishlist` — each junction resource (`bookings`, `reviews`, `wishlist`) carries both `userId` and `tripId`
- [ ] Seed `db.json` with realistic dummy data for at least 5–8 trips
- [ ] Build a single API client wrapper (one configured `axios` instance, base URL pointing at json-server) — all future requests go through this file only
- [ ] Extract design tokens from Figma (colors, spacing, font families/sizes) into Tailwind config
- [ ] Confirm `npm run dev` runs cleanly with no console errors

## Deliverables
- Empty but correctly structured Redux store
- Running json-server instance with seeded `db.json`
- One reusable API client module
- Tailwind config reflecting Figma design tokens

## Definition of Done
The app runs, renders a blank screen with zero console errors, and a manual test call through the API client successfully logs a response from json-server in the console.

## Notes
- **Architectural decision:** All HTTP calls go through one API client module. This is what makes swapping json-server for the real backend later a one-file change instead of a rewrite.
- **Common mistake to avoid:** Don't start writing screens "just to see something on screen" before this phase is done. The cost of skipping this phase is paid later, with interest, when conventions have to be retrofitted into existing code.

---

# Phase 1 — Layouts + Routing Skeleton

## Goal
Build the two layout shells (`MainLayout`, `AuthLayout`) and wire up all 11 routes as nested children, each rendering a placeholder. Prove the navigation structure is sound before any real content exists.

## Why this phase comes now
Layouts are a prerequisite for routes to mean anything — a route can't render meaningfully without a layout to render inside. This must come before any real screen is built.

## Tasks
- [ ] Build `MainLayout`: Navbar + `<Outlet />` + Footer
- [ ] Build `AuthLayout`: static image+copy panel (left) + swappable content panel (right) + logo
- [ ] Set up React Router with nested routes under each layout
- [ ] Create placeholder components for all 11 routes:
  - [ ] `/`
  - [ ] `/login`
  - [ ] `/register`
  - [ ] `/forgot-password`
  - [ ] `/verify-email`
  - [ ] `/create-password`
  - [ ] `/trips`
  - [ ] `/trip/:id`
  - [ ] `/checkout/:id`
  - [ ] `/booking-confirm/:id`
  - [ ] `/my-journey`
- [ ] Verify Navbar links route correctly to their target pages
- [ ] Confirm `AuthLayout` routes do NOT render the main Navbar/Footer

## Deliverables
- Two functioning layout components
- 11 working, navigable routes, each showing a stub

## Definition of Done
Every link in the Navbar and every route in the list above is reachable and renders inside the correct layout (Main vs Auth) with no broken paths.

## Notes
- **Architectural decision:** Two layouts, not one — `MainLayout` for public/app screens, `AuthLayout` for the 5 auth screens (Login, Register, Forgot Password, Verify Email, Create Password), since the latter share no Navbar/Footer with the rest of the app.
- **Common mistake to avoid:** Don't build routes before layouts exist — a route with nothing to render inside of proves nothing.

---

# Phase 2 — Reusable Component Library

## Goal
Build `Button`, `Input`, `TripCard`, and `TabGroup`/`PillSelector` in isolation, against dummy props, before any real page consumes them.

## Why this phase comes now
Building a component while simultaneously building the first page that uses it tends to bake that page's specific data shape into the component, defeating the purpose of making it reusable. Building it standalone first forces a clean, generic prop API.

## Tasks
- [ ] Build `Button` with primary/secondary variants
- [ ] Build `Input` supporting label, error message, password-visibility toggle, and type — verify it covers every form across Login/Register/Forgot Password/Profile/Checkout
- [ ] Build `TripCard` with variant prop (`grid` vs `wishlist`) — same underlying layout (image, title, location, rating, duration, price), differing only in the top-right icon (heart vs trash) and bottom action (View vs Book Now)
- [ ] Build `TabGroup`/`PillSelector` — pill-shaped buttons with active/inactive state, accepting an `onSelect` callback so behavior is injected by the parent, not hardcoded inside the component
- [ ] Build the static `AuthLayout` visual content (image + copy + bullet list) reused across all 5 auth screens
- [ ] Test each component against dummy/fake data on a scratch route

## Deliverables
- A working component library: `Button`, `Input`, `TripCard`, `TabGroup`
- Confirmed variants for each (TripCard grid/wishlist, Button primary/secondary)

## Definition of Done
Each component renders correctly with fake props, including every variant, with no dependency on any real page or real API data.

## Notes
- **Architectural decision (TripCard):** One component, variant-driven — not two separate components that duplicate the same image/title/location/rating/duration/price layout.
- **Architectural decision (TabGroup):** Presentation (shape, active state, click target) is shared; behavior (what happens on selection — filtering vs swapping content) is injected via callback. Same component powers the My Journey tab bar, the "Trending/Just added/Top rated" filter, and "Popular searches" chips.
- **Common mistake to avoid:** Don't reach for "just build it inline on the page" convenience — a component built and tested in isolation surfaces a clean prop API; one coupled to a specific page's data shape breaks the first time it's reused elsewhere.
- **Common mistake to avoid (the opposite trap):** Don't force reusability where none exists — the "My Journey" page shell (header + tab bar + content area) is used exactly once and should remain a plain page, not an over-engineered generic layout.

---

# Phase 3 — Public Screens: Trips Listing + Trip Details (Read-Only)

## Goal
Build the full read-only browsing experience — `/trips` and `/trip/:id` — with zero dependency on auth or booking state.

## Why this phase comes now
These screens have no dependency on auth or booking logic, making them the first real (non-stub) screens that can be built and fully tested independently. This phase is also the first real workout for the Phase 0 API client and Phase 2 component library.

## Tasks
- [ ] `/trips`: fetch trip list, render `TripCard` grid
- [ ] `/trips`: wire up search input (client-side filtering against the full dataset for now)
- [ ] `/trips`: wire up filter chips using `TabGroup` (category/quick-filter pills)
- [ ] `/trip/:id`: fetch `GET /trips/:id` — render gallery, title, location, rating, duration, host info, "The Experience," "What You'll Do," "What's Included"/"Not Included"
- [ ] `/trip/:id`: fetch `GET /trips/:id/reviews` as a **separate** call (do not nest reviews inside the trip object)
- [ ] `/trip/:id`: build the booking widget UI — date picker, guest counter, experience type selector
- [ ] `/trip/:id`: "Book Now" button logs selected values to console (not yet functional — Checkout doesn't exist yet)

## Deliverables
- Fully functional `/trips` page: browse, search, filter
- Fully functional `/trip/:id` page: full detail view + reviews, booking widget UI present but not wired to Checkout yet

## Definition of Done
A logged-out visitor can browse all trips, search, filter, open any trip, and read its full details and reviews — entirely without touching auth.

## Notes
- **Architectural decision:** Reviews are fetched via a separate endpoint (`GET /trips/:id/reviews`), not nested in the trip response, because review counts are unbounded and need independent pagination. Apply this same "bounded vs. unbounded" test to any future data-shape decision: if a piece of data can grow indefinitely and may need its own pagination/sorting, give it its own resource and its own request.
- **Common mistake to avoid:** Don't try to make "Book Now" fully functional yet — Checkout and the auth gate don't exist until Phases 4–5. A console.log of the selected values is the correct scope here.

---

# Phase 4 — Auth (Mock First, Then Real)

## Goal
Establish a working `auth` slice and a functioning `ProtectedRoute` wrapper early — first against a fake/manual toggle, then against real Login/Register/Forgot Password/Verify Email/Create Password screens.

## Why this phase comes now
Checkout and My Journey (Phase 5–6) are Protected Routes with specific redirect-and-bounce-back behavior. That logic needs to exist and be tested *before* those pages are built, not retrofitted afterward. Splitting this phase into mock-first/real-second means downstream phases are never blocked waiting on polished auth UI.

## Tasks
**4a — Mock auth**
- [ ] Add `auth` slice to Redux: `{ user: null }`
- [ ] Build `ProtectedRoute` wrapper component: redirects to `/login` if `auth.user` is null, remembers intended destination, redirects back after successful login
- [ ] Add a temporary manual toggle (debug button or hardcoded value) to set/clear `auth.user` for testing
- [ ] Verify `ProtectedRoute` correctly blocks and correctly bounces back using the mock toggle

**4b — Real auth UI**
- [ ] Build `/login` — form using `Input`/`Button`, lookup against json-server (`GET /users?email=X`), write matched user into `auth` slice
- [ ] Build `/register` — create new user in json-server, log in immediately on success (no email verification required for registration)
- [ ] Build `/forgot-password` — email input, "Send Reset Link"
- [ ] Build `/verify-email` — 6-digit code input, part of the forgot-password chain only
- [ ] Build `/create-password` — new password + confirm, completes the forgot-password chain, returns to `/login`
- [ ] Swap the mock toggle for the real login flow — confirm `ProtectedRoute` still works unchanged

## Deliverables
- Working `auth` Redux slice
- Working `ProtectedRoute`, verified against both mock and real auth
- All 5 auth screens functional against json-server

## Definition of Done
`ProtectedRoute` correctly blocks unauthenticated access and redirects back to the original destination after login — verified first with the mock toggle, then re-verified with the real Login/Register flow with no changes needed downstream.

## Notes
- **Architectural decision:** "Verify Email" belongs exclusively to the Forgot Password chain — Forgot Password → Verify Email → Create Password → Login. Registration does not require verification; it logs the user in immediately.
- **Architectural decision ("mock first, real second"):** Build the consumer (`ProtectedRoute`, and later Checkout/My Journey) against a stable interface (`auth.user`) early, so the producer of that value (a debug toggle vs. a real login form) can be swapped without touching anything downstream.
- **Common mistake to avoid:** Don't wait for fully polished Login/Register UI before building Protected Routes — that blocks Phase 5/6 unnecessarily. Mock it cheaply first.

---

# Phase 5 — Booking Flow: Trip Details → Checkout → Booking Confirmed

## Goal
Make the end-to-end booking flow real: clicking "Book Now" carries the user's selections through a possible login detour, into Checkout, through payment, to a confirmation screen.

## Why this phase comes now
This is the most dependency-heavy phase in the project — it requires Phase 2 (components), Phase 3 (real Trip Details with a working booking widget), and Phase 4 (a working auth gate) to all already exist. It cannot be built, let alone tested, any earlier.

## Tasks
- [ ] On "Book Now," dispatch a Redux action writing `{ tripId, date, guests, experienceType }` into the `bookingDraft` slice
- [ ] Navigate to `/checkout/:id` after dispatch
- [ ] Wrap `/checkout/:id` in `ProtectedRoute`
- [ ] `/checkout/:id`: read trip id from the URL, read date/guests/experienceType from `bookingDraft`
- [ ] Handle the "empty store" edge case: if `bookingDraft` is empty on load (e.g. hard refresh), redirect back to `/trip/:id` with a message asking the user to re-select their trip details
- [ ] Build Checkout form: Your Information (name, email, phone, special requests), Payment Method selector (Credit Card / PayPal / Bank Transfer), conditional card fields
- [ ] Build Booking Summary sidebar: trip snapshot, date, price × guests, subtotal, service fee, total
- [ ] On "Confirm & Pay," `POST /bookings` to json-server
- [ ] Build `/booking-confirm/:id`: success message, order summary, "View My Trips" and "Explore More" actions

## Deliverables
- Fully functional booking flow from Trip Details through to a real, persisted booking in json-server

## Definition of Done
A logged-out visitor can: browse → select a trip → pick date/guests/type → get redirected through login (preserving their original destination) → land back on Checkout with selections intact → complete payment → see a real confirmation screen. This is the single most important milestone in the project.

## Notes
- **Architectural decision:** `bookingDraft` lives in Redux, not localStorage. This flow is pure in-app navigation (no hard refresh involved), so Redux alone is sufficient — global state management and persistence are separate concerns, and this flow only needs the former.
- **Architectural decision:** The trip `:id` lives in the Checkout URL even though Redux also has it, specifically so the app can recover *which trip* (though not the date/guests/type) if the store is empty on load.
- **Common mistake to avoid:** Don't reach for localStorage by default just because data needs to "move between pages." Check first whether a hard refresh or full reload is actually involved in the flow being built.

---

# Phase 6 — My Journey (All 4 Tabs)

## Goal
Build `/my-journey` with its four tabs — Trips, Wishlist, Profile, Reviews — populated with real data.

## Why this phase comes now
The Trips tab has nothing meaningful to display until real bookings can be created, which only became possible in Phase 5. Building this earlier means testing against manually seeded fake data that gets thrown away.

## Tasks
- [ ] Wrap `/my-journey` in `ProtectedRoute`
- [ ] Build tab bar using `TabGroup`, in-memory state, defaulting to Trips tab on load/refresh
- [ ] Trips tab: fetch `GET /bookings?userId=X`, render booking rows (thumbnail, name, date, guests, price, status badges, Details/Cancel actions)
- [ ] Wishlist tab: fetch wishlist resource for the user, render `TripCard` in its `wishlist` variant
- [ ] Profile tab: fetch user info, build editable form (Full Name, Email, Phone, Preferred Language) + change-password sub-section
- [ ] Reviews tab: fetch the user's own authored reviews, render list

## Deliverables
- Fully functional `/my-journey` with all 4 tabs wired to real json-server data

## Definition of Done
A logged-in user sees their actual bookings (created in Phase 5), can manage their wishlist, edit their profile, and see their authored reviews — all tabs reset to Trips on refresh, as decided.

## Notes
- **Architectural decision:** Bookings, Wishlist, and Reviews are each their own resource (`?userId=X` filtered), not nested inside the user object — all three are unbounded over a user's lifetime and behave as junction entities between User and Trip.
- **Architectural decision:** Tab state is in-memory only (`useState`), not URL-based — a deliberate trade-off; refreshing always returns to the default (Trips) tab.

---

# Phase 7 — Polish: Gaps the Figma File Never Covered

## Goal
Design and build the states the Figma file never specified: loading, empty, error, and 404.

## Why this phase comes now
These states only make sense once the real screens they apply to already exist — designing a generic "empty state" in the abstract, before knowing what's actually empty, tends to produce something generic and wrong.

## Tasks
- [ ] Loading states/skeletons for every data-fetching screen (`/trips`, `/trip/:id`, `/my-journey` tabs)
- [ ] Empty states: "no trips match your search," "your wishlist is empty," "no bookings yet," "no reviews yet"
- [ ] Error states: failed fetch, failed payment on Checkout
- [ ] 404 / "page not found" screen
- [ ] Pass over all screens to confirm consistent Navbar (Home / Explore only — note some Figma screens still show an outdated 4-item nav; build to the final agreed spec, not every screenshot)

## Deliverables
- Loading, empty, error, and 404 states across the app

## Definition of Done
No screen in the app shows a broken or blank state under any realistic condition — empty data, slow network, failed request, or an invalid URL.

## Notes
- **Common mistake to avoid:** Don't design these in isolation before Phase 3–6 are done — you need real screens to know what "empty" or "loading" actually looks like for each one.

---

# Overall Progress

| Phase | Status | Notes |
|--------|--------|-------|
| Phase 0 — Foundations | ⬜ Not Started | |
| Phase 1 — Layouts + Routing | ⬜ Not Started | |
| Phase 2 — Component Library | ⬜ Not Started | |
| Phase 3 — Trips + Trip Details | ⬜ Not Started | |
| Phase 4 — Auth | ⬜ Not Started | |
| Phase 5 — Booking Flow | ⬜ Not Started | |
| Phase 6 — My Journey | ⬜ Not Started | |
| Phase 7 — Polish | ⬜ Not Started | |

---

# Architecture Decisions

A running log of the key decisions made during planning, and the reasoning behind each — refer back here before introducing anything that might contradict one of these.

- **Feature-based folder structure** — code organized by feature (`features/trips`, `features/auth`, `features/booking`) rather than by file type, decided in Phase 0.
- **Two layouts, not one** — `MainLayout` (Navbar + Footer) for public/app screens; `AuthLayout` (split-screen shell) for the 5 auth screens, which share no Navbar/Footer with the rest of the app.
- **API abstraction layer** — every HTTP call goes through a single API client module, so replacing json-server with the real backend later is a one-file change.
- **`TripCard` is one component, variant-driven** — not duplicated across grid/wishlist contexts, since the underlying data shape (image, title, location, rating, duration, price) is identical; only the icon and action button differ.
- **`TabGroup`/`PillSelector` separates presentation from behavior** — shared visual component (pill shape, active state), with the actual on-select action injected via callback by the parent. Reused across My Journey's tab bar, the Trending filter, and Popular Searches chips, despite each triggering different behavior (content swap vs. filtering).
- **Separate Reviews endpoint** — `GET /trips/:id/reviews` is its own request, not nested in `GET /trips/:id`, because review counts are unbounded and need independent pagination. General principle: split data into its own resource when it can grow indefinitely and may need its own pagination/sorting; keep it nested when it's small and bounded (e.g. the booking availability calendar, which stays nested).
- **Bookings, Reviews, and Wishlist are independent resources, not nested in User** — same unbounded-growth principle; all three are junction entities connecting User and Trip.
- **Redux `bookingDraft` slice** — carries `{ tripId, date, guests, experienceType }` from Trip Details to Checkout. Sufficient because this is pure in-app navigation (no hard refresh involved) — global state management and persistence are separate concerns, and this flow only needs the former.
- **Checkout keeps `:id` in its URL even though Redux also has it** — recovers which trip is being checked out if the store is empty on load (e.g. hard refresh), enabling a graceful redirect back to Trip Details instead of a broken page.
- **Protected Routes with redirect-and-return** — both `/checkout/:id` and `/my-journey` redirect unauthenticated users to `/login` and bounce them back to their original destination after successful login.
- **Mock-first, real-second for Auth** — `ProtectedRoute` and all downstream protected pages are built and tested against a manually toggled fake `auth.user` before real Login/Register UI exists, so downstream work is never blocked on auth polish.
- **Producer-before-consumer, mocked cheaply when blocking** — general principle applied throughout: build the thing that creates data before the thing that consumes it, but fake the producer cheaply (e.g. mock auth) when building the real version first would block everything downstream.
- **My Journey tab state is in-memory, not URL-based** — deliberate trade-off; refreshing the page always resets to the default (Trips) tab rather than supporting bookmarkable/refreshable tab URLs.
- **Verify Email belongs only to the Forgot Password chain** — not part of Registration, which logs users in immediately without an email verification step.