import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { PokeApiResponse } from '../interfaces/pokemon-api-response';
import { PokeSpeciesResponse } from '../interfaces/pokemon-api-response';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private url = 'https://pokeapi.co/api/v2/pokemon/';
  private speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species/';

  constructor(private http: HttpClient) { }

  getAllPokemon(): Observable<Pokemon[]> {
    const pokemonNumbers = Array.from({ length: 10 }, (_, i) => i + 1);
    const pokemonRequests: Observable<Pokemon>[] = pokemonNumbers.map(pokemonNumber => {
      return this.http.get<PokeApiResponse>(this.url + pokemonNumber).pipe(
        switchMap(response => {
          const pokemon = this.transformToPokemon(response);
          return this.getDescription(response.id).pipe(
            map(description => {
              pokemon.description = description;
              return pokemon;
            })
          );
        })
      );
    }, this);
    return forkJoin(pokemonRequests);
  }
  getPokemon(name: String) : Observable<Pokemon[]> {
    return this.http.get<PokeApiResponse>(this.url + name).pipe(
      switchMap(response => {
        const pokemon = this.transformToPokemon(response);
        return this.getDescription(response.id).pipe(
          map(description => {
            pokemon.description = description;
            return [pokemon];
          })
        );
      }),
      catchError(() => of([]))
    );
  }

  private getDescription(id: number): Observable<string> {
    return this.http.get<PokeSpeciesResponse>(this.speciesUrl + id).pipe(
      map(response => {
        const entry = response.flavor_text_entries.find((entry : any) => entry.language.name === 'en');
        return entry ? entry.flavor_text : 'No description available.';
      })
    );
  }

  private transformToPokemon(response: PokeApiResponse): Pokemon {
    const pokemon = new Pokemon();
    pokemon.name = response.name;
    pokemon.number = response.id;
    pokemon.types = response.types.map(type => this.capitalizeFirstLetter(type.type.name));
    pokemon.imageUrl = response.sprites.front_default;
    pokemon.height = response.height/10;
    pokemon.weight = response.weight/10;
    pokemon.abilities = response.abilities.map(ability => ability.ability.name);
    pokemon.gifUrl = response.sprites.versions['generation-v']['black-white'].animated.front_default;
    return pokemon;
  }
  private capitalizeFirstLetter(string:String) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
