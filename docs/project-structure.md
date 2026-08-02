# RoomMateX Project Structure

```txt
src/
  app/                  App shell: routes, layouts, providers
  api/                  Low-level API files grouped by backend endpoint
  assets/               Static images, icons, and imported media
  components/
    ui/                 Reusable UI primitives
  config/               Environment and app configuration
  constants/            Shared constant lists and enums
  features/
    auth/               Login, registration, profile, session
    rooms/              Room setup, members, invite codes
    dashboard/          App overview and summaries
    expenses/           Expense CRUD, filters, receipts
    payments/           Contributions, verification, screenshots
    reimbursements/     Personal purchases and approval flow
    wallet/             Room wallet and transactions
    settlements/        Monthly calculations and balances
    notifications/      Alerts and reminders
    reports/            Reports and exports
    analytics/          Charts and spending insights
  hooks/                Shared React hooks
  lib/                  Shared infrastructure helpers
  schemas/              Shared Zod schemas
  services/             Shared business services
  stores/               Global Zustand stores
  types/                Shared type definitions
  utils/                Formatting and pure utility functions
```

## Feature Folder Pattern

Each feature can grow with this structure:

```txt
feature-name/
  components/           Feature-only UI components
  hooks/                Feature-only hooks
  pages/                Route-level screens
  schemas/              Zod validation schemas
  services/             API/business orchestration
  stores/               Zustand state for this feature
```

Use `src/stores` only for state shared across multiple features, such as app session, current room, theme, or global notifications.

