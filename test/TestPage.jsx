import React, { useState, useCallback } from 'react';
import FloatingPanel from '../src/components/FloatingPanel';

const panelContainerStyle = {
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, sans-serif",
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  minHeight: '100vh',
  padding: '40px 24px',
  color: '#e2e8f0',
  boxSizing: 'border-box',
};

const heroStyle = {
  maxWidth: 720,
  marginBottom: 24,
};

const cardStyle = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 12,
  padding: 16,
  marginBottom: 12,
};

function TestPage() {
  const [logs, setLogs] = useState([]);
  const [aMinimized, setAMinimized] = useState(false);
  const [bMinimized, setBMinimized] = useState(true); // defaultMinimized

  const addLog = useCallback((msg) => {
    const t = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${t}] ${msg}`, ...prev].slice(0, 30));
  }, []);

  return (
    <div style={panelContainerStyle}>
      <div style={heroStyle}>
        <h1 style={{ margin: '0 0 8px', fontSize: 28 }}>
          🧪 FloatingPanel — Minimize Test Page
        </h1>
        <p style={{ margin: 0, fontSize: 15, color: '#94a3b8', lineHeight: 1.6 }}>
          Two panels to verify the minimize-to-sidebar feature. Panel A (left) is a standard
          minimizable panel with an emoji icon; Panel B (right) starts <b>minimized by default</b>{' '}
          (<code>defaultMinimized</code>) with an <b>image URL icon</b>. Drag the docked icon
          vertically to reposition it, hover it for the tooltip, click it to restore.
        </p>
      </div>

      {/* Status cards */}
      <div style={{ ...cardStyle, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 14 }}>
          <b>Panel A (🎗)</b>: {aMinimized ? 'minimized' : 'expanded'}
        </span>
        <span style={{ fontSize: 14 }}>
          <b>Panel B (img)</b>: {bMinimized ? 'minimized' : 'expanded'}
        </span>
      </div>

      <div style={cardStyle}>
        <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 14 }}>✅ Manual test checklist</div>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#cbd5e1', lineHeight: 1.9 }}>
          <li>Click the <b>—</b> button in Panel A header → panel fades out &amp; slides toward the left edge, a 🎗 dock icon appears.</li>
          <li>Hover the dock icon → tooltip <i>"Expand me"</i> shows.</li>
          <li>Drag the dock icon vertically → panel hidden position follows.</li>
          <li>Click the dock icon → panel slides back &amp; fades in at the icon's Y position.</li>
          <li>Panel B should be <b>minimized on load</b> (right edge, image icon) — restore it to check.</li>
          <li>Input text in a panel, minimize, restore → <b>children state is preserved</b>.</li>
          <li>Event log below records every minimize/restore via <code>onMinimizeChange</code>.</li>
        </ul>
      </div>

      {/* Event log */}
      <div style={cardStyle}>
        <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 14 }}>📋 onMinimizeChange log</div>
        <div
          style={{
            fontFamily: 'Monaco, monospace',
            fontSize: 12,
            background: 'rgba(0,0,0,0.35)',
            borderRadius: 8,
            padding: 10,
            maxHeight: 160,
            overflowY: 'auto',
            color: '#a5f3fc',
          }}
        >
          {logs.length === 0 ? (
            <span style={{ color: '#64748b' }}>No events yet — try minimizing Panel A.</span>
          ) : (
            logs.map((l, i) => <div key={i}>{l}</div>)
          )}
        </div>
      </div>

      {/* Panel A — standard minimizable, left side */}
      <FloatingPanel
        width={320}
        topPadding={20}
        bottomPadding={20}
        defaultPosition={{ x: 40, y: 60 }}
        minimizable
        minimizeIcon={<span style={{ fontSize: 20 }}>🎗</span>}
        minimizeTooltip="Expand me"
        onMinimizeChange={(m) => {
          setAMinimized(m);
          addLog(m ? 'Panel A minimized' : 'Panel A restored');
        }}
        onClose={() => addLog('Panel A closed (close button)')}
        zIndex={1000}
        topLeft={{ icon: <span>⌂</span>, tooltip: 'Home' }}
        topCenter={<span>⋯</span>}
        bottomLeft={{ icon: <span>⚙</span>, tooltip: 'Settings' }}
      >
        <div style={{ padding: '4px 8px' }}>
          <p style={{ margin: '0 0 10px 0', fontSize: 14, fontWeight: 600 }}>
            Panel A — Standard minimizable
          </p>
          <p style={{ margin: '0 0 12px 0', fontSize: 13, color: '#4a5568', lineHeight: 1.5 }}>
            Emoji icon, custom tooltip "Expand me", <code>onMinimizeChange</code> wired.
          </p>
          <input
            type="text"
            placeholder="Type something, then minimize…"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: 8,
              fontSize: 13,
              boxSizing: 'border-box',
            }}
          />
          <p style={{ margin: '12px 0 0 0', fontSize: 12, color: '#718096' }}>
            Tip: your typed text should survive minimize → restore.
          </p>
        </div>
      </FloatingPanel>

      {/* Panel B — defaultMinimized + image URL icon, right side */}
      <FloatingPanel
        width={320}
        topPadding={20}
        bottomPadding={20}
        defaultPosition={{ x: 900, y: 300 }}
        minimizable
        defaultMinimized
        minimizeIcon="https://github.com/fluidicon.png"
        minimizeTooltip="Restore Panel B"
        onMinimizeChange={(m) => {
          setBMinimized(m);
          addLog(m ? 'Panel B minimized' : 'Panel B restored');
        }}
        onClose={() => addLog('Panel B closed (close button)')}
        zIndex={1000}
        topLeft={{ icon: <span>⌂</span>, tooltip: 'Home' }}
      >
        <div style={{ padding: '4px 8px' }}>
          <p style={{ margin: '0 0 10px 0', fontSize: 14, fontWeight: 600 }}>
            Panel B — Starts minimized
          </p>
          <p style={{ margin: 0, fontSize: 13, color: '#4a5568', lineHeight: 1.5 }}>
            Uses <code>defaultMinimized</code> with an image URL icon. It docks to the
            <b> right edge</b> on load. Click the GitHub icon to restore.
          </p>
        </div>
      </FloatingPanel>
    </div>
  );
}

export default TestPage;
