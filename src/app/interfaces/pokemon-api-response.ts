export interface PokeApiResponse {
    name: string;
    id: number;
    types: { type: { name: string } }[];
    sprites: {
      front_default: string;
      versions: {
        'generation-v': {
          'black-white': {
            animated: {
              front_default: string;
            };
          };
        };
      };
    };
    height: number;
    weight: number;
    abilities: { ability: { name: string } }[];
}
export interface PokeSpeciesResponse {
    flavor_text_entries: { flavor_text: string, language: { name: string } }[];
}