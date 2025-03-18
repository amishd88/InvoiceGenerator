export type LineItem = {
  id: string
  description: string
  quantity: number
  price: number
  taxRate: number
}

export type InvoiceState = {
  company: string
  companyAddress: string
  client: string
  clientAddress: string
  invoiceNumber: string
  dueDate: string
  items: LineItem[]
  logo?: string | null | ArrayBuffer
  logoZoom: number;
  notes?: string; // Optional notes field
  terms?: string; // Optional terms field
}
