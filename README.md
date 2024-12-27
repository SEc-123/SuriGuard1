# SuriGuard - Suricata Management System

A modern web-based management system for Suricata IDS/IPS, featuring advanced analytics and visualization capabilities.

## 🌟 Key Features

- 📊 **Advanced Analytics Dashboard**
  - Real-time data visualization
  - Customizable charts and graphs
  - Preset analytics templates
  - Time-based trend analysis

- 🔍 **Enhanced Log Management**
  - Advanced filtering system
  - Custom filter presets
  - Real-time log analysis
  - Pattern recognition

- 🚨 **Event Management**
  - Real-time event monitoring
  - Severity-based categorization
  - Event correlation analysis
  - Automated response workflows

- 🛡️ **Rules Management**
  - Rule import/export
  - Custom rule creation
  - Rule performance monitoring
  - Version control integration

- 👥 **User Management**
  - Role-based access control
  - Activity monitoring
  - Session management
  - Audit logging

## 🛠️ Technology Stack

- **Frontend**
  - React 18.3 with TypeScript
  - Vite 5.4 for build tooling
  - TailwindCSS for styling
  - Lucide Icons for UI elements

- **State Management**
  - React Hooks
  - Context API
  - Custom service layer

- **Data Storage**
  - SQLite3 with better-sqlite3
  - IndexedDB for client-side caching
  - File system for log storage

## 📁 Project Structure

```
suriguard/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── analytics/          # Analytics components
│   │   │   ├── AnalyticsChart.tsx
│   │   │   ├── ChartTypeSelector.tsx
│   │   │   ├── CreateAnalyticsModal.tsx
│   │   │   └── TimeRangeSelector.tsx
│   │   ├── auth/              # Authentication components
│   │   │   ├── LoginForm.tsx
│   │   │   └── LoginLogo.tsx
│   │   ├── Header.tsx        # Main header component
│   │   ├── Logo.tsx          # Logo component
│   │   └── Sidebar.tsx       # Navigation sidebar
│   │
│   ├── pages/                  # Page components
│   │   ├── analytics/         # Analytics dashboard
│   │   │   ├── AnalyticsDashboard.tsx
│   │   │   └── components/
│   │   │       ├── ChartRenderer.tsx
│   │   │       ├── CreateVisualizationModal.tsx
│   │   │       └── VisualizationCard.tsx
│   │   ├── auth/             # Authentication pages
│   │   │   └── Login.tsx
│   │   ├── dashboard/        # Main dashboard
│   │   ├── events/          # Event management
│   │   ├── logs/           # Log management
│   │   ├── rules/          # Rules management
│   │   ├── settings/       # System settings
│   │   └── users/          # User management
│   │
│   ├── services/               # Business logic & API
│   │   ├── analyticsService.ts
│   │   ├── filterService.ts
│   │   ├── presetFilterService.ts
│   │   ├── userService.ts
│   │   ├── visualizationService.ts
│   │   └── backend/          # Backend services
│   │       └── database.ts
│   │
│   ├── types/                  # TypeScript definitions
│   │   ├── analytics.ts
│   │   ├── filter.ts
│   │   ├── presetFilter.ts
│   │   └── user.ts
│   │
│   └── utils/                  # Utility functions
│       └── logFilters.ts
│
├── scripts/                    # Build & deployment scripts
│   ├── deploy.bat             # Windows deployment script
│   └── initDb.js             # Database initialization
│
├── data/                       # Database & data files
│   └── suriguard.db          # SQLite database
│
└── dist/                       # Production build
```

## 🚀 Quick Start

1. **Prerequisites**
   - Node.js >= 18.0.0
   - npm >= 9.0.0

2. **Installation**
   ```bash
   npm install
   ```

3. **Initialize Database**
   ```bash
   npm run db:init
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

## 📊 Database Schema

### Preset Filters
```sql
CREATE TABLE preset_filters (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  conditions TEXT NOT NULL,
  is_system INTEGER DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Analytics
```sql
CREATE TABLE preset_analytics (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  filter_id TEXT NOT NULL,
  chart_type TEXT NOT NULL,
  aggregation TEXT NOT NULL,
  group_by TEXT NOT NULL,
  time_range TEXT,
  FOREIGN KEY (filter_id) REFERENCES preset_filters(id)
);
```

## 🔄 Version History

- **v1.2.0** - Major Update
  - Added advanced analytics dashboard
  - Implemented preset filters system
  - Fixed display bugs
  - Resolved Node.js vulnerabilities
  - Migrated to SQLite for better performance

- **v1.1.1** - Security Update
  - Fixed Node.js vulnerabilities
  - Improved database handling

## 📝 License

[MIT License](LICENSE)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.