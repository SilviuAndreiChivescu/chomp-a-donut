import { useState, useEffect } from "react";
import { apiRoot } from "../config";
import type { Donut } from "src/types/donut";

const useDonuts = () => {
  const [chompedIds, setChompedIds] = useState<Record<string, boolean>>(() => {
    const storedIds = sessionStorage.getItem("chompedIds");
    return storedIds ? JSON.parse(storedIds) : {};
  });

  useEffect(() => {
    sessionStorage.setItem("chompedIds", JSON.stringify(chompedIds));
  }, [chompedIds]);

  const [donuts, setDonuts] = useState<Donut[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(false);

  const handleChomp = (id: string) => {
    setChompedIds((prev) => ({ ...prev, [id]: true }));
  };

  const handleReset = () => {
    setChompedIds({});
    sessionStorage.removeItem("chompedIds");
  };

  const fetchDonuts = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`${apiRoot}/donuts`);
      if (!response.ok) {
        throw new Error(`Error fetching donuts: ${response.statusText}`);
      }
      const data: Donut[] = await response.json();
      const shuffledDonuts = data
        // randomly display donuts each time they are fetched
        .sort(() => Math.random() - 0.5);

      setDonuts(shuffledDonuts);
    } catch (err: unknown) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonuts();
  }, []);

  return {
    donuts,
    chompedIds,
    loading,
    error,
    handleReset,
    handleChomp,
    fetchDonuts,
  };
};

export { useDonuts };
