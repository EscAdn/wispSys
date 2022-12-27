const FilterTable = ({label, idTable}) => {
	return (
		<div className="row d-flex">
			<div className="row col-sm-12" action="">
				<label htmlFor={idTable} className="col-2 col-form-label fw-bold">
					Buscar
				</label>
				<div className="col-10">
					<input
						id={idTable}
						className="form-control"
						type="text"
						placeholder={label}
					/>
				</div>
			</div>
		</div>
	)
}

export default FilterTable