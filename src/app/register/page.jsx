'use client'

import React, { useState, useEffect } from 'react';
import {
  Brain,
  Mail,
  Lock,
  User,
  ArrowLeft,
  Eye,
  EyeOff
} from 'lucide-react';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Redirection si déjà connecté
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token && token != 'undefined') {
      window.location.href = '/retention';
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setError('');

    if (!formData.username || !formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();
      

      if (!response.ok) {
        throw new Error(data.detail || "Erreur lors de l'inscription");
      }
      window.location.href = '/retention';
    } catch (err) {
      setError(err.message || "Erreur d'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Navigation */}
      <nav className="fixed w-full bg-slate-900/80 backdrop-blur-lg z-50 border-b border-blue-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                RetentionAI
              </span>
            </div>
            <a href="/" className="flex items-center space-x-2 text-gray-300 hover:text-blue-400">
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">

          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">
              Créer un compte
            </h1>
            <p className="text-gray-400">
              Inscription rapide et sécurisée
            </p>
          </div>

          <div className="bg-slate-900/50 border border-blue-500/10 rounded-2xl p-8 space-y-5">

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nom d'utilisateur
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-blue-500/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500/50"
                  placeholder="ex: admin01"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-blue-500/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500/50"
                  placeholder="email@exemple.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-slate-800/50 border border-blue-500/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500/50"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 text-gray-500"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 py-3 rounded-xl text-white font-semibold disabled:opacity-50"
            >
              {isLoading ? 'Inscription en cours...' : 'Créer mon compte'}
            </button>

            <div className="my-6 border-t border-blue-500/10" />

            <button
              onClick={() => window.location.href = '/login'}
              className="w-full py-3 border border-blue-500/20 rounded-xl text-blue-400 font-semibold hover:bg-blue-500/5"
            >
              Se connecter
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
