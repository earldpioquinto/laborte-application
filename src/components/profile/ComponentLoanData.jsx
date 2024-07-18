import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import useStore from '../../store/dataStore';
import DynamicModal from '../DynamicModal';
import ModalAddPayment from '../modals/ModalAddPayment';

const formatNumber = (value) => {
    if (typeof value === 'number' && !isNaN(value)) {
        return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return value;
};

const columns = [
    { field: 'date', headerName: 'Date', width: 130},
    {
        field: 'value',
        headerName: 'Value',
        width: 130,
        valueFormatter: (params) => formatNumber(params),
    },
    {
        field: 'interest_rate',
        headerName: 'Interest Rate',
        width: 130,
        valueFormatter: (params) => `${params}%`,
    },
    { field: 'terms', headerName: 'Terms' },
    {
        field: 'totalPayment',
        headerName: 'Total Payment',
        width: 130,
        valueFormatter: (params) => formatNumber(params),
    },
];

const ComponentLoanData = () => {
    const { id } = useParams();
    const memberData = useStore((state) => state.memberData);
    const updateLoanData = useStore((state) => state.updateLoanData);

    // Retrieve the member's loan data based on the URL ID
    const member = memberData.find((member) => member.id === id);
    const loanData = member ? member.records?.loans?.map((loan, index) => ({
        id: index + 1,
        date: `${new Date(loan.year, loan.month - 1).toLocaleString('default', { month: 'long' })} ${loan.day}, ${loan.year}`,
        value: parseFloat(loan.value),
        interest_rate: parseFloat(loan.interest_rate),
        terms: loan.terms,
        totalPayment: parseFloat(loan.totalPayment),
    })) : [];

    const handleProcessRowUpdate = (newRow) => {
        updateLoanData(newRow);
        return newRow;
    };

    const getRowClassName = (params) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth(); // Get the month as a zero-based index (0 = January, 11 = December)

        // Convert month name to zero-based index
        const monthIndex = new Date(Date.parse(params.row.date.split(' ')[0] + " 1, 2023")).getMonth();
        if (params.row.year < currentYear || (params.row.year === currentYear && monthIndex < currentMonth)) {
            return 'highlight';
        }
        return '';
    };

    return (
        <Box sx={{ height: "374px", width: '100%' }}>
            <DataGrid
                rows={loanData}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                processRowUpdate={handleProcessRowUpdate}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 5, page: 0 },
                    },
                }}
                getRowClassName={getRowClassName}
                disableRowSelectionOnClick
            />
            <Box sx={{ display: 'flex', gap: 1, mt: 2, float: "right", mb: 2 }}>
                <DynamicModal component={ModalAddPayment} buttonLabel="Add Payment" />
            </Box>
        </Box>
    );
};

export default ComponentLoanData;
