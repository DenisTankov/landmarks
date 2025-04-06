import {Button, Icon, Select, Table, TextInput} from '@gravity-ui/uikit';
import {useEffect, useMemo, useState} from 'react';
import {Landmark} from '../../types/Landmark';
import {PencilIcon} from '../../ui/PencilIcon ';
import {TrashBinIcon} from '../../ui/TrashBinIcon';
import {getMapLink} from '../../utils/getMapLink';
import styles from './LandmarkTable.module.scss';

interface LandmarkTableProps {
    data: Landmark[];
    isAdmin: boolean;
    onEdit: (landmark: Landmark) => void;
    onDelete: (id: string) => void;
}

export const LandmarkTable: React.FC<LandmarkTableProps> = ({data, isAdmin, onEdit, onDelete}) => {
    const [mapLinks, setMapLinks] = useState<{[id: string]: string}>({});
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string[]>([]);
    const [sortKey, setSortKey] = useState<'name' | 'rating' | 'dateAdded'>('name');
    const [sortAsc, setSortAsc] = useState(true);

    useEffect(() => {
        const fetchLinks = async () => {
            const links: {[id: string]: string} = {};
            for (const landmark of data) {
                const link = await getMapLink(landmark.latitude, landmark.longitude);
                links[landmark.id] = link;
            }
            setMapLinks(links);
        };

        fetchLinks();
    }, [data]);

    const filteredData = useMemo(() => {
        return data
            .filter(
                (item) =>
                    item.name.toLowerCase().includes(search.toLowerCase()) &&
                    (statusFilter.length === 0 || statusFilter.includes(item.status)),
            )
            .sort((a, b) => {
                const aValue =
                    sortKey === 'dateAdded' ? new Date(a.dateAdded).getTime() : a[sortKey];
                const bValue =
                    sortKey === 'dateAdded' ? new Date(b.dateAdded).getTime() : b[sortKey];
                if (aValue < bValue) return sortAsc ? -1 : 1;
                if (aValue > bValue) return sortAsc ? 1 : -1;
                return 0;
            });
    }, [data, search, statusFilter, sortKey, sortAsc]);

    const rows = filteredData.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        dateAdded: new Date(item.dateAdded).toLocaleString(),
        rating: `⭐ ${item.rating}/5`,
        photoUrl: (
            <a href={item.photoUrl} target="_blank" rel="noopener noreferrer">
                Открыть
            </a>
        ),
        location: item.location,
        coordinates: `${item.latitude}, ${item.longitude}`,
        map: (
            <a href={mapLinks[item.id]} target="_blank" rel="noopener noreferrer">
                Открыть
            </a>
        ),
        status: item.status === 'в планах' ? '🟢 В планах' : '🔵 Осмотрена',
        actions: isAdmin ? (
            <>
                <Button className={styles.btn} onClick={() => onEdit(item)} view="outlined">
                    <Icon data={PencilIcon} size={16} />
                </Button>
                <Button className={styles.btn} onClick={() => onDelete(item.id)} view="outlined">
                    <Icon data={TrashBinIcon} size={16} />
                </Button>
            </>
        ) : null,
    }));

    const columns = [
        {id: 'id', name: 'id'},
        {id: 'name', name: 'Название'},
        {id: 'description', name: 'Описание'},
        {id: 'dateAdded', name: 'Дата добавления'},
        {id: 'rating', name: 'Рейтинг'},
        {id: 'photoUrl', name: 'Фото'},
        {id: 'location', name: 'Местоположение'},
        {id: 'coordinates', name: 'Координаты'},
        {id: 'map', name: 'Карта'},
        {id: 'status', name: 'Статус'},
        ...(isAdmin ? [{id: 'actions', name: 'Действия'}] : []),
    ];

    return (
        <div className={styles.tableWrapper}>
            <div style={{marginBottom: '1rem', fontWeight: 'bold'}}>
                Всего в таблице: {filteredData.length} достопримечательностей
            </div>

            <div style={{display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap'}}>
                <TextInput
                    placeholder="Поиск по названию"
                    value={search}
                    onUpdate={setSearch}
                    style={{minWidth: 200}}
                />
                <Select
                    placeholder="Статус"
                    value={statusFilter}
                    onUpdate={setStatusFilter}
                    multiple
                    options={[
                        {value: 'в планах', content: 'В планах'},
                        {value: 'осмотрена', content: 'Осмотрена'},
                    ]}
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
                <Button view="flat" onClick={() => setSortAsc((prev) => !prev)}>
                    {sortAsc ? 'По возрастанию' : 'По убыванию'}
                </Button>
            </div>

            <Table className={styles.table} columns={columns} data={rows} />
        </div>
    );
};
