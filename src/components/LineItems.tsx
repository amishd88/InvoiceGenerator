import React from 'react'
import { Plus } from 'lucide-react'
import LineItemRow from './LineItemRow'
import { LineItem } from '../types' // Assuming you'll create a types.ts file

type LineItemsProps = {
  items: LineItem[]
  dispatch: React.Dispatch<any> // Consider defining a more specific action type
}

const LineItems: React.FC<LineItemsProps> = ({ items, dispatch }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Items</h3>
        <button
          onClick={() => dispatch({ type: 'ADD_ITEM' })}
          className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={18} /> Add Item
        </button>
      </div>

      {items.map((item, index) => (
        <LineItemRow key={item.id} item={item} dispatch={dispatch} />
      ))}
    </div>
  )
}

export default LineItems
