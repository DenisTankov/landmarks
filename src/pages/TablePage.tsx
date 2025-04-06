import {useEffect, useState} from 'react';
import {AddLandmarkForm} from '../components/AddLandmarkForm/AddLandmarkForm';
import {LandmarkTable} from '../components/LandmarkTable/LandmarkTable';
import {Landmark} from '../types/Landmark';
import {fetchLandmarks} from '../utils/fetchLandmarks';

export const TablePage = ({isAdmin}: {isAdmin: boolean}) => {
    const [landmarks, setLandmarks] = useState<Landmark[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = () => {
        fetchLandmarks()
            .then((data) => {
                setLandmarks(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    return (
        <div>
            <h1>Достопримечательности</h1>
            <LandmarkTable data={landmarks} isAdmin={isAdmin} />
            {isAdmin && <AddLandmarkForm onLandmarkAdded={fetchData} />}
        </div>
    );
};
