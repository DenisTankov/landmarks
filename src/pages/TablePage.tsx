import {useEffect, useState} from 'react';
import {AddLandmarkForm} from '../components/AddLandmarkForm/AddLandmarkForm';
import {LandmarkTable} from '../components/LandmarkTable/LandmarkTable';
import {Landmark} from '../types/Landmark';
import {fetchLandmarks} from '../utils/fetchLandmarks';

export const TablePage = ({isAdmin, onExitAdmin}: {isAdmin: boolean; onExitAdmin: () => void}) => {
    const [landmarks, setLandmarks] = useState<Landmark[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingLandmark, setEditingLandmark] = useState<Landmark | null>(null);

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

    const handleDelete = async (id: string) => {
        await fetch(`http://localhost:3000/landmarks/${id}`, {
            method: 'DELETE',
        });
        fetchData();
    };

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    return (
        <div>
            <h1>Достопримечательности</h1>
            <LandmarkTable
                data={landmarks}
                isAdmin={isAdmin}
                onEdit={(landmark) => setEditingLandmark(landmark)}
                onDelete={handleDelete}
            />
            {isAdmin && (
                <AddLandmarkForm
                    onLandmarkAdded={fetchData}
                    editingLandmark={editingLandmark}
                    onEditingDone={() => setEditingLandmark(null)}
                    onCloseAdmin={onExitAdmin}
                />
            )}
        </div>
    );
};
