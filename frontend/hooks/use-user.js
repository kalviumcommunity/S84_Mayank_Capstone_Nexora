import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('authToken');
      console.log('useUser: token found?', !!token);
      if (!token) {
        setLoading(false);
        // If we are already on a protected route, we might want to redirect?
        // But for now, we just leave user as null.
        return;
      }

      try {
        console.log('useUser: fetching user...');
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const response = await fetch(`${API_URL}/api/user`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log('useUser: response status', response.status);

        if (response.ok) {
          const userData = await response.json();
          console.log('useUser: userData', userData);
          setUser(userData);
        } else {
            console.error('Failed to fetch user', response.status);
            // Token is invalid, remove it to prevent infinite loop or bad state
            localStorage.removeItem('authToken'); 
            // set user to null explicitly (already default)
            setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
      localStorage.removeItem('authToken');
      router.push('/login');
  };

  return { user, loading, logout };
}
