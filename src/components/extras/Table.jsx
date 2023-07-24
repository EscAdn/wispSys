import DataTable from 'react-data-table-component'
import Loading from './../Loading'

const Table = ({ title, pending, columns, data, handleChange}) => {

	const paginationComponentOptions = {
		rowsPerPageText: 'Filas por página',
		rangeSeparatorText: 'de',
		selectAllRowsItem: true,
		selectAllRowsItemText: 'Todos',
	};

	const customStyles = {
		rows: {
			highlightOnHoverStyle: {
				color: '#FFFFFF',
				fontWeight: 'bold',
				backgroundColor: 'rgba(5, 105, 209, 0.8)',
				borderBottomColor: '#FFFFFF',
				borderRadius: '25px',
				outline: '1px solid #FFFFFF',
			}
		},
		headCells: {
	        style: {
	        	backgroundColor: '#000000',
	        	color: '#FFFFFF',
	        	fontWeight: "bold",
	        	fontSize: '0.8rem'
	        },
	    }
	}

	// const conditionalRowStyles = [
	// 	{
	// 		when: row => row.id % 3,
	// 		style:{ color: 'red'}
	// 	}
	// ]
	
	return (
		<DataTable
			title={title}
			// conditionalRowStyles={conditionalRowStyles}
			customStyles={customStyles}
			highlightOnHover
			pointerOnHover
			progressPending={pending}
			progressComponent={<Loading/>}
			columns={columns} 
			data={data}
			selectableRows
			onSelectedRowsChange={handleChange}
			pagination
			paginationComponentOptions={paginationComponentOptions}
			fixedHeader
			fixedHeaderScrollHeight="550px"
		/>
	)
}

export default Table