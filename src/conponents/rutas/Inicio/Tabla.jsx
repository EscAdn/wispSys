import DataTable from "react-data-table-component";

const Tabla = () => {

    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

    const columns = [
        {
            id: 'titulo',
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {   
            id: 'year',
            name: 'Year',
            selector: row => row.year,
            sortable: true,
        },
    ];
    
    const data = [
        {
            id: 1,
            title: 'Beetlejuice',
            year: '1988',
        },
        {
            id: 2,
            title: 'Ghostbusters',
            year: '1984',
        },
    ]

    return (
        <div className="card p-2 col-7 scroll">
            <DataTable
                columns={columns}
                data={data}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
            />
        </div>
    )
}

export default Tabla