import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardType';

interface DataFetcherOutput {
  data: OpenMeteoResponse | null;
  loading: boolean;
  error: string | null;
}

export default function DataFetcher(latitude: number, longitude: number): DataFetcherOutput {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago`;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const result: OpenMeteoResponse = await response.json();
        if (isMounted) setData(result);
      } catch (err: any) {
        if (isMounted) setError(err.message || 'Error desconocido al obtener datos');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [latitude, longitude]);

  return { data, loading, error };
}