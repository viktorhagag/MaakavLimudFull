
'use client'
import React from 'react'

type Props = {
  checked: boolean
  onChange: (checked: boolean) => void
  title?: string
}

export default function RoundCheckbox({ checked, onChange, title }: Props) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={e => onChange(e.target.checked)}
      title={title}
      className="h-5 w-5 cursor-pointer rounded-full border-2 border-gray-300 text-green-600 focus:ring-2 focus:ring-green-400"
    />
  )
}
