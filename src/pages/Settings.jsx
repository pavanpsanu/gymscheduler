// ============================================================
// SETTINGS PAGE — Targets, export/import, reset
// ============================================================
import { useState, useRef } from 'react';
import { useTracker } from '../store/TrackerContext';
import { getTargets, saveTargets } from '../data/targets';
import { exportData, importData, resetAllData } from '../utils/storage';
import './Settings.css';

export default function Settings() {
  const { targets, refreshTargets } = useTracker();
  const [localTargets, setLocalTargets] = useState(targets);
  const [showReset, setShowReset] = useState(false);
  const [importStatus, setImportStatus] = useState('');
  const fileInputRef = useRef(null);

  const handleTargetChange = (key, value) => {
    const updated = { ...localTargets, [key]: parseFloat(value) || 0 };
    setLocalTargets(updated);
    saveTargets(updated);
    refreshTargets();
  };

  const handleExport = () => {
    const json = exportData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fittrack-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const success = importData(ev.target.result);
      setImportStatus(success ? 'Data imported successfully! Refresh the page.' : 'Import failed. Check the file format.');
      setTimeout(() => setImportStatus(''), 4000);
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    resetAllData();
    setShowReset(false);
    window.location.reload();
  };

  return (
    <div className="page" id="settings-page">
      <h1 className="page-title">Settings</h1>

      {/* Targets */}
      <div className="section-title">Daily Targets</div>
      <div className="settings-targets card">
        {[
          { key: 'calories', label: 'Calories Target', unit: 'cal', icon: '🔥' },
          { key: 'protein', label: 'Protein Target', unit: 'g', icon: '💪' },
          { key: 'carbs', label: 'Carbs Target', unit: 'g', icon: '🌾' },
          { key: 'fats', label: 'Fats Target', unit: 'g', icon: '🥑' },
          { key: 'water', label: 'Water Target', unit: 'glasses', icon: '💧' },
          { key: 'steps', label: 'Steps Target', unit: 'steps', icon: '👟' },
        ].map(({ key, label, unit, icon }) => (
          <div key={key} className="settings-target-row">
            <span className="settings-target-icon">{icon}</span>
            <span className="settings-target-label">{label}</span>
            <div className="settings-target-input-wrap">
              <input
                type="number"
                className="input-field settings-target-input"
                value={localTargets[key] || ''}
                onChange={(e) => handleTargetChange(key, e.target.value)}
              />
              <span className="settings-target-unit">{unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Data Management */}
      <div className="section-title">Data Management</div>
      <div className="settings-data card">
        <button className="btn btn-secondary btn-block" onClick={handleExport} id="export-btn">
          📤 Export All Data as JSON
        </button>

        <button className="btn btn-secondary btn-block mt-md" onClick={() => fileInputRef.current?.click()} id="import-btn">
          📥 Import Data from JSON
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={handleImport}
        />

        {importStatus && (
          <div className={`settings-import-status ${importStatus.includes('success') ? 'success' : 'error'}`}>
            {importStatus}
          </div>
        )}

        <hr className="settings-hr" />

        <button className="btn btn-outline btn-block" onClick={() => setShowReset(true)} id="reset-btn">
          🗑️ Reset All Data
        </button>

        {showReset && (
          <div className="settings-reset-confirm animate-slide-up">
            <p className="text-sm font-semibold">⚠️ This will permanently delete all your tracked data.</p>
            <div className="flex gap-sm mt-md">
              <button className="btn btn-danger btn-sm" onClick={handleReset}>Yes, Reset Everything</button>
              <button className="btn btn-secondary btn-sm" onClick={() => setShowReset(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>

      {/* About */}
      <div className="section-title">About</div>
      <div className="card settings-about">
        <div className="text-sm font-bold" style={{ color: 'var(--accent-green)' }}>FitTrack</div>
        <div className="text-xs text-muted mt-sm">
          Premium fitness tracker built for personal use.
          All data is stored locally on your device. No servers, no accounts.
        </div>
        <div className="text-xs text-muted mt-sm">
          Date range: March 1, 2026 – August 31, 2026
        </div>
      </div>
    </div>
  );
}
