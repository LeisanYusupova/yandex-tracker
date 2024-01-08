import React from "react";
import { createRouter } from './appRouter';
import { RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import './styles/styles.css';
import '@mantine/core/styles.css';
import { MantineProvider} from '@mantine/core';

function App() {

    return (
        <MantineProvider >
            <Suspense fallback={<div></div>}>
                <RouterProvider router={createRouter()} />
            </Suspense>
        </MantineProvider>

    );
}

export default App;
