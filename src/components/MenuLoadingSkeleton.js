import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const MenuLoadingSkeleton = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', margin: '0 auto', flexWrap: 'wrap'}}>
            <Stack spacing={1} style={{margin: '8px 4px'}}>
                <Skeleton variant="rectangular" width={300} height={225} />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
            </Stack>
            <Stack spacing={1} style={{margin: '8px 4px'}}>
                <Skeleton variant="rectangular" width={300} height={225} />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
            </Stack>
            <Stack spacing={1} style={{margin: '8px 4px'}}>
                <Skeleton variant="rectangular" width={300} height={225} />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
            </Stack>
            <Stack spacing={1} style={{margin: '8px 4px'}}>
                <Skeleton variant="rectangular" width={300} height={225} />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
            </Stack>
        </div>
    );
}

export default MenuLoadingSkeleton;
