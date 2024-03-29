import ReactDOM from 'react-dom/client';

import { RootStoreContext } from './root-store-context';
import RootStore from './stores/root-store';

import App from './App';
import './index.css';
import { StyledEngineProvider } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <RootStoreContext.Provider value={new RootStore()}>
        <StyledEngineProvider injectFirst>
            <App />
        </StyledEngineProvider>
    </RootStoreContext.Provider>,
);
