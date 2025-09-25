// utils/storage.ts

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";
const USERS_KEY = "users";

export interface User {
  name: string;
  email: string;
  password: string; // ⚠️ plain text (untuk demo), idealnya di-hash
}

export const storage = {
  // ===================== Token =====================
  setToken: (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, token);
    }
  },
  getToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  },
  removeToken: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
    }
  },

  // ===================== Current User =====================
  setUser: (user: User) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },
  getUser: (): User | null => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(USER_KEY);
      return data ? (JSON.parse(data) as User) : null;
    }
    return null;
  },
  removeUser: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(USER_KEY);
    }
  },

  // ===================== All Users =====================
  getAllUsers: (): User[] => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(USERS_KEY);
      return data ? (JSON.parse(data) as User[]) : [];
    }
    return [];
  },
  addUser: (user: User): boolean => {
    if (typeof window !== "undefined") {
      const users = storage.getAllUsers();
      const exists = users.some((u) => u.email === user.email);
      if (exists) return false; // email sudah dipakai
      users.push(user);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      return true;
    }
    return false;
  },
  findUser: (email: string, password: string): User | null => {
    const users = storage.getAllUsers();
    return (
      users.find((u) => u.email === email && u.password === password) ||
      null
    );
  },

  // ===================== Clear All =====================
  clear: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(USERS_KEY);
    }
  },
};
