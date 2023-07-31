import { memo, useEffect, useState } from 'react'

import { urls } from './../../utils/endpoints.js';
import { helpHttp } from './../../helpers/helpHttp.js';

import Layout from './../extras/Layout';
import Card from './../extras/Card';
import Header from './../extras/Header';
import Loading from './../extras/Loading';
import Message from './../extras/Message';
import Formulario from './FormasPagos/Formulario.jsx';
import Tabla from './FormasPagos/Tabla.jsx';

const TiposPagos = () => {

	const [db, setDb] = useState(null);
	const [dataToEdit, setDataToEdit] = useState(false);
	const [error, setError] = useState(false);
	const [respError, setRespError] = useState(false);

	const getData = async () => {
		let resp = await helpHttp().get(urls.url_payments_types);

		if(resp.err){
			setError(resp);
			setDb([]);
		}else{
			setError(false);
			setDb(resp);
		}
	}

	useEffect(() => {
		getData();
	}, [])

	const createData = async (data) => {
		delete data.id;
		data.type = data.name;
		delete data.name;

		let resp = await helpHttp().post(urls.url_payments_types,{
			body: data,
			headers: {
				"content-type": "application/json"
			}
		});

		if(resp.err){
			setRespError(resp);
			return {err: resp}
		}

		data.id = resp.insertId;
		data.name = data.type;
		delete data.type;
		setDb([...db, data]);
		console.log(db);
		return;
	}

	const updateData = async (data) => {
		data.id = parseInt(data.id);
		data.type = data.name;
		delete data.name;

		let resp = await helpHttp().put(`${urls.url_payments_types}/${data.id}`,{
			body: data,
			headers: {
				"content-type": "application/json"
			}
		});

		if(resp.err){
			setRespError(resp);
			return {err: resp}
		}

		let newData = db.map((el) => {
			if(el.id === data.id){
				data.name = data.type;
				delete data.type;
				return data;
			}else{
				return el;
			}
		});
		setDb(newData);
		return;
	}

	return (
		<>
			<Header title="Formas de Pago" />
			{error ? (
				<Card>
					<Message msg={`${error.status} - ${error.statusText}`} />
				</Card>
				):
				(db ? (
					<Layout>
						<Card md="col-md-4">
							<Formulario 
								createData={createData} 
								updateData={updateData} 
								dataToEdit={dataToEdit}
								setDataToEdit={setDataToEdit}
							/>
						</Card>
						<Card md="col-md-8">
							<Tabla data={db} setDataToEdit={setDataToEdit} />
						</Card>
					</Layout>
				): (<Loading/>))
			}
		</>
		)
}

export default memo(() => TiposPagos());