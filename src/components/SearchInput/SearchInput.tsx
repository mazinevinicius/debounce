import { Input } from '@chakra-ui/react'
import React, { ChangeEvent, FC, useState } from 'react'
import useDebounce from '../../hooks/useDebounce/useDebounce'

export const SearchInput: FC<{ 
  value: string, 
  onChange: (v: string) => void
}> = ({ value, onChange }) => {
  const [displayValue, setDisplayValue] = useState(value)
  const debouncedChange = useDebounce(onChange, 500)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target

    setDisplayValue(value)
    debouncedChange(value)
  }

  return (<Input value={displayValue} onChange={handleChange} />)
}