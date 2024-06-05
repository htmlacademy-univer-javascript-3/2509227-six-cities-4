import React from 'react';

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  const styles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    color: 'red',
    fontSize: '18px',
  } as const;

  return (
    <div style={styles}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
