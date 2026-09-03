import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Plus, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { dashboardsAPI, widgetsAPI } from '../api';

const mockData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 200 },
  { name: 'Apr', value: 278 },
  { name: 'May', value: 190 },
];

function DashboardBuilder() {
  const { id } = useParams();
  const [dashboard, setDashboard] = useState(null);
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchDashboard();
  }, [id]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const dashRes = await dashboardsAPI.getById(id);
      setDashboard(dashRes.data);

      const widgetRes = await widgetsAPI.getByDashboard(id);
      setWidgets(widgetRes.data);
    } catch (error) {
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const addWidget = async (type) => {
    try {
      const newWidget = {
        dashboardId: id,
        title: `${type} Chart`,
        widgetType: type,
        config: { dataKey: 'value' },
        width: 4,
        height: 3,
      };

      const response = await widgetsAPI.create(newWidget);
      setWidgets([...widgets, response.data]);
      toast.success('Widget added!');
    } catch (error) {
      toast.error('Failed to add widget');
    }
  };

  const removeWidget = async (widgetId) => {
    try {
      await widgetsAPI.delete(widgetId);
      setWidgets(widgets.filter(w => w.id !== widgetId));
      toast.success('Widget removed');
    } catch (error) {
      toast.error('Failed to remove widget');
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await dashboardsAPI.update(id, { name: dashboard.name });
      toast.success('Dashboard saved!');
    } catch (error) {
      toast.error('Failed to save dashboard');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="container mx-auto px-4 py-10">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{dashboard?.name}</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Save size={20} />
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>

      {/* Widget Controls */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-4">Add Widgets</h3>
        <div className="flex flex-wrap gap-2">
          {['line', 'bar', 'pie', 'gauge'].map((type) => (
            <button
              key={type}
              onClick={() => addWidget(type)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg capitalize"
            >
              <Plus size={16} />
              {type} Chart
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {widgets.map((widget) => (
          <div key={widget.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold">{widget.title}</h3>
              <button
                onClick={() => removeWidget(widget.id)}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>

            {/* Sample Chart */}
            {widget.widget_type === 'line' && (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#2563eb" />
                </LineChart>
              </ResponsiveContainer>
            )}

            {widget.widget_type === 'bar' && (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            )}

            {widget.widget_type === 'pie' && (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={mockData} dataKey="value" cx="50%" cy="50%" outerRadius={80} fill="#2563eb" />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}

            {widget.widget_type === 'gauge' && (
              <div className="h-32 flex items-center justify-center bg-gray-100 rounded">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">75%</div>
                  <div className="text-gray-600 text-sm mt-2">Gauge</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardBuilder;
