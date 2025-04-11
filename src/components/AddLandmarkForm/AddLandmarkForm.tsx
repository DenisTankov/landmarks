import {Button, Select, Text} from '@gravity-ui/uikit';
import {useLandmarkForm} from '../../hooks/useLandmarkForm';
import {Landmark} from '../../types/Landmark';
import styles from './AddLandmarkForm.module.scss';

type AddLandmarkFormProps = {
    onLandmarkAdded: () => void;
    editingLandmark?: Landmark | null;
    onEditingDone?: () => void;
    onCloseAdmin?: () => void;
};

export const AddLandmarkForm = (props: AddLandmarkFormProps) => {
    const {onLandmarkAdded, editingLandmark, onEditingDone, onCloseAdmin} = props;

    const {form, updateField, reset} = useLandmarkForm(editingLandmark);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const method = editingLandmark ? 'PUT' : 'POST';
        const url = editingLandmark
            ? `http://localhost:3000/landmarks/${editingLandmark.id}`
            : 'http://localhost:3000/landmarks';

        const payload = {
            ...form,
            dateAdded: editingLandmark?.dateAdded || new Date().toISOString(),
            rating: Number(form.rating),
            latitude: Number(form.latitude),
            longitude: Number(form.longitude),
        };

        await fetch(url, {
            method,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload),
        });

        reset();
        onLandmarkAdded();
        onEditingDone?.();
    };

    const handleClean = () => {
        reset();
        onEditingDone?.();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formHeader}>
                <Text variant="subheader-1" color="primary">
                    {editingLandmark ? 'Редактировать' : 'Добавить'} достопримечательность
                </Text>
            </div>
            <div className={styles.grid}>
                <input
                    name="name"
                    placeholder="Название"
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    required
                />
                <input
                    name="description"
                    placeholder="Описание"
                    value={form.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    required
                />
                <input
                    name="photoUrl"
                    placeholder="Фото URL"
                    value={form.photoUrl}
                    onChange={(e) => updateField('photoUrl', e.target.value)}
                    required
                />
                <input
                    name="location"
                    placeholder="Местоположение"
                    value={form.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    required
                />
                <input
                    name="latitude"
                    type="number"
                    step="any"
                    placeholder="Широта"
                    value={form.latitude}
                    onChange={(e) => updateField('latitude', e.target.value)}
                    required
                />
                <input
                    name="longitude"
                    type="number"
                    step="any"
                    placeholder="Долгота"
                    value={form.longitude}
                    onChange={(e) => updateField('longitude', e.target.value)}
                    required
                />
                <input
                    name="rating"
                    type="number"
                    min="1"
                    max="5"
                    placeholder="Рейтинг"
                    value={form.rating}
                    onChange={(e) => updateField('rating', e.target.value)}
                    required
                />
                <Select
                    name="status"
                    value={[form.status]}
                    onUpdate={([val]) => updateField('status', val)}
                    className={styles.select}
                >
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
