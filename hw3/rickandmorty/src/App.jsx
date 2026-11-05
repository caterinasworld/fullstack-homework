import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  NavLink,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './App.css';

function Home() {
  return (
    <section>
      <h1>Rick and Morty Explorer</h1>
      <p>
        Explore characters, species, and locations from the
        Rick and Morty universe.
      </p>
    </section>
  );
}

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCharacters() {
      try {
        const ids = Array.from(
          { length: 100 },
          (_, index) => index + 1,
        ).join(',');

        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${ids}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error('Could not load characters. Please try again later.');
        }

        const data = await response.json();
        setCharacters(data);
        setLoading(false);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    fetchCharacters();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <p role="status">Loading characters...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <section>
      <h1>Characters</h1>
      <p>Showing the first {characters.length} characters.</p>

      <div className="character-grid">
        {characters.map((character) => (
          <article className="character-card" key={character.id}>
            <img
              src={character.image}
              alt={character.name}
              loading="lazy"
              width="300"
              height="300"
            />
            <div className="card-details">
              <h2>{character.name}</h2>
              <p>Species: {character.species || 'Unknown'}</p>
              <p>Status: {character.status || 'Unknown'}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Species() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchSpecies() {
      try {
        let nextUrl = 'https://rickandmortyapi.com/api/character';
        const allCharacters = [];

        while (nextUrl) {
          const response = await fetch(nextUrl, {
            signal: controller.signal,
          });

          if (!response.ok) {
            throw new Error('Could not load species. Please try again later.');
          }

          const data = await response.json();
          allCharacters.push(...data.results);
          nextUrl = data.info.next;
        }

        setCharacters(allCharacters);
        setLoading(false);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    fetchSpecies();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <p role="status">Loading all characters to group by species...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  const groups = new Map();

  characters.forEach((character) => {
    const species = character.species?.trim() || 'Unknown';

    if (!groups.has(species)) {
      groups.set(species, []);
    }

    groups.get(species).push(character);
  });

  const sortedGroups = [...groups.entries()].sort(
    ([first], [second]) => first.localeCompare(second),
  );

  return (
    <section>
      <h1>Species</h1>
      <p>
        {characters.length} characters across {groups.size} species.
      </p>

      {sortedGroups.map(([species, members]) => (
        <article className="species-group" key={species}>
          <h2>{species}: {members.length}</h2>
          <ul>
            {members.map((character) => (
              <li key={character.id}>{character.name}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}

function Locations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchLocations() {
      try {
        let nextUrl = 'https://rickandmortyapi.com/api/location';
        const allLocations = [];

        while (nextUrl) {
          const response = await fetch(nextUrl, {
            signal: controller.signal,
          });

          if (!response.ok) {
            throw new Error('Could not load locations. Please try again later.');
          }

          const data = await response.json();
          allLocations.push(...data.results);
          nextUrl = data.info.next;
        }

        setLocations(allLocations);
        setLoading(false);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    fetchLocations();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <p role="status">Loading locations...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  const counts = new Map();

  locations.forEach((location) => {
    const type = location.type?.trim() || 'Unknown';
    counts.set(type, (counts.get(type) || 0) + 1);
  });

  const sortedTypes = [...counts.entries()].sort(
    ([first], [second]) => first.localeCompare(second),
  );

  return (
    <section>
      <h1>Locations</h1>
      <p>
        {locations.length} locations across {counts.size} types.
      </p>

      <table className="location-table">
        <caption>Number of locations by type</caption>
        <thead>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Number of locations</th>
          </tr>
        </thead>
        <tbody>
          {sortedTypes.map(([type, count]) => (
            <tr key={type}>
              <th scope="row">{type}</th>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <nav aria-label="Main navigation">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/characters">Characters</NavLink>
          <NavLink to="/species">Species</NavLink>
          <NavLink to="/locations">Locations</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/species" element={<Species />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}