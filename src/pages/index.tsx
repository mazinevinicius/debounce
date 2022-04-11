import { Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { SearchInput } from "../components/SearchInput/SearchInput"
import axios from "axios"

const Index = () => {
  const [search, setSearch] = useState("")
  const [data, setData] = useState<any>()
  const [error, setError] = useState<{ error: any, status: number }>()
  const [isLoadingPokemon, setIsLoadingPokemon] = useState(false)

  const loadPokemon = async () => {
    try {
      const { data, status } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`)
      return { data, status }
    } catch (error) {
      console.error(error)
      return {
        error: error.response.data, 
        status: error.response.status
      }
    }
  }

  useEffect(() => {
    if (search) {
      (async function () { 
        const SUCCESS_STATUS = 200

        setIsLoadingPokemon(true)
        const {data, status, error} = await loadPokemon()
        setIsLoadingPokemon(false)

        if (status === SUCCESS_STATUS) {
          setData(data)
          setError(null)
        } else {
          setData(null)
          setError({ error, status })
        }
      })()
      return
    }

    setSearch('')
    setData(null)
    setError(null)
  }, [search])
  return (
    <>
      <Text>Debounce</Text>
      <SearchInput value="" onChange={(v) => setSearch(v)} />

      {data && !error 
        ? <Text>{data.name} | {data.abilities[0].ability.name}</Text> 
        : null
      }
      {search === '' && !error && !isLoadingPokemon && <Text>Please enter a pokemon name</Text>}
      {error && error.status === 404 && <Text>Pokemon not found</Text>}
      {error && error.status === 500 && <Text>Internal server error</Text>}
      {isLoadingPokemon && <Text>Loading...</Text>}
    </>
  )
}

export default Index
