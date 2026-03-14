const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) ?? 'http://localhost:8000';

interface ApiError {
    status: number;
    data: Record<string, unknown>;
}

export async function post<T>(path: string, body: unknown): Promise<T> {
    const response = await fetch(`${API_BASE}/api${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data: unknown = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw { status: response.status, data } as ApiError;
    }

    return data as T;
}

export async function get<T>(path: string): Promise<T> {
    const response = await fetch(`${API_BASE}/api${path}`, {
        headers: { Accept: 'application/json' },
    });

    const data: unknown = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw { status: response.status, data } as ApiError;
    }

    return data as T;
}
