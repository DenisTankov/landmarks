export interface Landmark {
    id: string;
    name: string;
    description: string;
    dateAdded: string;
    rating: 1 | 2 | 3 | 4 | 5;
    photoUrl: string;
    location: string;
    latitude: number;
    longitude: number;
    status: 'в планах' | 'осмотрена';
}
