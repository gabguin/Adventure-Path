import { useEffect, useState } from 'react'
import './App.css'
import { pokemonData } from './data/pokemon'
import pokemonImages from './assets/images'
import { HomePage } from './pages/HomePage'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api'

const getTeamIdentifier = (team, fallbackIndex = 0) => team?.id ?? team?.savedAt ?? `${team?.name ?? 'team'}-${fallbackIndex}`
const getTrainerIdentifier = (trainer, fallbackIndex = 0) => trainer?.id ?? trainer?.trainer_id ?? `${trainer?.username ?? 'trainer'}-${fallbackIndex}`

const getPokemonImageUrl = (pokemon) => {
  if (!pokemon) return ''
  const normalizedName = (pokemon.species_name ?? pokemon.name ?? '').trim().toLowerCase()
  const matchedImage = pokemonImages.find((entry) => entry.name.trim().toLowerCase() === normalizedName)
  return matchedImage?.imageLink ?? pokemon.image_url ?? ''
}

const hydrateDbPokemon = (member) => {
  if (!member) return null
  const localPokemon = pokemonData.pokemon.find((entry) => entry.pokemon_id === member.pokemon_id)
  return {
    ...localPokemon,
    ...member,
    nickname: member.nickname ?? member.member_nickname ?? '',
    image_url: getPokemonImageUrl({ ...localPokemon, ...member }),
  }
}

function App() {
  const [lineup, setLineup] = useState(Array(6).fill(null))
  const [savedTeams, setSavedTeams] = useState([])
  const [savedTrainers, setSavedTrainers] = useState([])
  const [currentView, setCurrentView] = useState('builder')
  const [editingTeamId, setEditingTeamId] = useState(null)
  const [editingTeamName, setEditingTeamName] = useState('')
  const [editingTeamTrainerId, setEditingTeamTrainerId] = useState(null)
  const [pokemonList, setPokemonList] = useState(pokemonData.pokemon)
  const [types, setTypes] = useState(pokemonData.types)

  useEffect(() => {
    fetch(`${API_BASE_URL}/trainers`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch trainers')
        return res.json()
      })
      .then((data) => {
        setSavedTrainers(data.map((trainer) => ({
          id: `${trainer.trainer_id}`,
          username: trainer.username,
        })))
      })
      .catch((err) => {
        console.error('Unable to load trainers from backend:', err)
        setSavedTrainers(
          pokemonData.trainers.map((trainer, index) => ({
            id: `${trainer.trainer_id ?? `trainer-${index}`}`,
            username: trainer.username,
          })),
        )
      })

    fetch(`${API_BASE_URL}/teams`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch teams')
        return res.json()
      })
      .then((data) => {
        setSavedTeams(data.map((team) => ({
          id: `${team.team_id}`,
          name: team.team_name,
          trainerId: team.trainer_id !== null ? `${team.trainer_id}` : null,
          pokemon: team.pokemon.map(hydrateDbPokemon),
        })))
      })
      .catch((err) => {
        console.error('Unable to load teams from backend:', err)
        setSavedTeams([])
      })
  }, [])

  useEffect(() => {
    fetch(`${API_BASE_URL}/pokemon`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch Pokémon list')
        return res.json()
      })
      .then((data) => {
        setPokemonList(data.map((pokemon) => hydrateDbPokemon(pokemon)))
      })
      .catch((err) => {
        console.error('Unable to load Pokémon from backend:', err)
      })

    fetch(`${API_BASE_URL}/types`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch type data')
        return res.json()
      })
      .then((data) => {
        setTypes(data)
      })
      .catch((err) => {
        console.error('Unable to load type data from backend:', err)
        setTypes(pokemonData.types)
      })
  }, [])

  const handleSelect = (slotIndex, pokemon) => {
    setLineup((currentLineup) => {
      // if (pokemon) {
      //   const duplicateIndex = currentLineup.findIndex((existing, index) => index !== slotIndex && existing?.pokemon_id === pokemon.pokemon_id)
      //   if (duplicateIndex !== -1) {
      //     return currentLineup
      //   }
      // }

      const nextLineup = [...currentLineup]
      nextLineup[slotIndex] = pokemon
      return nextLineup
    })
  }

  const hydratePokemon = (pokemon) => {
    if (!pokemon) return null

    const canonicalPokemon = pokemonData.pokemon.find((entry) => entry.pokemon_id === pokemon.pokemon_id) ?? pokemon
    return {
      ...canonicalPokemon,
      nickname: pokemon.nickname ?? pokemon.member_nickname ?? "",
      image_url: getPokemonImageUrl({ ...canonicalPokemon, ...pokemon }),
    }
  }

  const handleRemove = (slotIndex) => {
    setLineup((currentLineup) => {
      const nextLineup = [...currentLineup]
      nextLineup[slotIndex] = null
      return nextLineup
    })
  }

  const handleEditTeam = (team) => {
    const hydratedLineup = Array(6).fill(null)
    team.pokemon.forEach((pokemon, index) => {
      hydratedLineup[index] = hydratePokemon(pokemon)
    })

    setLineup(hydratedLineup)
    setEditingTeamId(getTeamIdentifier(team))
    setEditingTeamName(team.name)
    setEditingTeamTrainerId(team.trainerId ?? null)
    setCurrentView('builder')
  }

  const handleDeleteTeam = async (team) => {
    const teamIdentifier = getTeamIdentifier(team)

    try {
      await fetch(`${API_BASE_URL}/teams/${team.id}`, {
        method: 'DELETE',
      })
      setSavedTeams((currentTeams) => currentTeams.filter((existingTeam) => getTeamIdentifier(existingTeam) !== teamIdentifier))

      if (teamIdentifier === editingTeamId) {
        setEditingTeamId(null)
        setEditingTeamName('')
      }
    } catch (error) {
      console.error('Failed to delete team from backend:', error)
    }
  }

  const handleSaveTrainer = async (username) => {
    const normalizedName = username.trim()
    if (!normalizedName) {
      return { success: false, error: 'invalid' }
    }

    if (savedTrainers.some((trainer) => trainer.username.trim().toLowerCase() === normalizedName.toLowerCase())) {
      return { success: false, error: 'duplicate' }
    }

    try {
      const response = await fetch(`${API_BASE_URL}/trainers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: normalizedName }),
      })

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null)
        return {
          success: false,
          error: 'backend',
          message: errorBody?.error || 'Unable to save trainer to backend.',
        }
      }

      const savedTrainer = await response.json()
      setSavedTrainers((currentTrainers) => [
        {
          id: `${savedTrainer.trainer_id}`,
          username: savedTrainer.username,
        },
        ...currentTrainers,
      ])
      return { success: true, trainer: savedTrainer }
    } catch (error) {
      console.error('Failed to save trainer to backend:', error)
      return {
        success: false,
        error: 'backend',
        message: error?.message ?? 'Network error while saving trainer.',
      }
    }
  }

  const handleDeleteTrainer = async (trainer) => {
    const trainerIdentifier = getTrainerIdentifier(trainer)

    try {
      await fetch(`${API_BASE_URL}/trainers/${trainerIdentifier}`, {
        method: 'DELETE',
      })
      setSavedTrainers((currentTrainers) => currentTrainers.filter((existingTrainer) => getTrainerIdentifier(existingTrainer) !== trainerIdentifier))
      setSavedTeams((currentTeams) => currentTeams.filter((team) => `${team.trainerId}` !== `${trainerIdentifier}`))
    } catch (error) {
      console.error('Failed to delete trainer from backend:', error)
    }
  }

  const handleSaveTeam = async (teamName, trainerId) => {
    const normalizedName = teamName.trim().toLowerCase()
    const selectedPokemons = lineup.filter(Boolean)

    if (!normalizedName || selectedPokemons.length === 0 || !trainerId) return false

    const duplicateName = savedTeams.some((team) => {
      const teamIdentifier = getTeamIdentifier(team)
      return team.trainerId === trainerId && team.name.trim().toLowerCase() === normalizedName && teamIdentifier !== editingTeamId
    })

    if (duplicateName) {
      return false
    }

    const payload = {
      name: teamName.trim(),
      trainerId: Number(trainerId),
      pokemon: selectedPokemons.map((poke) => ({
        pokemon_id: poke.pokemon_id,
        nickname: poke.nickname ?? poke.member_nickname ?? null,
      })),
    }

    try {
      const response = await fetch(
        editingTeamId ? `${API_BASE_URL}/teams/${editingTeamId}` : `${API_BASE_URL}/teams`,
        {
          method: editingTeamId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      )

      if (!response.ok) {
        return false
      }

      const savedTeam = await response.json()
      const teamObject = {
        id: `${savedTeam.team_id}`,
        name: teamName.trim(),
        trainerId,
        pokemon: selectedPokemons.map((poke) => ({ ...poke })),
        savedAt: new Date().toISOString(),
      }

      setSavedTeams((currentTeams) => {
        if (editingTeamId) {
          return currentTeams.map((team) => (getTeamIdentifier(team) === editingTeamId ? teamObject : team))
        }

        return [teamObject, ...currentTeams].slice(0, 10)
      })

      setEditingTeamId(null)
      setEditingTeamName('')
      setEditingTeamTrainerId(null)
      setCurrentView('saved')
      return true
    } catch (error) {
      console.error('Failed to save team to backend:', error)
      return false
    }
  }

  return (
    <HomePage
      lineup={lineup}
      pokemonList={pokemonList}
      types={types}
      onSelect={handleSelect}
      onRemove={handleRemove}
      onSaveTeam={handleSaveTeam}
      savedTeams={savedTeams}
      savedTrainers={savedTrainers}
      currentView={currentView}
      onChangeView={setCurrentView}
      onUpdateTeam={handleEditTeam}
      onDeleteTeam={handleDeleteTeam}
      editingTeamName={editingTeamName}
      editingTeamTrainerId={editingTeamTrainerId}
      onSaveTrainer={handleSaveTrainer}
      onDeleteTrainer={handleDeleteTrainer}
    />
  )
}

export default App

