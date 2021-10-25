// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://statsapi.web.nhl.com/api/v1/teams/',
  }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `?expand=${name}`,
    }),
  }),
});

export const pokemonApi2 = createApi({
  reducerPath: 'pokemonApi2',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://pokeapi.co/api/v2/https://statsapi.web.nhl.com/api/v1/teams/?expand=team.stats',
  }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi;
export const { getSeasonSchedule } = pokemonApi2;
