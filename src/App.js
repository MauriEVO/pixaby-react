import React, {useState , useEffect} from 'react';
import Formulario from "./components/Formulario";
import ListaImagenes from "./components/ListaImagenes";


function App() {
	const [busqueda, guardarBusqueda] = useState('');
	const [imagenes, guardarImagenes] = useState([])
	const [paginaactual, guardarPaginaActual] = useState(1)
	const [calculartotal, guardarCalcularTotal] = useState(6)


	useEffect(() => {
		const consultarApi = async () => {

			if(busqueda === '') return;
			const imagenPorPagina = 20;
			const key = '15583101-f18bdab920397c4d9dafb42a1'
			const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenPorPagina}&page=${paginaactual}`

			const respuesta = await fetch(url)
			const resultado = await respuesta.json()
			guardarImagenes(resultado.hits)

			const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenPorPagina);
			guardarCalcularTotal(calcularTotalPaginas)

			const jumbotron = document.querySelector('.jumbotron');
			jumbotron.scrollIntoView({behavior: 'smooth'})

		}
		consultarApi()

	}, [busqueda, paginaactual])

	if(imagenes.length === 0){
		console.log(false)
	}

	const paginaAnterior = () =>{
		const nuevaPaginaActual = paginaactual - 1;
		if(nuevaPaginaActual == 0) return;
		guardarPaginaActual(nuevaPaginaActual)
	}

	const paginaSiguiente = () =>{
		const nuevaPaginaActual = paginaactual + 1;
		if (nuevaPaginaActual > calculartotal) return;

		guardarPaginaActual(nuevaPaginaActual)

	}

	return (
		<div className="container">
			<div className="jumbotron">
				<div className="lead text-center mb-3">
					Buscador de Imágenes
				</div>
				<Formulario guardarBusqueda={guardarBusqueda}/>

			</div>
			<div className="row justify-content-center">
				<ListaImagenes
					imagenes={imagenes}
					/>

				{
					(imagenes.length === 0) ? null : (

						<div className="controls">
							{(paginaactual === 1) ? null : (
								<button
									type="button"
									onClick={paginaAnterior}
									className="bbtn btn-info mr-1"
									> Anterior &laquo; </button>
							)}

							{(paginaactual === calculartotal) ? null : (
								<button
									type="button"
									onClick={paginaSiguiente}
									className="bbtn btn-info mr-1"
								> Siguiente &raquo; </button>
							)}
						</div>
					)
				}

			</div>
		</div>
	);
}

export default App;