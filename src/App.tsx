
import { observer } from 'mobx-react-lite';

import './App.css';
import Wrapper from './components/TableCrypto/Wrapper/Wrapper';

function App() {
    console.log('App: ');

    return (
        <div className='App'>
            <Wrapper />
        </div>
    );
}

export default observer(App);
