import { Text } from "@chakra-ui/react"
import { useState } from "react"
import { SearchInput } from "../components/SearchInput/SearchInput"

const Index = () => {
  return (
    <>
      <Text>Debaunce</Text>
      <SearchInput value="" onChange={(v) => console.log(v)} />
    </>
  )
}

export default Index
