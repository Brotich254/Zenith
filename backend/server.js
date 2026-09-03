import express from 'express';
import cors from 'express-cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

// Import routes
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboards.js';
import widgetRoutes from './routes/widgets.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboards', dashboardRoutes);
app.use('/api/widgets', widgetRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Socket.io for real-time updates
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('subscribe_dashboard', (dashboardId) => {
    socket.join(`dashboard_${dashboardId}`);
  });

  socket.on('unsubscribe_dashboard', (dashboardId) => {
    socket.leave(`dashboard_${dashboardId}`);
  });

  socket.on('widget_updated', (data) => {
    io.to(`dashboard_${data.dashboardId}`).emit('widget_updated', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`✨ Zenith Analytics running on port ${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}`);
  console.log(`🔌 WebSocket: ws://localhost:${PORT}`);
});

export default app;
