# SuriGuard - Suricata Open Source Management System

A modern web-based management system for Suricata IDS/IPS, featuring advanced analytics and visualization capabilities.

## ≡ƒîƒ Key Features

- ≡ƒ¢í∩╕Å **Suricata Configuration Management**
  - Real-time Suricata configuration view and edit
  - Configuration file path management
  - Live configuration content preview
  - One-click Suricata service restart

- ≡ƒôê **Advanced Analytics Dashboard**
  - Interactive data visualization
  - Customizable chart creation
  - Multi-dimensional data aggregation
  - Preset analytics templates
  - Time-range filtering
  - Chart type selector
  - Advanced data correlation
  - Predictive trend analysis

- ≡ƒôè **System Performance Monitoring**
  - Real-time server resource tracking
  - CPU usage monitoring
  - Memory consumption analysis
  - Network load tracking
  - System uptime statistics

- ≡ƒÜ¿ **Security Event Management**
  - Real-time event monitoring and tracking
  - Event severity classification
  - Event correlation analysis
  - Automated event response workflows
  - Event processing stage management

- ≡ƒôï **Rule Management System**
  - Rule file import/export
  - Custom rule creation
  - Rule status toggling
  - Rule performance monitoring
  - Rule parsing and formatting

- ≡ƒöì **Log Analysis**
  - Multi-type log capture
  - Real-time log monitoring
  - Log filtering and retrieval
  - Detailed log event analysis
  - Multi-dimensional log statistics

- ≡ƒæÑ **User Management**
  - Role-based access control
  - User authentication and authorization
  - User session management
  - Login/logout auditing
  - User activity tracking

- ΓÜÖ∩╕Å **System Configuration**
  - Database connection configuration
  - System parameter adjustment
  - Integration and extension settings
  - Security configuration management


![image](https://github.com/user-attachments/assets/9f01d805-baf7-481e-ad33-1260f258d9a1)
![image](https://github.com/user-attachments/assets/2da0d239-424b-4a9e-8385-3c656ea7ec40)
![image](https://github.com/user-attachments/assets/000e032b-dcf0-4cd3-9781-c202bead77a8)
![image](https://github.com/user-attachments/assets/9715c205-e66f-45de-988a-94619e9124b7)
![image](https://github.com/user-attachments/assets/7ff116da-61b6-4b92-b4cf-3a7273dfcd4e)


## ≡ƒ¢á∩╕Å Technology Stack

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

## ≡ƒôü Project Structure

```
suriguard/
Γö£ΓöÇΓöÇ src/
Γöé   Γö£ΓöÇΓöÇ components/              # Reusable UI components
Γöé   Γöé   Γö£ΓöÇΓöÇ analytics/          # Analytics components
Γöé   Γöé   Γöé   Γö£ΓöÇΓöÇ AnalyticsChart.tsx
Γöé   Γöé   Γöé   Γö£ΓöÇΓöÇ ChartTypeSelector.tsx
Γöé   Γöé   Γöé   Γö£ΓöÇΓöÇ CreateAnalyticsModal.tsx
Γöé   Γöé   Γöé   ΓööΓöÇΓöÇ TimeRangeSelector.tsx
Γöé   Γöé   Γö£ΓöÇΓöÇ auth/              # Authentication components
Γöé   Γöé   Γöé   Γö£ΓöÇΓöÇ LoginForm.tsx
Γöé   Γöé   Γöé   ΓööΓöÇΓöÇ LoginLogo.tsx
Γöé   Γöé   Γö£ΓöÇΓöÇ Header.tsx        # Main header component
Γöé   Γöé   Γö£ΓöÇΓöÇ Logo.tsx          # Logo component
Γöé   Γöé   ΓööΓöÇΓöÇ Sidebar.tsx       # Navigation sidebar
Γöé   Γöé
Γöé   Γö£ΓöÇΓöÇ pages/                  # Page components
Γöé   Γöé   Γö£ΓöÇΓöÇ analytics/         # Analytics dashboard
Γöé   Γöé   Γöé   Γö£ΓöÇΓöÇ AnalyticsDashboard.tsx
Γöé   Γöé   Γöé   ΓööΓöÇΓöÇ components/
Γöé   Γöé   Γöé       Γö£ΓöÇΓöÇ ChartRenderer.tsx
Γöé   Γöé   Γöé       Γö£ΓöÇΓöÇ CreateVisualizationModal.tsx
Γöé   Γöé   Γöé       ΓööΓöÇΓöÇ VisualizationCard.tsx
Γöé   Γöé   Γö£ΓöÇΓöÇ auth/             # Authentication pages
Γöé   Γöé   Γöé   ΓööΓöÇΓöÇ Login.tsx
Γöé   Γöé   Γö£ΓöÇΓöÇ dashboard/        # Main dashboard
Γöé   Γöé   Γö£ΓöÇΓöÇ events/          # Event management
Γöé   Γöé   Γö£ΓöÇΓöÇ logs/           # Log management
Γöé   Γöé   Γö£ΓöÇΓöÇ rules/          # Rules management
Γöé   Γöé   Γö£ΓöÇΓöÇ settings/       # System settings
Γöé   Γöé   ΓööΓöÇΓöÇ users/          # User management
Γöé   Γöé
Γöé   Γö£ΓöÇΓöÇ services/               # Business logic & API
Γöé   Γöé   Γö£ΓöÇΓöÇ analyticsService.ts
Γöé   Γöé   Γö£ΓöÇΓöÇ filterService.ts
Γöé   Γöé   Γö£ΓöÇΓöÇ presetFilterService.ts
Γöé   Γöé   Γö£ΓöÇΓöÇ userService.ts
Γöé   Γöé   Γö£ΓöÇΓöÇ visualizationService.ts
Γöé   Γöé   ΓööΓöÇΓöÇ backend/          # Backend services
Γöé   Γöé       ΓööΓöÇΓöÇ database.ts
Γöé   Γöé
Γöé   Γö£ΓöÇΓöÇ types/                  # TypeScript definitions
Γöé   Γöé   Γö£ΓöÇΓöÇ analytics.ts
Γöé   Γöé   Γö£ΓöÇΓöÇ filter.ts
Γöé   Γöé   Γö£ΓöÇΓöÇ presetFilter.ts
Γöé   Γöé   ΓööΓöÇΓöÇ user.ts
Γöé   Γöé
Γöé   ΓööΓöÇΓöÇ utils/                  # Utility functions
Γöé       ΓööΓöÇΓöÇ logFilters.ts
Γöé
Γö£ΓöÇΓöÇ scripts/                    # Build & deployment scripts
Γöé   Γö£ΓöÇΓöÇ deploy.bat             # Windows deployment script
Γöé   ΓööΓöÇΓöÇ initDb.js             # Database initialization
Γöé
Γö£ΓöÇΓöÇ data/                       # Database & data files
Γöé   ΓööΓöÇΓöÇ suriguard.db          # SQLite database
Γöé
ΓööΓöÇΓöÇ dist/                       # Production build
```

## ≡ƒÜÇ Quick Start

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

## ≡ƒôè Database Schema

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

## ≡ƒöä Version History

- **v1.2.0** - Major Update
  - Added advanced analytics dashboard
  - Implemented preset filters system
  - Fixed display bugs
  - Resolved Node.js vulnerabilities
  - Migrated to SQLite for better performance

- **v1.1.1** - Security Update
  - Fixed Node.js vulnerabilities
  - Improved database handling

## ≡ƒô¥ License

[MIT License](LICENSE)

## ≡ƒñ¥ Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.
