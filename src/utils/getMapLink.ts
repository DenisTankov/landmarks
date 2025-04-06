const YANDEX_API_KEY = '6bfa55b9-cb40-4639-a008-daa9ec859b07';

export async function getMapLink(lat: number, lon: number): Promise<string> {
    const geocoderUrl = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${YANDEX_API_KEY}&geocode=${lon},${lat}`;

    try {
        const response = await fetch(geocoderUrl);
        const data = await response.json();

        const featureMember = data.response.GeoObjectCollection.featureMember[0];
        const name = featureMember?.GeoObject?.name;
        const description = featureMember?.GeoObject?.description;

        const query = encodeURIComponent(`${name} ${description}`);
        return `https://yandex.ru/maps/?text=${query}`;
    } catch (error) {
        console.error('Ошибка геокодирования:', error);
        return `https://yandex.ru/maps/?ll=${lon},${lat}&z=17`;
    }
}

// export const getMapLink = (lat: number, lon: number, type: 'google' | 'yandex' = 'google') => {
//     return type === 'google'
//         ? `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
//         : `https://yandex.ru/maps/?pt=${lon},${lat}&z=15&l=map`;
// };
