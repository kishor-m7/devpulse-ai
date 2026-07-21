import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const RepositoryContext = createContext();

export function RepositoryProvider({ children }) {
  const [repositories, setRepositories] = useState([]);
  const [activeRepo, setActiveRepo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRepos() {
      try {
        const data = await apiService.getRepositories();
        setRepositories(data);
        if (data.length > 0) {
          setActiveRepo(data[0]);
        }
      } catch (err) {
        console.error('Failed to load repositories', err);
      } finally {
        setLoading(false);
      }
    }
    loadRepos();
  }, []);

  const selectRepository = (repoId) => {
    const selected = repositories.find((r) => r.id === repoId);
    if (selected) {
      setActiveRepo(selected);
    }
  };

  const addRepository = (newRepo) => {
    setRepositories((prev) => [newRepo, ...prev]);
    setActiveRepo(newRepo);
  };

  return (
    <RepositoryContext.Provider
      value={{
        repositories,
        activeRepo,
        selectRepository,
        addRepository,
        loading
      }}
    >
      {children}
    </RepositoryContext.Provider>
  );
}

export function useRepository() {
  return useContext(RepositoryContext);
}
