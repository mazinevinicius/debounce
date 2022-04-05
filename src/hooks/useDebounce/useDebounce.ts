import { useRef } from "react"

export default function useDebounce(fn: (...params: any[]) => void, delay: number) {
    const timeoutRef = useRef(null)

    function debouncedFn(...args: any[]) {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = window.setTimeout(() => {
            fn(...args)
        }, delay)
    }

    return debouncedFn
}
