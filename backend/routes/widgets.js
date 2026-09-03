import express from 'express';
import { query } from '../config/db.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get widgets for dashboard
router.get('/dashboard/:dashboardId', verifyToken, async (req, res) => {
  try {
    const { dashboardId } = req.params;

    const result = await query(
      `SELECT w.* FROM widgets w
       JOIN dashboards d ON w.dashboard_id = d.id
       JOIN organization_members om ON d.org_id = om.org_id
       WHERE w.dashboard_id = $1 AND om.user_id = $2
       ORDER BY w.position_y, w.position_x`,
      [dashboardId, req.user.id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching widgets:', error);
    res.status(500).json({ error: 'Failed to fetch widgets' });
  }
});

// Create widget
router.post('/', verifyToken, async (req, res) => {
  try {
    const { dashboardId, title, widgetType, config, positionX, positionY, width, height } = req.body;

    if (!dashboardId || !title || !widgetType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await query(
      `INSERT INTO widgets (dashboard_id, title, widget_type, config, position_x, position_y, width, height)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [dashboardId, title, widgetType, JSON.stringify(config), positionX || 0, positionY || 0, width || 4, height || 3]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating widget:', error);
    res.status(500).json({ error: 'Failed to create widget' });
  }
});

// Update widget
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, config, positionX, positionY, width, height } = req.body;

    const result = await query(
      `UPDATE widgets
       SET title = COALESCE($2, title),
           config = COALESCE($3, config),
           position_x = COALESCE($4, position_x),
           position_y = COALESCE($5, position_y),
           width = COALESCE($6, width),
           height = COALESCE($7, height)
       WHERE id = $1
       RETURNING *`,
      [id, title, config ? JSON.stringify(config) : null, positionX, positionY, width, height]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating widget:', error);
    res.status(500).json({ error: 'Failed to update widget' });
  }
});

// Delete widget
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM widgets WHERE id = $1', [id]);
    res.json({ message: 'Widget deleted successfully' });
  } catch (error) {
    console.error('Error deleting widget:', error);
    res.status(500).json({ error: 'Failed to delete widget' });
  }
});

export default router;
