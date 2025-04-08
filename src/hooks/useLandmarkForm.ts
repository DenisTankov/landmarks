import {useEffect, useState} from 'react';
import {Landmark} from '../types/Landmark';

export const useLandmarkForm = (editingLandmark?: Landmark | null) => {
    const [form, setForm] = useState({
        name: '',
        description: '',
        photoUrl: '',
        location: '',
        latitude: '',
        longitude: '',
        rating: '',
        status: 'в планах',
    });

    useEffect(() => {
        if (editingLandmark) {
            setForm({
                name: editingLandmark.name || '',
                description: editingLandmark.description || '',
                photoUrl: editingLandmark.photoUrl || '',
                location: editingLandmark.location || '',
                latitude: String(editingLandmark.latitude),
                longitude: String(editingLandmark.longitude),
                rating: String(editingLandmark.rating),
                status: editingLandmark.status || 'в планах',
            });
        }
    }, [editingLandmark]);

    const updateField = (name: string, value: string) => {
        setForm((prev) => ({...prev, [name]: value}));
    };

    const reset = () => {
        setForm({
            name: '',
            description: '',
            photoUrl: '',
            location: '',
            latitude: '',
            longitude: '',
            rating: '',
            status: 'в планах',
        });
    };

    return {
        form,
        updateField,
        reset,
    };
};
