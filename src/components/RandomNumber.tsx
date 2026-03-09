import { useQuery } from '@tanstack/react-query';

//creamos este componente que solo muestra la informacion
//para ver como en caso de recrear la misma query, al usar el mismo id,
// apuntan a la misma funcion y regresan la misma informacion

const getCryptoNumber = async (): Promise<number> => {
	const response = await fetch(
		'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new',
	).then((response) => response.json());

	return Number(response);
};

export const RandomNumber = () => {
	const { data } = useQuery({
		queryKey: ['randomNumber'],
		queryFn: getCryptoNumber,
		staleTime: 1000 * 60,
	});

	return <div>Random Number: {data}</div>;
};
