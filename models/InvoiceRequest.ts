import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IInvoiceRequest extends Document {
  awb: string
  invoiceNumber?: string
  bookingId?: string
  trackingCode?: string
  status?: string
  createdAt: Date
  updatedAt: Date
}

const InvoiceRequestSchema: Schema = new Schema(
  {
    awb: {
      type: String,
      required: true,
      uppercase: true,
      index: true,
    },
    invoiceNumber: String,
    bookingId: String,
    trackingCode: {
      type: String,
      uppercase: true,
    },
    status: String,
  },
  {
    timestamps: true,
  }
)

const InvoiceRequest: Model<IInvoiceRequest> =
  mongoose.models.InvoiceRequest || mongoose.model<IInvoiceRequest>('InvoiceRequest', InvoiceRequestSchema)

export default InvoiceRequest

