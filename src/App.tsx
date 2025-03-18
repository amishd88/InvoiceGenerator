import React, { useReducer, useRef, useState, useCallback, useMemo } from 'react'
import { useReactToPrint } from 'react-to-print'

import InvoiceControlBar from './components/InvoiceControlBar'
import InvoiceForm from './components/InvoiceForm'
import InvoicePreview from './components/InvoicePreview'
import { InvoiceState } from './types' // Assuming you'll create a types.ts file

const initialState: InvoiceState = {
  company: 'Acme Corp',
  companyAddress: '123 Business St.\nNew York, NY 10001',
  client: 'Client Company',
  clientAddress: '456 Client Ave.\nLos Angeles, CA 90001',
  invoiceNumber: 'INV-001',
  dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
  items: [],
  logo: null,
  logoZoom: 1
}


function reducer(prev: InvoiceState, action: any): InvoiceState {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...prev,
        items: [...prev.items, {
          id: crypto.randomUUID(),
          description: '',
          quantity: 1,
          price: 0,
          taxRate: 10
        }]
      }
    case 'UPDATE_ITEM':
      return {
        ...prev,
        items: prev.items.map(item =>
          item.id === action.id ? { ...item, [action.field]: action.value } : item
        )
      }
    case 'REMOVE_ITEM':
      return {
        ...prev,
        items: prev.items.filter(item => item.id !== action.id)
      }
    case 'SET_LOGO':
      return {
        ...prev,
        logo: action.logo
      }
    case 'CLEAR_LOGO':
      return {
        ...prev,
        logo: null
      }
    case 'SET_LOGO_ZOOM':
      return {
        ...prev,
        logoZoom: action.zoom
      }
    default:
      return { ...prev, ...action }
  }
}


export default function App() {
  const [isEditing, setIsEditing] = useState(true)
  const componentRef = useRef<any>(null)
  const handlePrint = useReactToPrint({ content: () => componentRef.current })
  const [logoError, setLogoError] = useState<string | null>(null)
  const [state, dispatch] = useReducer(reducer, initialState)


  const { subtotal, taxTotal, grandTotal } = useMemo(() => {
    const subtotal = state.items.reduce((sum, item) => sum + (item.quantity * item.price), 0)
    const taxTotal = state.items.reduce((sum, item) => sum + (item.quantity * item.price * (item.taxRate / 100)), 0)
    return {
      subtotal,
      taxTotal,
      grandTotal: subtotal + taxTotal
    }
  }, [state.items])


  const handleLogoUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setLogoError(null)
    const file = event.target.files?.[0];
    if (!file) {
      dispatch({ type: 'SET_LOGO', logo: null });
      return;
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      setLogoError("Logo size must be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch({ type: 'SET_LOGO', logo: reader.result });
    };
    reader.onerror = () => {
      setLogoError("Error uploading logo");
      dispatch({ type: 'SET_LOGO', logo: null });
    };
    reader.readAsDataURL(file);
  }, [dispatch, setLogoError]);

  const handleClearLogo = useCallback(() => {
    dispatch({ type: 'CLEAR_LOGO' });
  }, [dispatch]);

  const handleLogoZoomChange = useCallback((zoom: number) => {
    dispatch({ type: 'SET_LOGO_ZOOM', zoom });
  }, [dispatch]);


  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm">
        <InvoiceControlBar isEditing={isEditing} setIsEditing={setIsEditing} handlePrint={handlePrint} />

        {isEditing ? (
          <InvoiceForm
            state={state}
            dispatch={dispatch}
            logoError={logoError}
            handleLogoUpload={handleLogoUpload}
            handleClearLogo={handleClearLogo}
            handleLogoZoomChange={handleLogoZoomChange}
          />
        ) : (
          <InvoicePreview
            ref={componentRef}
            state={state}
            subtotal={subtotal}
            taxTotal={taxTotal}
            grandTotal={grandTotal}
          />
        )}
      </div>
    </div>
  )
}
