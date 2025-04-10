import {Button, Icon, Select, TextInput} from '@gravity-ui/uikit';
import {memo} from 'react';
import {AscendingOrderIcon} from '../../assets/icons/AscendingOrderIcon';
import {DescendingOrderIcon} from '../../assets/icons/DescendingOrderIcon';
import {FilterCloseIcon} from '../../assets/icons/FilterCloseIcon';
import styles from './LandmarkFilters.module.scss';

interface LandmarkFiltersProps {
    search: string;
    setSearch: (val: string) => void;
    statusFilter: string[];
    setStatusFilter: (val: string[]) => void;
    sortKey: 'name' | 'rating' | 'dateAdded';
    setSortKey: (val: 'name' | 'rating' | 'dateAdded') => void;
    sortAsc: boolean;
    setSortAsc: (val: boolean) => void;
}

const LandmarkFiltersComponent: React.FC<LandmarkFiltersProps> = (props) => {
    const {
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        sortKey,
        setSortKey,
        sortAsc,
        setSortAsc,
    } = props;

    const statusOptions = [
        {value: '', content: 'Все'},
        {value: 'в планах', content: 'В планах'},
        {value: 'осмотрена', content: 'Осмотрена'},
    ];

    const handleStatusChange = ([value]: string[]) => {
        setStatusFilter(value ? [value] : []);
    };

    const resetFilters = () => {
        setSearch('');
        setStatusFilter([]);
        setSortKey('name');
        setSortAsc(true);
    };

    return (
        <div className={styles.filtersWrapper}>
            <TextInput
                placeholder="Поиск по названию"
                value={search}
                onUpdate={setSearch}
                style={{minWidth: 200}}
            />
            <Select
                placeholder="Статус"
                value={statusFilter.length ? [statusFilter[0]] : ['']}
                onUpdate={handleStatusChange}
                options={statusOptions}
            />
            <Select
                placeholder="Сортировка"
                value={[sortKey]}
                onUpdate={([key]) => setSortKey(key as 'name' | 'rating' | 'dateAdded')}
                options={[
                    {value: 'name', content: 'Название'},
                    {value: 'rating', content: 'Рейтинг'},
                    {value: 'dateAdded', content: 'Дата добавления'},
                ]}
            />
            <Button view={sortAsc ? 'normal' : 'flat'} onClick={() => setSortAsc(true)}>
                <Icon data={AscendingOrderIcon} />
            </Button>
            <Button view={!sortAsc ? 'normal' : 'flat'} onClick={() => setSortAsc(false)}>
                <Icon data={DescendingOrderIcon} />
            </Button>
            <Button view="outlined" onClick={resetFilters}>
                <Icon data={FilterCloseIcon} />
            </Button>
        </div>
    );
};

export const LandmarkFilters = memo(LandmarkFiltersComponent);
