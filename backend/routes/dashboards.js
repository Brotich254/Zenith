import express from 'express';
import { query } from '../config/db.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get all dashboards for organization
router.get('/org/:orgId', verifyToken, async (req, res) => {
  try {
    const { orgId } = req.params;

    const result = await query(
      `SELECT d.* FROM dashboards d
       JOIN organization_members om ON d.org_id = om.org_id
       WHERE d.org_id = $1 AND om.user_id = $2
       ORDER BY d.created_at DESC`,
      [orgId, req.user.id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching dashboards:', error);
    res.status(500).json({ error: 'Failed to fetch dashboards' });
  }
});

// Get single dashboard
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(
      `SELECT d.* FROM dashboards d
       JOIN organization_members om ON d.org_id = om.org_id
       WHERE d.id = $1 AND om.user_id = $2`,
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Dashboard not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard' });
  }
});

// Create dashboard
router.post('/org/:orgId', verifyToken, async (req, res) => {
  try {
    const { orgId } = req.params;
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Dashboard name required' });
    }

    // Verify user is org member
    const member = await query(
      'SELECT * FROM organization_members WHERE org_id = $1 AND user_id = $2',
      [orgId, req.user.id]
    );

    if (member.rows.length === 0) {
      return res.status(403).json({ error: 'Not a member of this organization' });
    }

    const result = await query(
      `INSERT INTO dashboards (org_id, created_by, name, description)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [orgId, req.user.id, name, description || '']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating dashboard:', error);
    res.status(500).json({ error: 'Failed to create dashboard' });
  }
});

// Update dashboard
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, layout, refresh_interval } = req.body;

    // Verify ownership
    const dashboard = await query('SELECT org_id FROM dashboards WHERE id = $1', [id]);
    if (dashboard.rows.length === 0) {
      return res.status(404).json({ error: 'Dashboard not found' });
    }

    const member = await query(
      'SELECT * FROM organization_members WHERE org_id = $1 AND user_id = $2',
      [dashboard.rows[0].org_id, req.user.id]
    );

    if (member.rows.length === 0) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const result = await query(
      `UPDATE dashboards
       SET name = COALESCE($2, name),
           description = COALESCE($3, description),
           layout = COALESCE($4, layout),
           refresh_interval = COALESCE($5, refresh_interval)
       WHERE id = $1
       RETURNING *`,
      [id, name, description, layout ? JSON.stringify(layout) : null, refresh_interval]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating dashboard:', error);
    res.status(500).json({ error: 'Failed to update dashboard' });
  }
});

// Delete dashboard
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const dashboard = await query('SELECT org_id FROM dashboards WHERE id = $1', [id]);
    if (dashboard.rows.length === 0) {
      return res.status(404).json({ error: 'Dashboard not found' });
    }

    const member = await query(
      'SELECT * FROM organization_members WHERE org_id = $1 AND user_id = $2',
      [dashboard.rows[0].org_id, req.user.id]
    );

    if (member.rows.length === 0) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await query('DELETE FROM dashboards WHERE id = $1', [id]);
    res.json({ message: 'Dashboard deleted successfully' });
  } catch (error) {
    console.error('Error deleting dashboard:', error);
    res.status(500).json({ error: 'Failed to delete dashboard' });
  }
});

export default router;
