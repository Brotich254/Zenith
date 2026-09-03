import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, Zap, Users } from 'lucide-react';

function Home() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero */}
      <section className="py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-blue-600">Zenith</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Professional analytics dashboard for real-time insights and data visualization
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/register"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-semibold"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Zenith?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <BarChart3 className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Beautiful Dashboards</h3>
            <p className="text-gray-600">Create stunning dashboards with drag & drop ease</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-time Data</h3>
            <p className="text-gray-600">See your metrics update instantly</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <Zap className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fast & Powerful</h3>
            <p className="text-gray-600">Lightning-fast queries and analytics</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <Users className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
            <p className="text-gray-600">Share insights with your entire team</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
