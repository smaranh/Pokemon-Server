const express = require("express");

const router = express.Router();
const Pokedex = require("../models/pokedexInfo");

const getPokemons = async (req, res, next) => {
    let pokemon;
    try {
        pokemon = await Pokedex.findById(req.params.id);
        if (pokemon == null) {
            return res.status(404).json({message: 'Pokemon missing!!'});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }

    res.pokemon = pokemon;
    next();
}

router.get('/', async (req, res) => {
    try {
        const caughtPokemons = await Pokedex.find();
        res.json(caughtPokemons);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/:id', getPokemons, (req, res) => {
    res.json(res.pokemon);
});

router.post('/', async (req, res) => {
    const pokemon = new Pokedex({
        name: req.body.name,
        imageUrl: req.body.imageUrl
    });
    try {
        const newPokemon = await pokemon.save();
        res.status(201).json(newPokemon);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.patch('/:id', getPokemons, async (req, res) => {
    if (req.body.name) res.pokemon.name = req.body.name;
    if (req.body.imageUrl) res.pokemon.imageUrl = req.body.imageUrl;

    try {
        const updatedPokemon = await res.pokemon.save();
        res.json(updatedPokemon);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.delete('/:id', getPokemons, async (req, res) => {
    try {
        await res.pokemon.remove();
        res.json({message: 'Pokemon was set free'});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;