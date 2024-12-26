# Suriguard - Suricata Management System

A modern web-based management system for Suricata IDS/IPS.

## Features

- 📊 Real-time Dashboard
  - Server status monitoring (uptime, CPU, memory usage)
  - Log statistics and visualization
  - Event tracking and summary
  - Performance metrics overview
  - Quick access to recent system events

- 📝 Log Management & Analysis
  - Multi-type log parsing (alert, DNS, HTTP, TLS, files)
  - Real-time log collection and monitoring
  - Automatic log type detection
  - Basic log filtering capabilities
  - Log parsing with timestamp and event type validation

- 🚨 Event Management
  - Comprehensive event tracking system
  - Event severity and classification
  - Interactive event timeline
  - Event stage and status tracking
  - Detailed event investigation tools
  - Event history and processing dialogs

- 🛡️ Rules Management
  - Suricata rule listing
  - Rule creation and editing interface
  - Rule enable/disable functionality
  - Basic rule modification capabilities
  - Rule metadata tracking (SID, revision, priority)

- 👥 User Management
  - User list view
  - Basic user creation and editing
  - User profile management
  - Simple access control mechanisms

- ⚙️ System Settings
  - Database configuration options
  - Suricata configuration management
  - Basic system and application settings
  - Configuration view and basic editing

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

## Prerequisites

- Node.js (v16+ recommended)
- npm or Yarn
- Suricata IDS/IPS installed and configured
- SQLite3

## Installation

1. Clone the repository
```bash
git clone https://github.com/SEc-123/SuriGuard1.git
cd suriguard
```

2. Install dependencies
```bash
npm install
```

3. Configure Suricata
- Ensure Suricata is installed and running
- Update log paths in configuration files
- Set up appropriate network interfaces

4. Initialize Database
```bash
npm run db:init
```

5. Start the application
```bash
npm run dev
```

## Security Considerations

- Always keep Suricata and Suriguard updated
- Use strong, unique passwords
- Limit network access to the Suriguard interface
- Regularly backup your configuration and logs
- Monitor system logs for any suspicious activities

## Performance Optimization

- Allocate sufficient system resources
- Use SSD for log storage
- Configure log rotation to manage disk space
- Adjust Suricata rules for your specific network environment

## Troubleshooting

- Check Suricata log files for configuration errors
- Verify database connectivity
- Ensure all dependencies are correctly installed
- Review application logs for detailed error information

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## Contact

Your Name -businessformadison0818@gmail.com

Project Link: （https://github.com/SEc-123/SuriGuard1.git)

## Acknowledgements

- Suricata IDS/IPS
- React
- TypeScript
- Tailwind CSS
- SQLite
## Project Status

🚧 **Early Development Stage** 🚧

This is an initial version of SuriGuard, and we are actively seeking:

- 🐞 **Bug Testers**: Help us identify and fix issues
- 💡 **Feature Suggestions**: Share your ideas for improvement
- 🤝 **Community Contributors**: Join us in developing this open-source project

**We welcome all forms of contribution!**

Our goals:
- Continuously improve functionality
- Enhance user experience
- Build a robust, community-driven security monitoring tool

If you find any bugs or have suggestions, please open an issue on our GitHub repository. Together, we can make SuriGuard a powerful, reliable security solution.