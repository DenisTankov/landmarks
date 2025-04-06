export const fetchLandmarks = async () => {
    const response = await fetch('http://localhost:3000/landmarks');
    if (!response.ok) {
        throw new Error('Ошибка загрузки данных');
    }
    return response.json();
};
