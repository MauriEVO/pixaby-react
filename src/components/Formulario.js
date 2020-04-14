import React, { useState } from 'react';
import Error from './Error'

const Formulario = ({guardarBusqueda}) => {
	const [termino, guardarTermino] = useState('');
	const [error, guardarError] = useState(false);

	const SendSearch = (e) =>{
		e.preventDefault();

		if(termino.trim() == ''){
			guardarError(true)
			return;
		}
		guardarError(false)

		guardarBusqueda(termino)
	}	

	return (
		<form onSubmit={SendSearch}>
			<div className="row">
				<div className="form-group col-md-8">
					<input 
						type="text"
						className="form-control form-control-lg"
						placeholder="Buscar"
						onChange={ e => guardarTermino(e.target.value)}
					/>
				</div>
				<div className="form-group col-md-4">
					<button type="submit" className="btn btn-lg btn-danger btn-block">Buscar</button>
				</div>
			</div>
			{error ? <Error mensaje='Llenar algún termino'/> :  null}
		</form>
	);
}

export default Formulario;