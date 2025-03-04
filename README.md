# Suriguard - Suricata Management System

A modern web-based management system for Suricata IDS/IPS.

## Features

- 📊 Real-time Dashboard
- 📝 Log Management & Analysis
- 🚨 Event Management
- 🛡️ Rules Management
- 👥 User Management
- ⚙️ System Settings

## Technology Stack

- Frontend: React + TypeScript + Vite
- UI: Tailwind CSS + Lucide Icons
- State Management: React Hooks
- Routing: React Router
- Database: SQLite

## Project Structure

```
suriguard/
├── public/                 # Static assets
│   └── logo/              # Logo files
├── src/
│   ├── components/        # Reusable components
│   │   ├── auth/         # Authentication components
│   │   ├── layout/       # Layout components
│   │   └── logs/         # Log-related components
│   ├── pages/            # Page components
│   │   ├── auth/         # Authentication pages
│   │   ├── dashboard/    # Dashboard
│   │   ├── events/       # Event management
│   │   ├── logs/         # Log management
│   │   ├── rules/        # Rules management
│   │   ├── settings/     # Settings
│   │   └── users/        # User management
│   ├── services/         # API services
│   │   └── backend/      # Backend services
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
└── database/             # SQLite database files
```

## Configuration

### Suricata Configuration

The Suricata configuration path is defined in `src/config/core.config.ts`:

```typescript
// Default configuration - update during initial setup
const config: SuricataConfig = {
  configPath: '/etc/suricata/suricata.yaml'
};
```

You can modify this path in the system settings UI or directly in the configuration file.

### Database Configuration

The project uses SQLite as the database. Configure the database connection in the system settings:

```json
{
  "database": {
    "path": "database/suriguard.db"
  }
}
```

## Important Security Notice: Hardcoded Admin Users

There are currently hardcoded admin users in the following locations that MUST be removed in production:

1. In `src/utils/auth.ts`:
```typescript
const USERS = {
  admin: {
    id: '1',
    username: 'admin',
    password: 'admin',
    role: 'admin',
    permissions: ['all']
  }
};
```

2. In `src/types/user.ts`:
```typescript
export const DEFAULT_ADMIN = {
  id: '1',
  username: 'admin',
  password: 'admin123',
  email: 'admin@suriguard.com',
  role: 'super_admin'
};
```

### Removing Hardcoded Users

IMPORTANT: Before removing hardcoded users:
1. Set up proper user management with database storage
2. Create a real admin account through the user management interface
3. Test the new admin account login
4. Only then remove the hardcoded user data

The application is designed to work without these hardcoded users once proper user management is configured.

## Development Guide

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  last_login TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Events Table
```sql
CREATE TABLE events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  start_time DATETIME NOT NULL,
  end_time DATETIME,
  src_ip TEXT NOT NULL,
  dst_ip TEXT NOT NULL,
  protocol TEXT NOT NULL,
  rule_id INTEGER NOT NULL,
  severity INTEGER NOT NULL,
  current_stage TEXT DEFAULT 'Pending',
  handler TEXT,
  last_update DATETIME NOT NULL
);
```

## License

[MIT License](LICENSE)