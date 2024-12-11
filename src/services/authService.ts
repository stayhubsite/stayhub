// src/services/authService.ts
export interface LoginResponse {
  message: string;
  role?: string;
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { message: data.message || 'Error en el login.' };
    }

    return { message: data.message, role: data.role };
  } catch (error) {
    console.error('Error al llamar al API de login:', error);
    return { message: 'Error en el login.' };
  }
};
