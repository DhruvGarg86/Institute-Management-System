import React from 'react';

const Forbidden = () => {
  const styles = {
    container: {
      backgroundColor: '#f8f8f8',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      height: '100vh',
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '0 1rem',
    },
    status: {
      fonFSize: '6rem',
      margin: 0,
      color: '#d9534f',
    },
    message: {
      fontSize: '1.5rem',
      margin: '1rem 0 2rem 0',
    },
    link: {
      textDecoration: 'none',
      color: '#337ab7',
      fontWeight: 'bold',
      border: '2px solid #337ab7',
      padding: '0.5rem 1.2rem',
      borderRadius: '5px',
    },
    linkHover: {
      backgroundColor: '#337ab7',
      color: '#fff',
    }
  };

  // Simple hover effect handling with React state
  const [hover, setHover] = React.useState(false);

  return (
    <div style={styles.container}>
      <h1 style={styles.status}>403</h1>
      <p style={styles.message}>Access Forbidden: You don't have permission to access this page.</p>
      <a
        href="/login"
        style={hover ? { ...styles.link, ...styles.linkHover } : styles.link}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Go to Login Page!
      </a>
    </div>
  );
};

export default Forbidden;
