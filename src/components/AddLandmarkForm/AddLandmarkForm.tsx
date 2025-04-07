import {Button, Select} from '@gravity-ui/uikit';
import {useEffect, useRef} from 'react';
import {Landmark} from '../../types/Landmark';
import styles from './AddLandmarkForm.module.scss';
import {Text} from '@gravity-ui/uikit';

export const AddLandmarkForm = ({
    onLandmarkAdded,
    editingLandmark,
    onEditingDone,
    onCloseAdmin,
}: {
    onLandmarkAdded: () => void;
    editingLandmark?: Landmark | null;
    onEditingDone?: () => void;
    onCloseAdmin?: () => void;
}) => {
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (editingLandmark && formRef.current) {
            const form = formRef.current;
            const fields: Record<string, string> = {
                name: editingLandmark.name,
                description: editingLandmark.description,
                photoUrl: editingLandmark.photoUrl,
                location: editingLandmark.location,
                latitude: String(editingLandmark.latitude),
                longitude: String(editingLandmark.longitude),
                rating: String(editingLandmark.rating),
                status: editingLandmark.status,
            };

            Object.entries(fields).forEach(([key, value]) => {
                const input = form.elements.namedItem(key) as
                    | HTMLInputElement
                    | HTMLSelectElement
                    | null;
                if (input) input.value = value;
            });
        }
    }, [editingLandmark]);

    const handleClean = () => {
        formRef.current?.reset();
        onEditingDone?.();
    };

    return (
        <form
            className={styles.form}
            ref={formRef}
            onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const landmark = Object.fromEntries(formData.entries());

                const method = editingLandmark ? 'PUT' : 'POST';
                const url = editingLandmark
                    ? `http://localhost:3000/landmarks/${editingLandmark.id}`
                    : 'http://localhost:3000/landmarks';

                await fetch(url, {
                    method,
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        ...landmark,
                        dateAdded: editingLandmark?.dateAdded || new Date().toISOString(),
                        rating: Number(landmark.rating),
                        latitude: Number(landmark.latitude),
                        longitude: Number(landmark.longitude),
                    }),
                });

                form.reset();
                onLandmarkAdded();
                onEditingDone?.();
            }}
        >
            <div className={styles.formHeader}>
                <Text variant="subheader-1" color="primary">
                    {editingLandmark ? 'Редактировать' : 'Добавить'} достопримечательность
                </Text>
            </div>
            <div className={styles.grid}>
                <input name="name" placeholder="Название" required />
                <input name="description" placeholder="Описание" required />
                <input name="photoUrl" placeholder="Фото URL" required />
                <input name="location" placeholder="Местоположение" required />
                <input name="latitude" type="number" step="any" placeholder="Широта" required />
                <input name="longitude" type="number" step="any" placeholder="Долгота" required />
                <input name="rating" type="number" min="1" max="5" placeholder="Рейтинг" required />
                <Select name="status" defaultValue={['в планах']}>
                    <Select.Option value="в планах">в планах</Select.Option>
                    <Select.Option value="осмотрена">осмотрена</Select.Option>
                </Select>
            </div>
            <div className={styles.btnWrapper}>
                <Button type="submit" view="outlined-success">
                    {editingLandmark ? 'Сохранить' : 'Создать'}
                </Button>
                <Button type="button" view="outlined-action" onClick={handleClean}>
                    Очистить
                </Button>
                {onCloseAdmin && (
                    <Button type="button" view="outlined-danger" onClick={onCloseAdmin}>
                        Закрыть форму
                    </Button>
                )}
            </div>
        </form>
    );
};
