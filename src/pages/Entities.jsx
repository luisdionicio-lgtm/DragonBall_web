import { useEffect, useMemo, useState } from "react";

import CharacterCard from "@/components/CharacterCard";
import { Button } from "@/components/ui/button";
import { getCharacters } from "@/services/dragonballApi";

function Entities() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRace, setSelectedRace] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCharacters() {
      try {
        const data = await getCharacters();
        setCharacters(data);
      } catch (err) {
        setError("No se pudieron cargar los personajes. Revisa tu conexion.");
      } finally {
        setLoading(false);
      }
    }

    loadCharacters();
  }, []);

  const raceOptions = useMemo(() => {
    const races = characters
      .map((character) => character.race)
      .filter(Boolean)
      .filter((race, index, array) => array.indexOf(race) === index)
      .sort((a, b) => a.localeCompare(b));

    return ["All", ...races];
  }, [characters]);

  const filteredCharacters = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return characters.filter((character) => {
      const matchesName = character.name
        .toLowerCase()
        .includes(normalizedSearch);
      const matchesRace =
        selectedRace === "All" || character.race === selectedRace;

      return matchesName && matchesRace;
    });
  }, [characters, search, selectedRace]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-orange-500">
            Entidades
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">
            Listado completo de personajes
          </h1>
          <p className="mt-2 text-slate-600">
            Personajes obtenidos: {characters.length} | Mostrando:{" "}
            {filteredCharacters.length}
          </p>
        </div>

        <div className="w-full md:max-w-sm">
          <label htmlFor="search" className="sr-only">
            Buscar por nombre
          </label>
          <input
            id="search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por nombre..."
            className="h-11 w-full rounded-md border border-orange-200 bg-white px-4 text-sm shadow-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
          />
        </div>
      </div>

      {!loading && !error && (
        <div className="mb-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
            Filtrar por raza
          </p>
          <div className="flex flex-wrap gap-2">
            {raceOptions.map((race) => (
              <Button
                key={race}
                type="button"
                size="sm"
                variant={selectedRace === race ? "default" : "outline"}
                onClick={() => setSelectedRace(race)}
                className={
                  selectedRace === race
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "border-orange-200 bg-white text-slate-700 hover:bg-orange-50 hover:text-orange-700"
                }
              >
                {race === "All" ? "Todas" : race}
              </Button>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="flex min-h-60 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-700" />
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && filteredCharacters.length === 0 && (
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">
          No se encontraron personajes con esos filtros.
        </div>
      )}

      {!loading && !error && filteredCharacters.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCharacters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Entities;
