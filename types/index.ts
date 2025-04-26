export interface User {
    id: string;
    email: string;
    name: string;
  }
  
  export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
  }

  export interface Hospital {
    id: string;
    name: string;
    address: string;
    imageUrl: string;
    rating: number;
    services: Service[];
  }

  export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: string;
  }
  