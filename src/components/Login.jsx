
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; 

const Login = ({ onLoginSuccess }) => {
  const { login } = useAuth(); 
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 

  // Función que maneja el proceso de inicio de sesión
  const handleLogin = () => {
    if (username === 'capibara' && password === '1234') { // Verifica usuario y contrasenia 
      login(username); // Llama a la función login del contexto
      onLoginSuccess(); // Llama a la función proporcionada para manejar el éxito del login
    } else {
      setErrorMessage('Credenciales incorrectas. Inténtalo nuevamente.'); // Muestra un mensaje de error
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)} //Se envia el nombre de usuario cambiando el estado
        placeholder="Usuario"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // igual pero con la contraseña
        placeholder="Contraseña"
      />
      <button onClick={handleLogin}>Iniciar sesión</button> 
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Login; 
