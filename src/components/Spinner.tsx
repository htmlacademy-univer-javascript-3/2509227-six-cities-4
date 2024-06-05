import React from 'react';

const Spinner: React.FC = () => {
  const spinnerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  } as const;

  const circleStyles = {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    borderLeftColor: '#09f',
    animation: 'spin 1s ease infinite',
  } as const;

  const keyframes = `
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  return (
    <div style={spinnerStyles}>
      <style>{keyframes}</style>
      <div style={circleStyles}></div>
    </div>
  );
};

export default Spinner;
