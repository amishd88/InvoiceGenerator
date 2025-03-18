import React from 'react'
import { Trash2 } from 'lucide-react'
import { LineItem } from '../types' // Assuming you'll create a types.ts file

type LineItemRowProps = {
  item: LineItem
  dispatch: React.Dispatch<any> // Consider defining a more specific action type
}

const LineItemRow: React.FC<LineItemRowProps> = ({ item, dispatch }) => {
  return (
    <div className="flex gap-4 items-start">
      <input
        value={item.description}
        onChange={e => dispatch({
          type: 'UPDATE_ITEM',
          id: item.id,
          field: 'description',
          value: e.target.value
        })}
        placeholder="Item description"
        className="flex-1 p-2 border rounded-lg"
      />
      <input
        type="number"
        value={item.quantity}
        onChange={e => dispatch({
          type: 'UPDATE_ITEM',
          id: item.id,
          field: 'quantity',
          value: Math.max(1, parseInt(e.target.value))
        })}
        className="w-20 p-2 border rounded-lg"
      />
      <input
        type="number"
        value={item.price}
        onChange={e => dispatch({
          type: 'UPDATE_ITEM',
          id: item.id,
          field: 'price',
          value: parseFloat(e.target.value)
        })}
        placeholder="Price"
        className="w-32 p-2 border rounded-lg"
      />
      <div className="flex items-center gap-2">
        <label className="text-sm">Tax Rate (%)</label>
        <input
          type="number"
          value={item.taxRate}
          onChange={e => dispatch({
            type: 'UPDATE_ITEM',
            id: item.id,
            field: 'taxRate',
            value: parseFloat(e.target.value)
          })}
          className="w-16 p-2 border rounded-lg text-sm"
        />
      </div>
      <button
        onClick={() => dispatch({ type: 'REMOVE_ITEM', id: item.id })}
        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
      >
        <Trash2 size={18} />
      </button>
    </div>
  )
}

export default LineItemRow
