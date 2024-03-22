import Link from "next/link";

export function PokemonCard({ pokemon }) {
    return (
        <Link href={``}>
            <div className="bg-gray-800 p-10 text-white rounded-md hover:cursor-pointer hover:bg-gray-700 flex flex-col items-center">
                <h1 className="text-2xl font-bold">{pokemon.name}</h1>
                <img src={pokemon.sprites.front_default}/>
                <p className="text-slate-300">{pokemon.name}</p>
                <p className="text-slate-300">Altura: {pokemon.height}</p>
                <p className="text-slate-300">Peso: {pokemon.weight}</p>
                <p className="text-slate-300">Exp Base: {pokemon.base_experience}</p>
            </div>
        </Link>
    );
}

export default PokemonCard;