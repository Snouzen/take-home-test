"use client"

import { useState } from "react"

type Domino = [number, number]

const defaultData: Domino[] = [
  [6, 1],
  [4, 3],
  [5, 1],
  [3, 4],
  [1, 1],
  [3, 4],
  [1, 2],
  [2, 2],
  [10, 10],
]

export default function Page() {
  const [dominoes, setDominoes] = useState<Domino[]>([...defaultData])
  const [removeInput, setRemoveInput] = useState('')

  const countDouble = () => {
    return dominoes.filter(([a, b]) => a === b).length
  }

  const sortAsc = () => {
    const sorted = [...dominoes].sort((a, b) => {
      if (a[0] !== b[0]) return a[0] - b[0]
      return a[1] - b[1]
    })
    setDominoes(sorted)
  }

  const sortDesc = () => {
    const sorted = [...dominoes].sort((a, b) => {
      if (b[0] !== a[0]) return b[0] - a[0]
      return b[1] - a[1]
    })
    setDominoes(sorted)
  }

  const flipCards = () => {
    setDominoes(dominoes.map(([a, b]) => [b, a]))
  }

  const removeDuplicates = () => {
    const seen = new Set<string>()
    const unique = dominoes.filter(([a, b]) => {
      const key1 = `${a},${b}`
      const key2 = `${b},${a}`
      if (seen.has(key1) || seen.has(key2)) return false
      seen.add(key1)
      return true
    })
    setDominoes(unique)
  }

  const reset = () => setDominoes([...defaultData])

  const validValues = Array.from (
    new Set(defaultData.map(([a, b]) => a + b))
  )

  const inputValid = !isNaN(parseInt(removeInput)) && validValues.includes(parseInt(removeInput))

  const removeBySum = () => {
    const num = parseInt(removeInput)
    if (!isNaN(num) && validValues.includes(num)) {
      const filtered = dominoes.filter(([a, b]) => a + b !== num)
      setDominoes(filtered)
    } else {
      false
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white">
      <h1 className="text-3xl font-bold mb-4">Dominoes</h1>

      <div className="mb-4">
        <h2 className="font-semibold">Source</h2>
        <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(dominoes)}</pre>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold">Double Numbers</h2>
        <pre className="bg-gray-100 p-2 rounded">{countDouble()}</pre>
      </div>

      <div className="flex flex-wrap gap-3 my-6">
        {dominoes.map(([a, b], i) => (
          <div
            key={i}
            className="w-12 h-20 border border-gray-400 rounded bg-white flex flex-col items-center justify-center shadow-sm"
          >
            <div className="text-sm font-semibold">{a}</div>
            <div className="text-xs">-</div>
            <div className="text-sm font-semibold">{b}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={sortAsc} className="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Sort (ASC)
        </button>
        <button onClick={sortDesc} className="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Sort (DESC)
        </button>
        <button onClick={flipCards} className="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Flip
        </button>
        <button onClick={removeDuplicates} className="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Remove Duplicate
        </button>
        <button onClick={reset} className="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Reset
        </button>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="number"
          className="border p-2 rounded w-32"
          placeholder="Input Number"
          value={removeInput}
          onChange={(e) => setRemoveInput(e.target.value)}
        />
        <button
        onClick={removeBySum}
        disabled={!inputValid}
        className={`btn px-4 py-2 rounded text-white ${
          inputValid ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-300 cursor-not-allowed'
        }`}
        >
          Remove
        </button>
      </div>
    </div>
  )
}
