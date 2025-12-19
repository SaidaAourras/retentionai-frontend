'use client'

import React, { useState, useEffect } from 'react';
import { Brain, Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Rediriger si déjà connecté
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token && token != 'undefined') {
      window.location.href = '/retention';
    }
  }, []);

  const handleSubmit = async () => {
    setError('');

    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Erreur de connexion');
      }

      // ✅ Stockage CORRECT du token
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('token_type', data.token_type || 'bearer');

      // Redirection
      window.location.href = '/retention';

    } catch (err) {
      console.error('Erreur de connexion:', err);
      setError(err.message || 'Identifiants incorrects. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
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
            <a
              href="/"
              className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Login Content */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl mb-6">
              <Brain className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">
              Bienvenue
            </h1>
            <p className="text-gray-400">
              Connectez-vous à votre espace RetentionAI
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-slate-900/50 backdrop-blur-lg border border-blue-500/10 rounded-2xl p-8">
            <div className="space-y-6">

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-blue-500/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500/50"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-12 py-3 bg-slate-800/50 border border-blue-500/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500/50"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 py-3 rounded-xl text-white font-semibold disabled:opacity-50"
              >
                {isLoading ? 'Connexion en cours...' : 'Se connecter'}
              </button>
            </div>

            <div className="my-6 border-t border-blue-500/10" />

            <button
              onClick={() => window.location.href = '/register'}
              className="w-full py-3 border border-blue-500/20 rounded-xl text-blue-400 font-semibold hover:bg-blue-500/5"
            >
              Créer un compte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
