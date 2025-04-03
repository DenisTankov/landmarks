export const getMapLink = (lat: number, lon: number, type: 'google' | 'yandex' = 'google') => {
    return type === 'google'
        ? `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
        : `https://yandex.ru/maps/?pt=${lon},${lat}&z=15&l=map`;
};
