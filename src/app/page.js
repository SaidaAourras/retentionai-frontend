'use client';
import React, { useState } from 'react';
import { Brain, Target, BarChart3, Zap, ChevronRight, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation'

export default function Home() {

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const router = useRouter();

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
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-blue-400 transition">
                Fonctionnalités
              </a>
              <a href="#how-it-works" className="text-gray-300 hover:text-blue-400 transition">
                Comment ça marche
              </a>
              <button 
                onClick={() => router.push('/login')}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition"
              >
                Connexion
              </button>
            </div>
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)} 
              className="md:hidden text-white"
            >
              {showMobileMenu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-slate-900 z-40 pt-20 md:hidden">
          <div className="flex flex-col items-center space-y-6 p-8">
            <a href="#features" className="text-xl text-gray-300 hover:text-blue-400">
              Fonctionnalités
            </a>
            <a href="#how-it-works" className="text-xl text-gray-300 hover:text-blue-400">
              Comment ça marche
            </a>
            <button 
              onClick={() => { 
                router.push('/login'); 
                setShowMobileMenu(false); 
              }}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-full"
            >
              Connexion
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm">Propulsé par l'IA Générative</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Anticipez les départs,
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Retenez vos talents
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            RetentionAI combine machine learning supervisé et IA générative pour prédire les risques de départ 
            et générer automatiquement des plans de rétention personnalisés.
          </p>
          <button 
            onClick={() => router.push('/login')}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition transform hover:scale-105 inline-flex items-center space-x-2"
          >
            <span>Commencer maintenant</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Fonctionnalités clés
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Brain className="w-12 h-12" />, 
                title: "Prédiction ML", 
                desc: "Analyse prédictive avec machine learning supervisé pour évaluer les risques" 
              },
              { 
                icon: <Target className="w-12 h-12" />, 
                title: "IA Générative", 
                desc: "Plans de rétention personnalisés générés automatiquement par IA" 
              },
              { 
                icon: <BarChart3 className="w-12 h-12" />, 
                title: "Visualisation", 
                desc: "Tableaux de bord interactifs pour suivre les métriques RH en temps réel" 
              }
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 p-8 rounded-2xl border border-blue-500/10 hover:border-blue-500/30 transition"
              >
                <div className="text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Comment ça marche
          </h2>
          <div className="space-y-8">
            {[
              { num: "01", title: "Connexion sécurisée", desc: "Authentifiez-vous à votre tableau de bord RH" },
              { num: "02", title: "Saisie du profil", desc: "Entrez les données de l'employé à analyser" },
              { num: "03", title: "Analyse IA", desc: "Notre modèle ML calcule le risque de départ" },
              { num: "04", title: "Plan d'action", desc: "Recevez un plan de rétention personnalisé si nécessaire" }
            ].map((step, idx) => (
              <div 
                key={idx} 
                className="flex items-start space-x-6 bg-slate-800/50 p-6 rounded-xl border border-blue-500/10"
              >
                <div className="text-4xl font-bold text-blue-400/30">{step.num}</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

}
