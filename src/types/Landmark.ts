export interface Landmark {
    id: string;
    name: string;
    description: string;
    dateAdded: string;
    rating: number;
    photoUrl: string;
    location: string;
    latitude: number;
    longitude: number;
    status: 'в планах' | 'осмотрена';
}
