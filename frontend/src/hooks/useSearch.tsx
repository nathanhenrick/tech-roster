import { useMemo, useState } from 'react'

export function useSearch<T extends object>(
  items: T[],
  keys: (keyof T)[]
) {
  const [query, setQuery] = useState('')

  const filteredItems = useMemo(() => {
    if (!query) return items

    const q = query.toLowerCase()

    return items.filter(item =>
      keys.some(key =>
        String(item[key] ?? '')
          .toLowerCase()
          .includes(q)
      )
    )
  }, [items, keys, query])

  return {
    query,
    setQuery,
    filteredItems
  }
}
