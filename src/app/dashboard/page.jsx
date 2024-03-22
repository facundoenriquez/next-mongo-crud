import axios from 'axios';
import PokemonCard from '@/components/PokemonCard'

const loadPokemons = async () => {
    const pokemons = []
    for (let index = 1; index < 10; index++) {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${index}`);
        const pokemonData = response.data;
        pokemons.push(pokemonData)
    }
    return pokemons
}

const DashboardPage = async () => {

    const pokemons = await loadPokemons()
    console.log(pokemons[0])

    return (
        <>
            <div className="grid grid-cols-3 gap-2">
                {pokemons.map(pokemon => (
                    <PokemonCard pokemon={pokemon} key={pokemon.id} />
                ))}
            </div>
        </>
    )
};
export default DashboardPage;
