import {Text} from '@gravity-ui/uikit';
import {useCallback, useEffect, useState} from 'react';
import {AddLandmarkForm} from '../components/AddLandmarkForm/AddLandmarkForm';
import {LandmarkTable} from '../components/LandmarkTable/LandmarkTable';
import {Landmark} from '../types/Landmark';
import {fetchLandmarks} from '../utils/fetchLandmarks';
import styles from './TablePage.module.scss';

type TablePageProps = {
    isAdmin: boolean;
    onExitAdmin: () => void;
};

export const TablePage = (props: TablePageProps) => {
    const {isAdmin, onExitAdmin} = props;

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

    const handleEdit = useCallback((landmark: Landmark) => {
        setEditingLandmark(landmark);
    }, []);

    const handleDelete = useCallback(async (id: string) => {
        await fetch(`http://localhost:3000/landmarks/${id}`, {method: 'DELETE'});
        fetchData();
    }, []);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    return (
        <div>
            <Text variant="header-1" color="primary">
                Достопримечательности
            </Text>
            <LandmarkTable
                data={landmarks}
                isAdmin={isAdmin}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            {isAdmin && (
                <div className={styles.formWrapper}>
                    <AddLandmarkForm
                        onLandmarkAdded={fetchData}
                        editingLandmark={editingLandmark}
                        onEditingDone={() => setEditingLandmark(null)}
                        onCloseAdmin={onExitAdmin}
                    />
                </div>
            )}
        </div>
    );
};
