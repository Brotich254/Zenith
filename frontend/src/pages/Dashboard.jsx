import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { dashboardsAPI } from '../api';

function Dashboard() {
  const [dashboards, setDashboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orgId, setOrgId] = useState(1); // Default org ID
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchDashboards();
  }, []);

  const fetchDashboards = async () => {
    try {
      setLoading(true);
      const response = await dashboardsAPI.getByOrg(orgId);
      setDashboards(response.data);
    } catch (error) {
      toast.error('Failed to fetch dashboards');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDashboard = async (e) => {
    e.preventDefault();
    if (!newName.trim()) {
      toast.error('Dashboard name required');
      return;
    }

    try {
      setCreating(true);
      await dashboardsAPI.create(orgId, { name: newName, description: '' });
      setNewName('');
      fetchDashboards();
      toast.success('Dashboard created!');
    } catch (error) {
      toast.error('Failed to create dashboard');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteDashboard = async (id) => {
    if (!window.confirm('Delete this dashboard?')) return;

    try {
      await dashboardsAPI.delete(id);
      fetchDashboards();
      toast.success('Dashboard deleted');
    } catch (error) {
      toast.error('Failed to delete dashboard');
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Dashboards</h1>
      </div>

      {/* Create New Dashboard */}
      <form onSubmit={handleCreateDashboard} className="mb-8 bg-white p-6 rounded-lg shadow">
        <div className="flex gap-4">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New dashboard name..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            disabled={creating}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Plus size={20} />
            Create
          </button>
        </div>
      </form>

      {/* Dashboard Grid */}
      {loading ? (
        <div className="text-center py-10">Loading dashboards...</div>
      ) : dashboards.length === 0 ? (
        <div className="text-center py-10 text-gray-600">
          No dashboards yet. Create one to get started!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboards.map((dashboard) => (
            <div key={dashboard.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{dashboard.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{dashboard.description || 'No description'}</p>

                <div className="flex gap-2">
                  <Link
                    to={`/builder/${dashboard.id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    <Edit2 size={16} />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteDashboard(dashboard.id)}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
