import React from 'react'
import { InvoiceState } from '../types'
import InvoiceSummary from './InvoiceSummary'

type InvoicePreviewProps = {
  state: InvoiceState
  subtotal: number
  taxTotal: number
  grandTotal: number
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ state, subtotal, taxTotal, grandTotal }) => {
  return (
    <div className="p-12">
      {/* Invoice Preview */}
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div>
            {state.logo && typeof state.logo === 'string' && (
              <img src={state.logo} alt="Company Logo" className="max-h-20 mb-4" style={{ zoom: state.logoZoom }} />
            )}
            <h2 className="text-3xl font-bold">{state.company}</h2>
            <pre className="text-gray-600 mt-2 whitespace-pre-wrap">
              {state.companyAddress}
            </pre>
          </div>
          <div className="text-right">
            <h1 className="text-2xl font-bold text-blue-600">INVOICE</h1>
            <div className="mt-4 space-y-1">
              <p><span className="font-semibold">Invoice #:</span> {state.invoiceNumber}</p>
              <p><span className="font-semibold">Due Date:</span> {new Date(state.dueDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-500">BILL TO</h3>
            <p className="mt-2 text-lg">{state.client}</p>
            <pre className="text-gray-600 mt-1 whitespace-pre-wrap">
              {state.clientAddress}
            </pre>
          </div>
        </div>

        <div className="mt-8">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4">Description</th>
                <th className="py-3 px-4">Qty</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Tax Rate</th>
                <th className="text-right py-3 px-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {state.items.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="py-3 px-4">{item.description}</td>
                  <td className="py-3 px-4 text-center">{item.quantity}</td>
                  <td className="py-3 px-4">${item.price.toFixed(2)}</td>
                  <td className="py-3 px-4">{item.taxRate}%</td>
                  <td className="py-3 px-4 text-right">
                    ${(item.quantity * item.price * (1 + (item.taxRate / 100))).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8 max-w-xs ml-auto">
            <InvoiceSummary subtotal={subtotal} taxTotal={taxTotal} grandTotal={grandTotal} />
          </div>
        </div>

        {state.notes && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-gray-500">Notes</h3>
            <pre className="mt-2 whitespace-pre-wrap">{state.notes}</pre>
          </div>
        )}

        {state.terms && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-gray-500">Terms</h3>
            <pre className="mt-2 whitespace-pre-wrap">{state.terms}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default InvoicePreview
