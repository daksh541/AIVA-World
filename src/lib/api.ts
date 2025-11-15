const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

interface RequestOptions {
  method?: string;
  body?: unknown;
  token?: string | null;
}

const request = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const { method = 'GET', body, token } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = (data && (data.message as string)) || 'Something went wrong';
    throw new Error(message);
  }

  return data as T;
};

export const api = {
  get: <T>(path: string, token?: string | null) => request<T>(path, { method: 'GET', token }),
  post: <T>(path: string, body?: unknown, token?: string | null) => request<T>(path, { method: 'POST', body, token }),
};

export const API_BASE = API_BASE_URL;
