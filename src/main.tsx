import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// para habilitar tanstack query
//debemos habilitar acceso global a toda nuestra app a nuestro query client
//haciendolo de esta forma, importamos el client y el provider
//y en este caso tambien las devtools que tambien instalamos

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

//inicializamos el queryclient

//de este modo cambiamos la configuracion por defecto
//de los queries si queremos que todos tengan
//una estructura base inicial
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// refetchOnWindowFocus: false,
		},
	},
});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		{/* proveemos el queryclient a toda nuestra app, envolviendo el componente app con el provider y pasandole el client como prop y con
    esto lo podemos usar dentro de nuestro proyecto */}
		<QueryClientProvider client={queryClient}>
			<App />
			{/* en este caso para las devtools no es necesario pasarle el client, ya que se conecta automaticamente al queryclient que le proveemos a toda nuestra app, por lo que solo lo importamos y lo usamos  */}
			<ReactQueryDevtools />
		</QueryClientProvider>
	</StrictMode>,
);

