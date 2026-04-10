import { useState, useRef } from 'react';
import { Anuncio } from './models/Anuncio';
import './App.css';

function App() {
    // Estados 
    const [isAutenticado, setIsAutenticado] = useState(false);
    const [ingresosTotales, setIngresosTotales] = useState(0);
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    // Esto evita que las instancias se borren cuando React actualiza la pantalla
    const anuncios = useRef({
        1: new Anuncio(1, "🌟 ¡Oferta! Zapatos al 50% de Descuento", 0.50),
        2: new Anuncio(2, "🍔 ¡Pide tu hamburguesa con envío gratis!", 0.75)
    });

    // clic en los anuncios
    const manejarClicAnuncio = (id) => {
        const anuncioObj = anuncios.current[id];
        const pagoRecibido = anuncioObj.registrarClic(); // Llamada al método del objeto
        
        setIngresosTotales(prevIngresos => prevIngresos + pagoRecibido);
        alert(`¡Clic registrado!\nAnuncio: ${anuncioObj.titulo}\nEl anunciante paga: $${anuncioObj.costoPorClic}`);
    };

    // inicio de sesión
    const manejarLogin = (e) => {
        e.preventDefault();
        if (usuario === "admin" && password === "1234") {
            setIsAutenticado(true);
        } else {
            alert("Credenciales incorrectas. Intenta con admin / 1234");
        }
    };

    // cerrar sesión para poder ver el cambio de vuelta
    const manejarLogout = () => {
        setIsAutenticado(false);
        setUsuario('');
        setPassword('');
    };

    return (
        <div className={`contenedor ${isAutenticado ? 'estado-conectado' : 'estado-desconectado'}`}>

            <div className={`status-indicator ${isAutenticado ? 'bg-conectado' : 'bg-desconectado'}`}>
                <span className="dot"></span>
                {isAutenticado ? "Conectado a la Red" : "Requiere Autenticación"}
            </div>

            {!isAutenticado ? (
                <div className="fade-in">
                    <h2>Wi-Fi Gratis</h2>
                    <p>Inicia sesión para acceder a Internet</p>
                    
                    <div className="anuncio" onClick={() => manejarClicAnuncio(1)}>
                        <p>{anuncios.current[1].titulo}</p>
                        <small>Haz clic aquí (Anuncio patrocinado)</small>
                    </div>

                    <form onSubmit={manejarLogin}>
                        <input 
                            type="text" 
                            placeholder="Usuario (escribe: admin)" 
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                        />
                        <input 
                            type="password" 
                            placeholder="Contraseña (escribe: 1234)" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">Conectar a Internet</button>
                    </form>
                </div>
            ) : (
                <div className="fade-in">
                    <h2>¡Autenticación Exitosa!</h2>
                    <p>Ya casi estás conectado...</p>

                    <div className="anuncio" onClick={() => manejarClicAnuncio(2)}>
                        <p>{anuncios.current[2].titulo}</p>
                        <small>Haz clic aquí (Anuncio patrocinado)</small>
                    </div>

                    <button 
                        className="btn-success"
                        onClick={() => alert("Redirigiendo a internet... ¡Disfruta tu navegación!")}
                    >
                        Navegar en Internet
                    </button>

                    <button className="btn-logout" onClick={manejarLogout}>
                        Desconectar y Salir
                    </button>
                </div>
            )}

            <div className="consola">
                Ingresos Generados: ${ingresosTotales.toFixed(2)}
            </div>
        </div>
    );
}

export default App;