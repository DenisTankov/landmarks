import {Ghost} from '@gravity-ui/icons';
import {AsideHeader} from '@gravity-ui/navigation';
import {Wrapper} from './components/Wrapper';
import {TablePage} from './pages/TablePage';
import {useState} from 'react';
import {Button} from '@gravity-ui/uikit';

const App = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <AsideHeader
            logo={{icon: Ghost, text: 'vite-example'}}
            compact={true}
            hideCollapseButton={true}
            renderContent={() => (
                <Wrapper>
                    <Button onClick={() => setIsAdmin((prev) => !prev)}>
                        {isAdmin
                            ? 'Выйти из режима администратора'
                            : 'Войти в режим администратора'}
                    </Button>
                    <TablePage isAdmin={isAdmin} />
                </Wrapper>
            )}
        />
    );
};

export default App;
