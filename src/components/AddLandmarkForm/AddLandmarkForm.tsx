import {Button} from '@gravity-ui/uikit';

export const AddLandmarkForm = ({onLandmarkAdded}: {onLandmarkAdded: () => void}) => {
    return (
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
                onLandmarkAdded();
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
            <Button type="submit" view="normal">
                Создать
            </Button>
        </form>
    );
};
