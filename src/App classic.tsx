import { useEffect, useState } from 'react';
import './App.css';

//link de la api para generar un numero aleatorio entre 1 y 500
//https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new

//se muestra un ejemplo basico de la configuracion que hariamos para una peticion fetch
//con varios elementos como, el estado de carga, el error y el resultado de la peticion, 
// ademas de un boton para refrescar la peticion y obtener un nuevo numero aleatorio
function App() {
	//aqui guardamos el numero que obtenemos del fetch
	const [number, setNumber] = useState(0);
	//aqui guardamos el estado de carga, para mostrar un mensaje mientras se esta cargando el numero
	const [isLoading, setIsLoading] = useState(true);
	//aqui guardamos el error, para mostrar un mensaje en caso de que ocurra un error en la peticion
	const [error, setError] = useState(null);

	//esto lo usamos como bandera, para actualizarlo y forzar que se vuelva a ejecutar el useEffect y obtener un nuevo numero aleatorio
	const [refreshToken, setRefreshToken] = useState(0);

	useEffect(() => {
		//asignamos el estado de carga a true, para mostrar el mensaje de cargando mientras se esta haciendo la peticion
		setIsLoading(true);
		//hacemos la peticion fetch a la api para obtener un numero aleatorio entre 1 y 500
		fetch(
			'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new',
		)
		//aqui convertimos la respuesta a json, para poder usarla en el estado de number
			.then((response) => response.json())
			//aqui asignamos el numero obtenido al estado de number, para mostrarlo en la pantalla
			.then((data) => {
				setNumber(data);
			})
			//aqui asignamos el error al estado de error, para mostrarlo en caso de que ocurra un error en la peticion
			.catch((error) => setError(error))
			//volvemos isLoading a false, para ocultar el mensaje de cargando y mostrar el numero obtenido o el error en caso de que ocurra
			.finally(() => setIsLoading(false));
	}, [refreshToken]);

	return (
		<>
			{/* si estamos cargando, mostramos el mensaje, caso contrario mostramos el numero */}
			{isLoading ? <h1>Cargando...</h1> : <h1>Número: {number}</h1>}

		{/* en caso de error lo mostramos */}
			<div>{error}</div>

			<div>...</div>
			{/* con este boton actualizamos el refreshToken, para forzar que se vuelva a ejecutar el useEffect y obtener un nuevo numero aleatorio */}
			<button
				type="button"
				onClick={() => setRefreshToken((prev) => prev + 1)}
				disabled={isLoading}
			>
				Nuevo número
			</button>
		</>
	);
}

export default App;

