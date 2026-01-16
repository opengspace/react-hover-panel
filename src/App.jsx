import React, { useState, useCallback } from 'react';
import FloatingPanel from './components/FloatingPanel';
import './App.css';

function App() {
  const [logs, setLogs] = useState([]);
  const [showPanel, setShowPanel] = useState(true);

  const addLog = useCallback((message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  }, []);

  const handleDragStart = useCallback(() => {
    addLog('Drag started');
  }, [addLog]);

  const handleDragEnd = useCallback((position) => {
    addLog(`Drag ended at x: ${Math.round(position.x)}, y: ${Math.round(position.y)}`);
  }, [addLog]);

  const handleVisibilityChange = useCallback((isVisible) => {
    if (isVisible) {
      addLog('Panel is active');
    } else {
      addLog('Panel is idle');
    }
  }, [addLog]);

  return (
    <div className="app">
      {/* Background content */}
      <div className="background-content">
        <h1>Floating Panel Demo</h1>
        <p>
          This is a demo page showcasing the Floating Panel component.
          The panel appears as a phone-like floating element that you can drag around.
        </p>

        <div className="controls">
          <button onClick={() => setShowPanel(!showPanel)} className="btn btn-primary">
            {showPanel ? 'Hide Panel' : 'Show Panel'}
          </button>
          <button onClick={() => setLogs([])} className="btn btn-secondary">
            Clear Logs
          </button>
          <a
            href="https://github.com/opengspace/react-hover-panel"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              style={{ marginRight: '8px' }}
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            GitHub
          </a>
        </div>

        <div className="info-section">
          <h2>Features</h2>
          <ul>
            <li>✨ Phone-like appearance with notch and rounded corners</li>
            <li>🎯 Draggable horizontally with boundary constraints</li>
            <li>👁️ Smart opacity: fades when not in use</li>
            <li>📱 Responsive design for mobile devices</li>
            <li>🎨 Customizable header, main content, and footer areas</li>
            <li>⚡ Smooth animations and transitions</li>
          </ul>
        </div>

        <div className="logs-section">
          <h2>Event Logs</h2>
          <div className="logs">
            {logs.length === 0 ? (
              <p className="no-logs">No events yet. Interact with the panel to see logs.</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="log-entry">{log}</div>
              ))
            )}
          </div>
        </div>

        <div className="placeholder-content">
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          ))}
        </div>
      </div>

      {/* Surprise behind the panel */}
      <div style={{
        position: 'fixed',
        right: 40,
        top: 20,
        width: 380,
        height: 'calc(100vh - 40px)',
        pointerEvents: 'none',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px'
      }}>
        <div style={{
          fontSize: '120px',
          animation: 'float 3s ease-in-out infinite',
          textShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
        }}>
          🎉
        </div>
        <div style={{
          fontSize: '32px',
          fontWeight: '700',
          color: 'rgba(255, 255, 255, 0.9)',
          textAlign: 'center',
          textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}>
          Surprise!
        </div>
        <div style={{
          fontSize: '16px',
          color: 'rgba(255, 255, 255, 0.7)',
          textAlign: 'center',
          maxWidth: '280px'
        }}>
          Move your mouse away to see me ✨
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
        `}</style>
      </div>

      {/* Floating Panel */}
      {showPanel && (
        <FloatingPanel
          width={380}
          topPadding={20}
          bottomPadding={20}
          draggable={true}
          idleOpacity={0.3}
          activeOpacity={1.0}
          opacityTransitionDuration={300}
          roundedCorners={true}
          shadow={true}
          onClose={() => {
            setShowPanel(false);
            addLog('Panel closed');
          }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onVisibilityChange={handleVisibilityChange}
          zIndex={1000}
          topLeft={{ icon: <span>⌂</span>, tooltip: 'Home' }}
          topCenter={<span>⋯</span>}
          bottomLeft={{ icon: <span>⚙</span>, tooltip: 'Tools' }}
          bottomRight={{ icon: <span>⚙</span>, tooltip: 'Actions' }}
        >
          <div>
            <p style={{
              margin: '0 0 16px 0',
              fontSize: '15px',
              color: '#1a1a1a',
              fontWeight: 500,
              letterSpacing: '-0.01em'
            }}>
              Welcome to the Floating Panel!
            </p>

            <div style={{
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
              padding: '14px 16px',
              borderRadius: '12px',
              marginBottom: '20px',
              border: '1px solid rgba(102, 126, 234, 0.15)'
            }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#4a5568', lineHeight: 1.5 }}>
                This panel demonstrates all the key features of the Floating Panel component.
              </p>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                marginBottom: '6px',
                fontWeight: 500,
                color: '#374151'
              }}>
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '10px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  transition: 'all 0.15s ease',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                marginBottom: '6px',
                fontWeight: 500,
                color: '#374151'
              }}>
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '10px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  transition: 'all 0.15s ease',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                marginBottom: '8px',
                fontWeight: 500,
                color: '#374151'
              }}>
                Preferences
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { id: 'opt1', label: 'Enable notifications' },
                  { id: 'opt2', label: 'Allow data collection' },
                  { id: 'opt3', label: 'Subscribe to newsletter' }
                ].map(option => (
                  <label key={option.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '8px',
                    transition: 'background-color 0.15s ease',
                    color: '#374151'
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <input
                      type="checkbox"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        marginRight: '10px',
                        width: '16px',
                        height: '16px',
                        cursor: 'pointer'
                      }}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <button
                onClick={(e) => { addLog('Cancel clicked'); }}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  background: 'white',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#1a1a1a',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#fafafa';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                }}
              >
                Cancel
              </button>
              <button
                onClick={(e) => { addLog('Confirm clicked'); }}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500,
                  transition: 'all 0.15s ease',
                  boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.3)';
                }}
              >
                Confirm
              </button>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08) 0%, rgba(245, 158, 11, 0.08) 100%)',
              padding: '14px 16px',
              borderRadius: '12px',
              marginBottom: '20px',
              border: '1px solid rgba(251, 191, 36, 0.2)'
            }}>
              <p style={{ margin: 0, fontSize: '13px', color: '#92400e', lineHeight: 1.5 }}>
                <span style={{ fontWeight: 600 }}>💡 Tip:</span> Try dragging the small bar at the top center to move the panel horizontally!
              </p>
            </div>

            {/* Scrollable content to demonstrate scrolling */}
            <div>
              <h5 style={{
                fontSize: '13px',
                margin: '0 0 12px 0',
                fontWeight: 600,
                color: '#1a1a1a'
              }}>Recent Activity</h5>
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} style={{
                  padding: '12px',
                  background: i % 2 === 0 ? '#fafbfc' : 'white',
                  borderRadius: '10px',
                  marginBottom: '8px',
                  fontSize: '13px',
                  color: '#4a5568',
                  border: '1px solid rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.15s ease'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f6f8f9';
                    e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = i % 2 === 0 ? '#fafbfc' : 'white';
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.04)';
                  }}
                >
                  <span style={{ fontWeight: 500, color: '#1a1a1a' }}>Activity {i + 1}</span> — This demonstrates scrollable content within the panel.
                </div>
              ))}
            </div>
          </div>
        </FloatingPanel>
      )}
    </div>
  );
}

export default App;
