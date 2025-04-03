// import React from 'react';
import {Table} from '@gravity-ui/uikit';
import {Landmark} from '../../types/Landmark';
import {getMapLink} from '../../utils/getMapLink';
import styles from './LandmarkTable.module.scss';

interface LandmarkTableProps {
    data: Landmark[];
}

export const LandmarkTable: React.FC<LandmarkTableProps> = ({data}) => {
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
    ];

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
            <a
                href={getMapLink(item.latitude, item.longitude)}
                target="_blank"
                rel="noopener noreferrer"
            >
                Открыть
            </a>
        ),
        status: item.status === 'в планах' ? '🟢 В планах' : '🔵 Осмотрена',
    }));

    return <Table className={styles.table} columns={columns} data={rows} />;
};
