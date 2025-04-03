import {Ghost} from '@gravity-ui/icons';
import {AsideHeader} from '@gravity-ui/navigation';
import {Wrapper} from './components/Wrapper';
import {TablePage} from './pages/TablePage';

const App = () => {
    return (
        <AsideHeader
            logo={{icon: Ghost, text: 'vite-example'}}
            compact={true}
            hideCollapseButton={true}
            renderContent={() => (
                <Wrapper>
                    <TablePage />
                </Wrapper>
            )}
        />
    );
};

export default App;
