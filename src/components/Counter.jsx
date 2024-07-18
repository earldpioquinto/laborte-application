import React from 'react';
import useStore from '../store/dataStore';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Counter() {
    const count = useStore((state) => state.count);
    const increment = useStore((state) => state.increment);
    const decrement = useStore((state) => state.decrement);

    return (
        <div>
            <h1>{count}</h1>
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={increment}>Increment</Button>
                <Button variant="outlined" onClick={decrement}>Decrement</Button>
            </Stack>
        </div>
    );
}

export default Counter;
