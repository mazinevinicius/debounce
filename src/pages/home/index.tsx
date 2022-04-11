import { Center, Flex, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { SearchInput } from "../../components/SearchInput/SearchInput"
import axios from "axios"

const Home = () => {
    const [search, setSearch] = useState("")
    const [data, setData] = useState<any>()
    const [error, setError] = useState<{ error: any, status: number }>()
    const [isLoadingPokemon, setIsLoadingPokemon] = useState(false)
    const [apiCount, setApiCount] = useState(0);
  
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
          setApiCount((prevCount) => prevCount + 1);
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
      <Center h="100vh">
        <Flex flexDirection="column">
        <Text>Debounce</Text>
        <SearchInput value="" onChangeCustom={(v) => setSearch(v)} />
        {data && !error 
          ? <Text>Name: {data.name} | Ability: {data.abilities[0].ability.name}</Text> 
          : null
        }
        {search === '' && !error && !isLoadingPokemon && <Text>Please enter a pokemon name</Text>}
        {error && error.status === 404 && <Text>Pokemon not found</Text>}
        {error && error.status === 500 && <Text>Internal server error</Text>}
        {isLoadingPokemon && <Text>Loading...</Text>}
        <Text>API's call: {apiCount}</Text>
        </Flex>
      </Center>
  
      </>
    )
}

export default Home