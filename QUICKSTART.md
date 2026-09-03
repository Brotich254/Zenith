# Zenith - Quick Start

## Setup (10 minutes)

### 1. Database
```bash
createdb zenith
psql -d zenith < zenith/backend/config/schema.sql
```

### 2. Backend
```bash
cd zenith/backend
npm install
cp .env.example .env
npm run dev
```

### 3. Frontend
```bash
cd zenith/frontend
npm install
cp .env.example .env.local
npm run dev
```

### 4. Open Browser
Visit: http://localhost:5173

---

## Test Flow

1. **Sign Up** - Create account
2. **Create Dashboard** - Name your first dashboard
3. **Edit Dashboard** - Add widgets (line/bar/pie charts)
4. **View Data** - See sample charts render
5. **Logout** - Test authentication

---

## Key Features Working

✅ User registration & login  
✅ Create/edit dashboards  
✅ Add widgets to dashboards  
✅ Multiple chart types  
✅ Real-time updates (Socket.io ready)  
✅ Responsive design  
✅ JWT authentication  

---

## API Endpoints

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/dashboards/org/:orgId
POST   /api/dashboards/org/:orgId
PUT    /api/dashboards/:id
DELETE /api/dashboards/:id

GET    /api/widgets/dashboard/:dashboardId
POST   /api/widgets
PUT    /api/widgets/:id
DELETE /api/widgets/:id
```

---

## Next Phase Features

- Real data source integration
- Advanced filtering
- Scheduled reports
- Alert system
- Team collaboration
- Data export

Happy building! 🚀
