import {useEffect, useRef, useState} from 'react';
import {Landmark} from '../types/Landmark';

export const useLandmarkForm = (initial?: Landmark | null) => {
    const [form, setForm] = useState<Omit<Landmark, 'id' | 'dateAdded'>>({
        name: '',
        description: '',
        photoUrl: '',
        location: '',
        latitude: 0,
        longitude: 0,
        rating: 1,
        status: 'в планах',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const firstInvalidField = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (initial) {
            setForm({
                name: initial.name || '',
                description: initial.description || '',
                photoUrl: initial.photoUrl || '',
                location: initial.location || '',
                latitude: initial.latitude || 0,
                longitude: initial.longitude || 0,
                rating: initial.rating || 1,
                status: initial.status || 'в планах',
            });
        }
    }, [initial]);

    const updateField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
        setForm((prev) => ({...prev, [key]: value}));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!form.name.trim()) newErrors.name = 'Обязательное поле';
        if (!form.description.trim()) newErrors.description = 'Обязательное поле';
        if (form.rating < 1 || form.rating > 5) newErrors.rating = 'Рейтинг от 1 до 5';
        if (!form.latitude || isNaN(form.latitude)) newErrors.latitude = 'Введите широту';
        if (!form.longitude || isNaN(form.longitude)) newErrors.longitude = 'Введите долготу';

        setErrors(newErrors);

        setTimeout(() => {
            firstInvalidField.current?.focus();
        }, 0);

        return Object.keys(newErrors).length === 0;
    };

    const reset = () => {
        setForm({
            name: '',
            description: '',
            photoUrl: '',
            location: '',
            latitude: 0,
            longitude: 0,
            rating: 1,
            status: 'в планах',
        });
        setErrors({});
    };

    return {
        form,
        errors,
        updateField,
        validateForm,
        reset,
        firstInvalidField,
    };
};
