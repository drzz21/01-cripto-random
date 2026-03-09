import { useQuery } from '@tanstack/react-query';
import './App.css';
import { RandomNumber } from './components/RandomNumber';

//necesitamos nuestra funcion que retorna una promesa, porque es con lo que tanstack query trabaja
//así que la creamos, en ella hacemos el fetch y retornamos la respuesta, que es el numero
//que nos retorna la API

const getCryptoNumber = async (): Promise<number> => {
	const response = await fetch(
		'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new',
	).then((response) => response.json());

	return Number(response);
};

function App() {
	//llamamos nuestra funcion useQuery
	//desestructuramos los valores que nos retorna, y los usamos en el codigo
	//notar que asignamos nuestro query key, y nuestra queryfn que es la que definimos anteriormente y será
	//la promesa que manejará tanstack query
	const {
		// isLoading,
		isFetching,
		// la data es la informacion que retorna nuestra promesa
		data: number,
		error,
		refetch,
	} = useQuery({
		// la query key es el identificador unico que debe tener nuestra query
		queryKey: ['randomNumber'],
		queryFn: getCryptoNumber,
		// 		si tuvieramos argumentos en la funcion se haria algo como
		// queryFn: () => getCryptoNumber(arg1, arg2, arg3)
		// staleTime: 1000 * 5, // 1 minuto
	});

	return (
		<>
			{/* usamos is fetching ya que isLoading solo funciona cuando carga por primera vez la pagina
		y isFetching cada que hay cambios */}
			{isFetching ? <h1>Cargando...</h1> : <h1>Número: {number}</h1>}

			{/* creamos otro componente para ver como comparten estado ambos elementos mediante tanstack query */}
			<RandomNumber />

			<div>{JSON.stringify(error)}</div>

			<div>...</div>

			{/* en nuestro boton llamamos la funcion refetch */}
			<button
				type="button"
				onClick={() => refetch()}
				disabled={isFetching}
			>
				Nuevo número
			</button>
		</>
	);
}

export default App;

