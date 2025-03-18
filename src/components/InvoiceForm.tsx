import React from 'react'
import CompanyInfo from './CompanyInfo'
import ClientInfo from './ClientInfo'
import InvoiceDetails from './InvoiceDetails'
import LineItems from './LineItems'
import LogoUploader from './LogoUploader'

import { InvoiceState } from '../types'

type InvoiceFormProps = {
  state: InvoiceState
  dispatch: React.Dispatch<any>
  logoError: string | null
  handleLogoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleClearLogo: () => void
  handleLogoZoomChange: (zoom: number) => void
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  state,
  dispatch,
  logoError,
  handleLogoUpload,
  handleClearLogo,
  handleLogoZoomChange
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({ type: 'updateField', field: e.target.name, value: e.target.value })
  }

  return (
    <div className="p-8 space-y-6">
      <LogoUploader
        logo={state.logo}
        logoError={logoError}
        handleLogoUpload={handleLogoUpload}
        handleClearLogo={handleClearLogo}
        logoZoom={state.logoZoom}
        handleLogoZoomChange={handleLogoZoomChange}
      />
      <CompanyInfo state={state} dispatch={dispatch} />
      <ClientInfo state={state} dispatch={dispatch} />
      <InvoiceDetails state={state} dispatch={dispatch} />
      <LineItems items={state.items} dispatch={dispatch} />

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
        <div className="mt-1">
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Enter any notes here..."
            value={state.notes}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label htmlFor="terms" className="block text-sm font-medium text-gray-700">Terms (Optional)</label>
        <div className="mt-1">
          <textarea
            id="terms"
            name="terms"
            rows={3}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Enter payment terms here..."
            value={state.terms}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}

export default InvoiceForm
