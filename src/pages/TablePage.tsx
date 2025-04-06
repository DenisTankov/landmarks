import {Button} from '@gravity-ui/uikit';
import {useEffect, useState} from 'react';
import {LandmarkTable} from '../components/LandmarkTable/LandmarkTable';
import {Landmark} from '../types/Landmark';

export const TablePage = ({isAdmin}: {isAdmin: boolean}) => {
    const [landmarks, setLandmarks] = useState<Landmark[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = () => {
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

            {isAdmin && (
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const formData = new FormData(form);
                        const newLandmark = Object.fromEntries(formData.entries());

                        await fetch('http://localhost:3000/landmarks', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                ...newLandmark,
                                dateAdded: new Date().toISOString(),
                                rating: Number(newLandmark.rating),
                                latitude: Number(newLandmark.latitude),
                                longitude: Number(newLandmark.longitude),
                            }),
                        });

                        form.reset();
                        fetchData();
                    }}
                >
                    <h2>Добавить достопримечательность</h2>
                    <input name="name" placeholder="Название" required />
                    <input name="description" placeholder="Описание" required />
                    <input name="photoUrl" placeholder="Фото URL" />
                    <input name="location" placeholder="Местоположение" />
                    <input name="latitude" type="number" step="any" placeholder="Широта" />
                    <input name="longitude" type="number" step="any" placeholder="Долгота" />
                    <input name="rating" type="number" min="1" max="5" placeholder="Рейтинг" />
                    <select name="status">
                        <option value="в планах">В планах</option>
                        <option value="осмотрена">Осмотрена</option>
                    </select>
                    <Button style={{marginLeft: '5px'}} type="submit">
                        Создать
                    </Button>
                </form>
            )}
        </div>
    );
};
