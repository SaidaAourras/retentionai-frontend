'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Brain, UserCheck, AlertTriangle, CheckCircle,
  TrendingUp, LogOut, Loader, ChevronRight
} from 'lucide-react';

const fieldLabels = {
  Age: "Âge", BusinessTravel: "Voyages", Department: "Département", Education: "Études",
  EducationField: "Domaine", EnvironmentSatisfaction: "Satisf. Env", Gender: "Genre",
  JobInvolvement: "Implication", JobLevel: "Niveau", JobRole: "Poste",
  JobSatisfaction: "Satisf. Job", MaritalStatus: "Statut", MonthlyIncome: "Salaire",
  OverTime: "Heures Sup.", PerformanceRating: "Performance", RelationshipSatisfaction: "Relations",
  StockOptionLevel: "Stock Options", TotalWorkingYears: "Expérience Totale",
  WorkLifeBalance: "Équilibre Vie", YearsAtCompany: "Années Boîte",
  YearsInCurrentRole: "Années Poste", YearsWithCurrManager: "Années Manager"
};

export default function RetentionAnalysisPage() {
  const router = useRouter();
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [retentionPlan, setRetentionPlan] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [formData, setFormData] = useState({
    Age: '35', BusinessTravel: 'Travel_Rarely', Department: 'Sales', Education: '3',
    EducationField: 'Life Sciences', EnvironmentSatisfaction: '3', Gender: 'Male',
    JobInvolvement: '3', JobLevel: '2', JobRole: 'Sales Executive', JobSatisfaction: '3',
    MaritalStatus: 'Single', MonthlyIncome: '5000', OverTime: 'No', PerformanceRating: '3',
    RelationshipSatisfaction: '3', StockOptionLevel: '0', TotalWorkingYears: '10',
    WorkLifeBalance: '3', YearsAtCompany: '5', YearsInCurrentRole: '2', YearsWithCurrManager: '2'
  });

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) router.push('/login');
    else setIsAuthenticated(true);
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePredict = async () => {
    setIsPredicting(true);
    setError(null);
    setPredictionResult(null);
    setRetentionPlan(null);

    try {
      const token = localStorage.getItem('access_token');
      
      // Conversion des types pour correspondre à EmployeBase
      const payload = Object.keys(formData).reduce((acc, key) => {
        const isNumeric = !["Gender", "MaritalStatus", "EducationField", "Department", "JobRole", "BusinessTravel", "OverTime"].includes(key);
        acc[key] = isNumeric ? parseInt(formData[key], 10) || 0 : formData[key];
        return acc;
      }, {});

      // ÉTAPE 1 : Prédiction
      const resPredict = await fetch('http://localhost:8000/api/v1/predict/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      });

      if (!resPredict.ok) throw new Error("Erreur lors de la prédiction");
      const dataPredict = await resPredict.json();
      setPredictionResult(dataPredict);

      // ÉTAPE 2 : Plan de rétention (si probabilité >= 50)
      // Note: Attention à l'espace dans la clé "churn_probability " de votre backend
      const proba = dataPredict["churn_probability "] || dataPredict.churn_probability;
      console.log(proba)
      
      if (proba >= 50) {
        const resPlan = await fetch('http://localhost:8000/api/v1/retention/generate-retention-plan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({
            employe_id: dataPredict.employe_id,
            churn_probability: proba
          })
        });
        const dataPlan = await resPlan.json();
        console.log(dataPlan['retention_plan'])
        setRetentionPlan(dataPlan['retention_plan']);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPredicting(false);
    }
  };

  if (!isAuthenticated) return <div className="min-h-screen bg-slate-950 flex items-center justify-center"><Loader className="animate-spin text-blue-500" /></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-blue-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex justify-between items-center bg-slate-900/50 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <Brain className="w-10 h-10 text-blue-400" />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Retention AI</h1>
          </div>
          <button onClick={() => { localStorage.removeItem('access_token'); router.push('/login'); }} className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition">
            <LogOut className="w-5 h-5" /> <span>Quitter</span>
          </button>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulaire */}
          <section className="lg:col-span-2 bg-slate-900/50 p-6 rounded-3xl border border-white/5 space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2"><UserCheck className="text-blue-400"/> Données Employé</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(formData).map(([key, value]) => (
                <div key={key} className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{fieldLabels[key] || key}</label>
                  {["Gender", "MaritalStatus", "EducationField", "Department", "JobRole", "BusinessTravel", "OverTime"].includes(key) ? (
                    <select name={key} value={value} onChange={handleInputChange} className="bg-slate-800 border-none rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500">
                      {getOptions(key).map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input type="number" name={key} value={value} onChange={handleInputChange} className="bg-slate-800 border-none rounded-lg p-2 text-sm" />
                  )}
                </div>
              ))}
            </div>
            <button onClick={handlePredict} disabled={isPredicting} className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition flex justify-center items-center gap-2">
              {isPredicting ? <Loader className="animate-spin" /> : <TrendingUp className="w-5 h-5"/>}
              {isPredicting ? "Analyse en cours..." : "Lancer l'Analyse IA"}
            </button>
          </section>

          {/* Résultats */}
          <aside className="space-y-6">
            {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">{error}</div>}
            
            {/* Widget Probabilité */}
            <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5 backdrop-blur-md">
              <h3 className="text-slate-400 text-sm mb-4">Risque d'Attrition</h3>
              {predictionResult ? (
                <div className="text-center space-y-2">
                  <div className={`text-6xl font-black ${predictionResult["churn_probability "] >= 50 ? 'text-red-500' : 'text-green-500'}`}>
                    {predictionResult["churn_probability "]}%
                  </div>
                  <p className="text-xs text-slate-500 italic">ID employé : #{predictionResult.employe_id}</p>
                </div>
              ) : (
                <div className="py-10 text-center text-slate-600 italic">Aucune donnée</div>
              )}
            </div>

            {/* Plan d'Action */}
            <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5">
              <h3 className="text-sm font-bold text-blue-400 mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> Stratégie de Rétention</h3>
              <div className="space-y-3">
                {retentionPlan ? (
                  Array.isArray(retentionPlan) ? (
                    retentionPlan.map((text, i) => (
                      <div key={i} className="flex gap-3 p-3 bg-white/5 rounded-xl border border-white/5 text-sm leading-relaxed">
                        <CheckCircle className="w-5 h-5 text-blue-500 shrink-0" /> {text}
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 text-sm italic">{retentionPlan.response || "Risque faible : aucun plan requis."}</p>
                  )
                ) : (
                  <p className="text-slate-600 text-sm italic text-center py-4">Le plan s'affichera ici si un risque est détecté.</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function getOptions(key) {
  const opts = {
    Gender: ["Male", "Female"], MaritalStatus: ["Single", "Married", "Divorced"],
    EducationField: ["Life Sciences", "Medical", "Marketing", "Technical Degree", "Other"],
    Department: ["Sales", "Research & Development", "Human Resources"],
    JobRole: ["Sales Executive", "Research Scientist", "Laboratory Technician", "Manufacturing Director", "Healthcare Representative", "Manager", "Sales Representative", "Research Director", "Human Resources"],
    BusinessTravel: ["Non-Travel", "Travel_Rarely", "Travel_Frequently"], OverTime: ["No", "Yes"]
  };
  return opts[key] || [];
}