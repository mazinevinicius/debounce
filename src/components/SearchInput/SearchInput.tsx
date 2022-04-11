import { Input, InputProps } from '@chakra-ui/react'
import React, { ChangeEvent, FC, useState } from 'react'
import useDebounce from '../../hooks/useDebounce/useDebounce'

interface SearchInputProps extends InputProps {
  value: string, 
  onChangeCustom: (v: string) => void
}
export const SearchInput: FC<SearchInputProps> = ({ value, onChangeCustom, ...rest }) => {
  const [displayValue, setDisplayValue] = useState(value)
  const debouncedChange = useDebounce(onChangeCustom, 500)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target

    setDisplayValue(value)
    debouncedChange(value)
  }

  return (<Input value={displayValue} onChange={handleChange} {...rest} />)
}