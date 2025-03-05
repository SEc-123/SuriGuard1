# SuriGuard - Suricata Open Source Management System

A modern web-based management system for Suricata IDS/IPS, featuring advanced analytics and visualization capabilities.

TEST SITE
https://suriguardtest.netlify.app/
## Key Features

### Suricata Configuration Management
- Real-time Suricata configuration viewing and editing  
- Configuration file path management  
- Live configuration content preview  
- One-click Suricata service restart  

### Advanced Analytics Dashboard
- Interactive data visualization  
- Customizable chart creation  
- Multi-dimensional data aggregation  
- Preset analytics templates  
- Time-range filtering  
- Chart type selector  
- Advanced data correlation  
- Predictive trend analysis  

### System Performance Monitoring
- Real-time server resource tracking  
- CPU usage monitoring  
- Memory consumption analysis  
- Network load tracking  
- System uptime statistics  

### Security Event Management
- Real-time event monitoring and tracking  
- Event severity classification  
- Event correlation analysis  
- Automated event response workflows  
- Event processing stage management  

### Rule Management System
- Rule file import/export  
- Custom rule creation  
- Rule status toggling  
- Rule performance monitoring  
- Rule parsing and formatting  

### Log Analysis
- Multi-type log capture  
- Real-time log monitoring  
- Log filtering and retrieval  
- Detailed log event analysis  
- Multi-dimensional log statistics  

### User Management
- Role-based access control  
- User authentication and authorization  
- User session management  
- Login/logout auditing  
- User activity tracking  

### System Configuration
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


## Project Structure

    suriguard/                   # Project root directory
    ├── src/                     # Source code directory containing the main application code
    │   ├── components/          # Reusable UI components
    │   │   ├── analytics/       # Components related to analytics functionality
    │   │   │   ├── AnalyticsChart.tsx        # Renders analytics charts
    │   │   │   ├── ChartTypeSelector.tsx     # Allows selection of different chart types
    │   │   │   ├── CreateAnalyticsModal.tsx  # Modal for creating new analytics entries
    │   │   │   └── TimeRangeSelector.tsx     # Component for selecting time ranges
    │   │   ├── auth/            # Components related to authentication (login, etc.)
    │   │   │   ├── LoginForm.tsx             # Login form component
    │   │   │   └── LoginLogo.tsx             # Displays the login page logo
    │   │   ├── Header.tsx       # Top navigation bar component
    │   │   ├── Logo.tsx         # Application logo component
    │   │   └── Sidebar.tsx      # Sidebar navigation component
    │   ├── pages/               # Page-level components (each subfolder represents a feature page)
    │   │   ├── analytics/       # Analytics dashboard page module
    │   │   │   ├── AnalyticsDashboard.tsx    # Main component for the analytics dashboard
    │   │   │   └── components/  # Sub-components used within the analytics page
    │   │   │       ├── ChartRenderer.tsx      # Renders individual charts on the dashboard
    │   │   │       ├── CreateVisualizationModal.tsx # Modal for creating new visualizations
    │   │   │       └── VisualizationCard.tsx  # Displays a single visualization card
    │   │   ├── auth/            # Authentication pages module
    │   │   │   └── Login.tsx    # Login page component
    │   │   ├── dashboard/       # Main dashboard page (post-login overview)
    │   │   ├── events/          # Event management page module
    │   │   ├── logs/            # Log management page module
    │   │   ├── rules/           # Rules management page module
    │   │   ├── settings/        # System settings page module
    │   │   └── users/           # User management page module
    │   ├── services/            # Core business logic and API communication modules
    │   │   ├── analyticsService.ts     # Handles analytics data processing
    │   │   ├── filterService.ts        # Manages log/event filtering
    │   │   ├── presetFilterService.ts  # Manages preset filters
    │   │   ├── userService.ts          # Handles user data and authentication logic
    │   │   ├── visualizationService.ts # Processes visualization data
    │   │   └── backend/        # Backend-specific modules
    │   │       └── database.ts          # Manages SQLite database connections and queries
    │   ├── types/               # TypeScript definitions (interfaces and type declarations)
    │   │   ├── analytics.ts     # Data types related to analytics
    │   │   ├── filter.ts        # Data types for filtering logic
    │   │   ├── presetFilter.ts  # Data types for preset filters
    │   │   └── user.ts          # User data type definitions
    │   └── utils/               # Utility functions and helpers
    │       └── logFilters.ts    # Utility functions for log filtering
    ├── scripts/                 # Build and deployment scripts
    │   ├── deploy.bat           # Windows batch script for deployment
    │   └── initDb.js            # Script to initialize or reset the database
    ├── data/                    # Data files directory
    │   └── suriguard.db         # SQLite database file for persistent application data
    ├── public/                  # Public static resources directory
    │   ├── index.html           # Entry HTML file for the application
    │   └── ...                  # Other static assets (e.g., favicon, icons)
    ├── dist/                    # Production build output directory (packaged files for deployment)
    ├── package.json             # Project configuration file (dependencies, scripts, etc.)
    ├── package-lock.json        # Lock file to ensure consistent dependency versions
    ├── tsconfig.json            # TypeScript compiler configuration
    ├── tsconfig.app.json        # TypeScript configuration extension for the application
    ├── tailwind.config.js       # Tailwind CSS framework configuration
    ├── postcss.config.js        # PostCSS configuration for processing CSS
    ├── eslint.config.js         # ESLint configuration for code style and linting rules
    ├── .gitignore               # Git ignore file specifying files/directories not to commit
    └── README.md                # Project documentation and instructions

---
---

## Explanation of Each Component

### `src/`
This directory contains the core application source code, organized by functionality.

- **`components/`**  
  Contains reusable UI components:
  - **`analytics/`**:  
    - `AnalyticsChart.tsx`: Renders analytics charts.
    - `ChartTypeSelector.tsx`: Allows users to select different chart types.
    - `CreateAnalyticsModal.tsx`: Provides a modal for creating new analytics entries.
    - `TimeRangeSelector.tsx`: Component for selecting time ranges.
  - **`auth/`**:  
    - `LoginForm.tsx`: Login form component.
    - `LoginLogo.tsx`: Displays the logo on the login page.
  - `Header.tsx`: Top navigation bar component.
  - `Logo.tsx`: Application logo.
  - `Sidebar.tsx`: Sidebar navigation component.

- **`pages/`**  
  Contains page-level components representing different views:
  - **`analytics/`**:  
    - `AnalyticsDashboard.tsx`: Main component for the analytics dashboard.
    - **`components/`** (within analytics):  
      - `ChartRenderer.tsx`: Renders individual charts on the dashboard.
      - `CreateVisualizationModal.tsx`: Modal for creating new visualizations.
      - `VisualizationCard.tsx`: Displays a single visualization card.
  - **`auth/`**:  
    - `Login.tsx`: Login page component.
  - **Other directories**:  
    - `dashboard/`: Main dashboard page after login.
    - `events/`: Event management interface.
    - `logs/`: Log management page.
    - `rules/`: Rules management page.
    - `settings/`: System settings page.
    - `users/`: User management page.

- **`services/`**  
  Contains core business logic and API communication modules:
  - `analyticsService.ts`: Processes and retrieves analytics data.
  - `filterService.ts`: Manages log/event filtering.
  - `presetFilterService.ts`: Manages preset filter configurations.
  - `userService.ts`: Handles user authentication and data management.
  - `visualizationService.ts`: Processes data for visualizations.
  - **`backend/`**:  
    - `database.ts`: Manages SQLite database connections and query operations.

- **`types/`**  
  Holds TypeScript definitions to ensure type safety:
  - `analytics.ts`: Data types related to analytics.
  - `filter.ts`: Data types for filtering logic.
  - `presetFilter.ts`: Data types for preset filters.
  - `user.ts`: User data type definitions.

- **`utils/`**  
  Contains utility functions and helpers:
  - `logFilters.ts`: Provides helper functions for log filtering.

---

### `scripts/`
Includes various scripts used for development and deployment:

- `deploy.bat`: Windows batch script for deploying the application.
- `initDb.js`: Script to initialize or reset the SQLite database.

---

### `data/`
Holds data files:

- `suriguard.db`: SQLite database file used for storing persistent application data.

---

### `public/`
Contains public static resources:

- `index.html`: The entry HTML file for the application.
- Additional static assets like favicons and icons are stored here.

---

### `dist/`
Contains the production build output:

- Packaged files ready for deployment are stored in this directory.

---

### Root-Level Files

- **`package.json` & `package-lock.json`**  
  Define project dependencies, scripts, and ensure consistent dependency versions.
- **`tsconfig.json` & `tsconfig.app.json`**  
  Configuration files for TypeScript compilation.
- **`tailwind.config.js` & `postcss.config.js`**  
  Configuration files for Tailwind CSS and PostCSS, which manage the application’s styling.
- **`eslint.config.js`**  
  Contains rules and settings for ESLint to enforce code style and quality.
- **`.gitignore`**  
  Specifies files and directories that should not be tracked by Git.
- **`README.md`**  
  Provides project documentation and instructions.

---

This revised structure follows best practices by clearly separating source code, static assets, configuration files, and scripts. It is organized to help developers navigate and maintain the project more efficiently.

## Usage Tips

1. **Hard-Coded User Credentials**  
   - **Default Credentials**: The application may come with hard-coded test credentials for demonstration or testing.  
   - **Removing Hard-Coded Users**: To remove these test users, locate the user data or authentication service code (e.g., `userService.ts`) and remove or comment out any placeholder credentials.  
   - **Adding Real Users**: If you need to add actual users, either use the application’s built-in user management features or update your user storage (e.g., a database) with new user entries and proper role assignments.

2. **Rule Management Limitations**  
   - **Single-Line Rules Only**: The current implementation requires each rule to be on a single line. Multi-line rules are not supported and may cause errors or be ignored.
**Example for Rules**
 - alert tcp any any -> any 80 (msg:"Detect HTTP GET Request"; flow:to_server,established; content:"GET"; http_method; classtype:web-application-attack; sid:1000001; rev:1;)

 **3. Suricata Configuration File (`suricata.yaml`)**
 **Default File Path**
- By default, SuriGuard1 reads the Suricata configuration file from:
  ```src/config/core.config.ts


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
