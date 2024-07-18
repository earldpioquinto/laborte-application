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
    { field: 'paid', headerName: 'Paid', type: 'boolean', editable: true, width: 50 },
    { field: 'month', headerName: 'Month' },
    { field: 'year', headerName: 'Year' },
    {
        field: 'payment',
        headerName: 'Payment',
        valueFormatter: (params) => formatNumber(params),
    },
    {
        field: 'interest',
        headerName: 'Interest',
        valueFormatter: (params) => formatNumber(params),
    },
    {
        field: 'principal',
        headerName: 'Principal',
        valueFormatter: (params) => formatNumber(params),
    },
    {
        field: 'remainingBalance',
        headerName: 'Balance',
        valueFormatter: (params) => formatNumber(params),
    },
];

const ComponentLoanTable = () => {
    const { id } = useParams();
    const memberData = useStore((state) => state.memberData);
    const updateLoanData = useStore((state) => state.updateLoanData);

    // Retrieve the member's loan data based on the URL ID
    const member = memberData.find((member) => member.id === id);
    const loanData = member ? member.records?.loans?.flatMap((loan, loanIndex) => 
        loan.paymentSchedule.map((payment, paymentIndex) => ({
            id: `${loanIndex + 1}-${paymentIndex + 1}`,
            month: new Date(payment.year, payment.monthValue - 1).toLocaleString('default', { month: 'long' }),
            year: payment.year,
            payment: parseFloat(payment.payment),
            interest: parseFloat(payment.interestPayment),
            principal: parseFloat(payment.principalPayment),
            remainingBalance: parseFloat(payment.remainingPrincipal),
            paid: payment.remainingPrincipal === 0,
        }))
    ) : [];

    const handleProcessRowUpdate = (newRow) => {
        updateLoanData(newRow);
        return newRow;
    };

    const getRowClassName = (params) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth(); // Get the month as a zero-based index (0 = January, 11 = December)

        // Convert month name to zero-based index
        const monthIndex = new Date(Date.parse(params.row.month + " 1, 2023")).getMonth();
        if (!params.row.paid) {
            if (
                (params.row.year < currentYear) ||
                (params.row.year === currentYear && monthIndex < currentMonth)
            ) {
                return 'highlight';
            }
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

export default ComponentLoanTable;
