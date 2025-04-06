import {Button, Icon, Table} from '@gravity-ui/uikit';
import {useEffect, useState} from 'react';
import {Landmark} from '../../types/Landmark';
import {PencilIcon} from '../../ui/PencilIcon ';
import {TrashBinIcon} from '../../ui/TrashBinIcon';
import {getMapLink} from '../../utils/getMapLink';
import styles from './LandmarkTable.module.scss';

interface LandmarkTableProps {
    data: Landmark[];
    isAdmin: boolean;
}

export const LandmarkTable: React.FC<LandmarkTableProps> = ({data, isAdmin}) => {
    const [mapLinks, setMapLinks] = useState<{[id: string]: string}>({});

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

    const handleDelete = async (id: string) => {
        await fetch(`http://localhost:3000/landmarks/${id}`, {
            method: 'DELETE',
        });
        window.location.reload();
    };

    const rows = data.map((item) => ({
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
                <Button className={styles.btn} onClick={() => alert(`Редактировать ${item.name}`)}>
                    <Icon data={PencilIcon} size={16} />
                </Button>
                <Button className={styles.btn} view="normal" onClick={() => handleDelete(item.id)}>
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
        <div>
            <div>Всего в таблице: {data.length} достопримечательностей</div>
            <Table className={styles.table} columns={columns} data={rows} />
        </div>
    );
};
