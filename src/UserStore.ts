import { create } from "zustand";

interface User {
    username: string;
    role: string;
    isLoggedIn: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const keyname = "userstore";

export const useUserStore = create<User>(
    (set) => {
        const storedstate = sessionStorage.getItem(keyname);
        const initialstate = storedstate ?
            JSON.parse(storedstate) : { username: "", role: "", isLoggedIn: false };
        sessionStorage.setItem(keyname, JSON.stringify(initialstate));
        return {
            ...initialstate,
            logout: () => {
                const newstate = { username: "", role: "", isLoggedIn: false };
                sessionStorage.setItem(keyname, JSON.stringify(newstate));
                set(newstate);
            },
            login: async (username: string, password: string) => {
                const roleval = username.toLowerCase().startsWith("x") && password != "" ? "admin" : "user";
                const newstate = { username: username, role: roleval, isLoggedIn: true };
                sessionStorage.setItem(keyname, JSON.stringify(newstate));
                set(newstate);
            }
        }
    }
);