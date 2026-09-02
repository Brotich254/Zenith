# Zenith - SaaS Analytics Dashboard

Professional real-time analytics platform for tracking metrics, creating custom dashboards, and generating actionable insights.

## Features

### Core Analytics
- Real-time data visualization
- Custom dashboard builder (drag & drop)
- Multiple data source connectors
- Advanced filtering & segmentation
- Trend analysis & anomaly detection
- Custom metrics & KPIs
- Data export (CSV, PDF, JSON)

### Data Sources
- Website analytics (Google Analytics, Mixpanel)
- Business metrics (CRM, E-commerce)
- Custom API integrations
- CSV/JSON uploads
- Database connections
- Real-time webhooks

### Dashboard Features
- Customizable widgets (line, bar, pie, gauge charts)
- Real-time updates (WebSocket)
- Shared dashboards
- Scheduled reports (daily/weekly/monthly)
- Email delivery
- Team collaboration
- Version history & rollback

### User Management
- Multi-level teams
- Role-based access (viewer, editor, admin)
- SSO integration (OAuth)
- Audit logs
- API keys for integrations
- Two-factor authentication

### Advanced Features
- Alert system (thresholds, anomalies)
- Data forecasting
- Comparison tools
- Cohort analysis
- Funnel analysis
- Retention curves
- Custom calculations

## Tech Stack

### Backend
- **Runtime**: Node.js + Express.js
- **Database**: PostgreSQL
- **Real-time**: Socket.io + Redis
- **Data Processing**: Bull (job queue)
- **Authentication**: JWT + OAuth2
- **API Integration**: Axios + node-fetch
- **File Processing**: Sharp, pdf-lib

### Frontend
- **Framework**: React 18
- **State**: Redux Toolkit
- **UI Components**: Recharts, React DnD (drag & drop)
- **Styling**: Tailwind CSS
- **Real-time**: Socket.io client
- **Forms**: React Hook Form
- **Tables**: React Table

## Project Structure

```
zenith/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── workers/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── hooks/
│   │   ├── api/
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## Getting Started

### Backend Setup
```bash
cd zenith/backend
npm install
cp .env.example .env
npm run dev
```

### Frontend Setup
```bash
cd zenith/frontend
npm install
npm run dev
```

Visit `http://localhost:5173`

## Database Schema

### Core Tables
- `users` - User accounts with roles
- `organizations` - Teams/workspaces
- `dashboards` - Custom dashboards
- `widgets` - Dashboard widgets
- `data_sources` - Connected data sources
- `metrics` - Custom metrics
- `alerts` - Alert configurations
- `reports` - Scheduled reports
- `audit_logs` - User actions
- `integrations` - API integrations

## API Endpoints

### Authentication
- `POST /api/auth/register` - Sign up
- `POST /api/auth/login` - Login
- `POST /api/auth/oauth` - OAuth callback
- `POST /api/auth/refresh` - Refresh token

### Dashboards
- `GET /api/dashboards` - List dashboards
- `POST /api/dashboards` - Create dashboard
- `GET /api/dashboards/:id` - Get dashboard
- `PUT /api/dashboards/:id` - Update dashboard
- `DELETE /api/dashboards/:id` - Delete dashboard
- `POST /api/dashboards/:id/share` - Share dashboard

### Widgets
- `POST /api/widgets` - Create widget
- `PUT /api/widgets/:id` - Update widget
- `DELETE /api/widgets/:id` - Delete widget
- `GET /api/widgets/:id/data` - Get widget data

### Data Sources
- `GET /api/sources` - List sources
- `POST /api/sources` - Create source
- `GET /api/sources/:id/test` - Test connection
- `POST /api/sources/:id/sync` - Manual sync

### Metrics
- `GET /api/metrics` - List metrics
- `POST /api/metrics` - Create metric
- `GET /api/metrics/:id/data` - Get metric data

### Reports
- `GET /api/reports` - List reports
- `POST /api/reports` - Create report
- `GET /api/reports/:id/preview` - Preview report
- `POST /api/reports/:id/send` - Send report

### Alerts
- `GET /api/alerts` - List alerts
- `POST /api/alerts` - Create alert
- `PUT /api/alerts/:id` - Update alert

## Environment Variables

```
DATABASE_URL=postgresql://user:pass@localhost:5432/zenith
JWT_SECRET=your_secret_key
REDIS_URL=redis://localhost:6379
PORT=3001
NODE_ENV=development
```

## Key Features

### Real-time Analytics
- WebSocket updates
- Live metrics
- Instant notifications
- 60+ chart types

### Custom Dashboards
- Drag & drop builder
- Responsive layout
- Save/load templates
- Snapshot & embed

### Data Integration
- 50+ pre-built connectors
- Custom API webhooks
- Scheduled syncs
- Transformation engine

### Smart Alerts
- Threshold monitoring
- Anomaly detection
- Scheduled checks
- Multi-channel notifications

### Collaboration
- Team workspaces
- Shared dashboards
- Comments & notes
- Change history

## Pricing Model

- **Starter**: 1 dashboard, 2 sources, basic charts - $29/month
- **Professional**: Unlimited dashboards, 10 sources, advanced analytics - $99/month
- **Enterprise**: Custom integrations, dedicated support - Custom pricing

## Development Roadmap

### Phase 1: MVP (Complete)
- Core dashboard builder
- Basic widgets
- User authentication
- Real-time updates

### Phase 2: Data Integration
- Data source connectors
- API integrations
- Scheduled syncs
- Data transformation

### Phase 3: Advanced Analytics
- Forecasting
- Anomaly detection
- Cohort analysis
- Custom calculations

### Phase 4: Enterprise
- SSO/OAuth
- Advanced permissions
- Audit logs
- White-label options

## License

MIT

## Support

For questions and support, check the documentation files or create an issue.
# Zenith
