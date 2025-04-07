import {Button} from '@gravity-ui/uikit';
import {useState} from 'react';
import {Wrapper} from './components/Wrapper';
import {TablePage} from './pages/TablePage';

const App = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <Wrapper>
            <Button view="outlined-action" size="l" onClick={() => setIsAdmin((prev) => !prev)}>
                {isAdmin ? 'Выйти из режима администратора' : 'Войти в режим администратора'}
            </Button>
            <TablePage isAdmin={isAdmin} onExitAdmin={() => setIsAdmin(false)} />
        </Wrapper>
    );
};

export default App;
