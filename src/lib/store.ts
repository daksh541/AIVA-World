import { create } from 'zustand';
import { api } from './api';

interface User {
  _id: string;
  name: string;
  email: string;
  plan: 'free' | 'premium' | 'pro';
  credits: number;
  avatarCount: number;
}

const AUTH_STORAGE_KEY = 'aiva_auth_state';

const persistAuthState = (token: string, user: User) => {
  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      token,
      user,
      timestamp: Date.now(),
    })
  );
};

const clearAuthState = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
  showLoginModal: boolean;
  showSignupModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  setShowSignupModal: (show: boolean) => void;
  initialize: () => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  user: null,
  showLoginModal: false,
  showSignupModal: false,
  setShowLoginModal: (show) => set({ showLoginModal: show }),
  setShowSignupModal: (show) => set({ showSignupModal: show }),
  initialize: () => {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { token: string; user: User };
      if (parsed?.token && parsed?.user) {
        set({
          token: parsed.token,
          user: parsed.user,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.warn('Failed to restore auth state', error);
      clearAuthState();
    }
  },
  login: async (email, password) => {
    const data = await api.post<{ token: string; user: User }>('/auth/login', { email, password });
    persistAuthState(data.token, data.user);
    set({
      token: data.token,
      user: data.user,
      isAuthenticated: true,
      showLoginModal: false,
    });
  },
  signup: async (name, email, password) => {
    const data = await api.post<{ token: string; user: User }>('/auth/signup', { name, email, password });
    persistAuthState(data.token, data.user);
    set({
      token: data.token,
      user: data.user,
      isAuthenticated: true,
      showSignupModal: false,
    });
  },
  logout: () => {
    clearAuthState();
    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },
}));

export interface Avatar {
  id: string;
  name: string;
  creator: string;
  likes: number;
  downloads: number;
  price: string;
  category: string;
  description?: string;
  imageUrl?: string;
}

type AvatarResponse = Omit<Avatar, 'id'> & {
  id?: string;
  _id?: string;
};

interface AvatarState {
  selectedAvatar: Avatar | null;
  showAvatarModal: boolean;
  avatars: Avatar[];
  isLoading: boolean;
  error: string | null;
  setSelectedAvatar: (avatar: Avatar) => void;
  setShowAvatarModal: (show: boolean) => void;
  addAvatar: (avatar: Avatar) => void;
  fetchAvatars: () => Promise<void>;
}

export const useAvatarStore = create<AvatarState>((set, get) => ({
  selectedAvatar: null,
  showAvatarModal: false,
  avatars: [],
  isLoading: false,
  error: null,
  setSelectedAvatar: (avatar) => set({ selectedAvatar: avatar, showAvatarModal: true }),
  setShowAvatarModal: (show) => set({ showAvatarModal: show }),
  addAvatar: (avatar) => set((state) => ({ avatars: [avatar, ...state.avatars] })),
  fetchAvatars: async () => {
    if (get().isLoading || get().avatars.length > 0) {
      return;
    }
    set({ isLoading: true, error: null });
    try {
      const data = await api.get<{ avatars: AvatarResponse[] }>('/avatars');
      const normalized = data.avatars.map((avatar) => ({
        ...avatar,
        id: avatar.id || avatar._id || Math.random().toString(36).slice(2),
      }));
      set({ avatars: normalized, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: (error as Error).message });
      throw error;
    }
  },
}));

// Theme Store
interface ThemeState {
  theme: 'dark' | 'light' | 'high-contrast';
  setTheme: (theme: 'dark' | 'light' | 'high-contrast') => void;
  initialize: () => void;
}

const THEME_STORAGE_KEY = 'aiva-theme';

const getStoredTheme = (): 'dark' | 'light' | 'high-contrast' => {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && ['dark', 'light', 'high-contrast'].includes(stored)) {
      return stored as 'dark' | 'light' | 'high-contrast';
    }
  } catch (e) {
    console.warn('Failed to read theme from localStorage', e);
  }
  return 'dark';
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: getStoredTheme(),
  initialize: () => {
    const theme = getStoredTheme();
    set({ theme });
    document.documentElement.setAttribute('data-theme', theme);
  },
  setTheme: (theme) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {
      console.warn('Failed to save theme to localStorage', e);
    }
    set({ theme });
    document.documentElement.setAttribute('data-theme', theme);
  },
}));