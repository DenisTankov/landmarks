import {useEffect, useState} from 'react';
import {LandmarkTable} from '../components/LandmarkTable/LandmarkTable';
import {Landmark} from '../types/Landmark';

export const TablePage = () => {
    const [landmarks, setLandmarks] = useState<Landmark[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/landmarks')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Ошибка загрузки данных');
                }
                return response.json();
            })
            .then((data) => {
                setLandmarks(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    return (
        <div>
            <h1>Достопримечательности</h1>
            <LandmarkTable data={landmarks} />
        </div>
    );
};
