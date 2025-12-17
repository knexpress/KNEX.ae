import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IBooking extends Document {
  trackingCode: string
  awb?: string
  service: {
    id: string
    title: string
    type: string
    price: string
  }
  senderName: string
  senderEmail: string
  senderPhone: string
  senderAddress: string
  receiverName: string
  receiverEmail: string
  receiverPhone: string
  receiverAddress: string
  weight: string
  description: string
  pickupType: 'dropoff' | 'pickup'
  status?: string
  createdAt: Date
  updatedAt: Date
}

const BookingSchema: Schema = new Schema(
  {
    trackingCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true,
    },
    awb: {
      type: String,
      uppercase: true,
      index: true,
    },
    service: {
      id: String,
      title: String,
      type: String,
      price: String,
    },
    senderName: { type: String, required: true },
    senderEmail: { type: String, required: true },
    senderPhone: { type: String, required: true },
    senderAddress: { type: String, required: true },
    receiverName: { type: String, required: true },
    receiverEmail: { type: String, required: true },
    receiverPhone: { type: String, required: true },
    receiverAddress: { type: String, required: true },
    weight: { type: String, required: true },
    description: String,
    pickupType: {
      type: String,
      enum: ['dropoff', 'pickup'],
      default: 'dropoff',
    },
    status: String,
  },
  {
    timestamps: true,
  }
)

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema)

export default Booking

