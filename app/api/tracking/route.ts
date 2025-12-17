import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import InvoiceRequest from '@/models/InvoiceRequest'
import Booking from '@/models/Booking'

interface TrackingStatus {
  status: string
  location: string
  timestamp: string
  description: string
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')

    if (!code) {
      return NextResponse.json(
        { error: 'Tracking code is required' },
        { status: 400 }
      )
    }

    const searchCode = code.toUpperCase()

    // Connect to database
    await connectDB()

    // First, check invoice requests collection for AWB
    let invoiceRequest = await InvoiceRequest.findOne({ awb: searchCode })

    // If not found in invoice requests, check bookings collection
    if (!invoiceRequest) {
      const booking = await Booking.findOne({
        $or: [
          { awb: searchCode },
          { trackingCode: searchCode },
        ],
      })

      if (booking) {
        // Return booking information
        const updatedAt = booking.updatedAt 
          ? (booking.updatedAt instanceof Date ? booking.updatedAt.toISOString() : new Date(booking.updatedAt).toISOString())
          : new Date().toISOString()
        
        const createdAt = booking.createdAt
          ? (booking.createdAt instanceof Date ? booking.createdAt.toISOString() : new Date(booking.createdAt).toISOString())
          : new Date().toISOString()

        return NextResponse.json({
          code: searchCode,
          type: 'booking',
          booking: {
            trackingCode: booking.trackingCode,
            awb: booking.awb || null,
            service: booking.service,
            status: booking.status || 'pending',
            createdAt: createdAt,
          },
          // If there's tracking status data, include it
          status: booking.status ? [
            {
              status: booking.status,
              location: booking.receiverAddress || 'In transit',
              timestamp: updatedAt,
              description: `Booking ${booking.status}`,
            },
          ] : [],
        })
      }
    } else {
      // Found in invoice requests
      let booking = null
      if (invoiceRequest.bookingId || invoiceRequest.trackingCode) {
        const query: any = {}
        
        if (invoiceRequest.bookingId) {
          // Try to find by _id (ObjectId) or bookingId string
          try {
            const mongoose = await import('mongoose')
            if (mongoose.default.Types.ObjectId.isValid(invoiceRequest.bookingId)) {
              query._id = new mongoose.default.Types.ObjectId(invoiceRequest.bookingId)
            } else {
              query._id = invoiceRequest.bookingId
            }
          } catch {
            query._id = invoiceRequest.bookingId
          }
        }
        
        if (invoiceRequest.trackingCode) {
          if (Object.keys(query).length > 0) {
            booking = await Booking.findOne({
              $or: [
                query,
                { trackingCode: invoiceRequest.trackingCode },
              ],
            })
          } else {
            booking = await Booking.findOne({ trackingCode: invoiceRequest.trackingCode })
          }
        } else {
          booking = await Booking.findOne(query)
        }
      }

      const invoiceUpdatedAt = invoiceRequest.updatedAt
        ? (invoiceRequest.updatedAt instanceof Date ? invoiceRequest.updatedAt.toISOString() : new Date(invoiceRequest.updatedAt).toISOString())
        : new Date().toISOString()
      
      const invoiceCreatedAt = invoiceRequest.createdAt
        ? (invoiceRequest.createdAt instanceof Date ? invoiceRequest.createdAt.toISOString() : new Date(invoiceRequest.createdAt).toISOString())
        : new Date().toISOString()

      return NextResponse.json({
        code: searchCode,
        type: 'invoice',
        invoice: {
          awb: invoiceRequest.awb,
          invoiceNumber: invoiceRequest.invoiceNumber || null,
          status: invoiceRequest.status || 'processing',
          createdAt: invoiceCreatedAt,
        },
        booking: booking ? {
          trackingCode: booking.trackingCode,
          service: booking.service,
          status: booking.status,
        } : null,
        status: invoiceRequest.status ? [
          {
            status: invoiceRequest.status,
            location: booking?.receiverAddress || 'In transit',
            timestamp: invoiceUpdatedAt,
            description: `Invoice ${invoiceRequest.status}`,
          },
        ] : [],
      })
    }

    // If not found in either collection
    return NextResponse.json(
      { error: 'Tracking code not found' },
      { status: 404 }
    )
  } catch (error) {
    console.error('Tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tracking information' },
      { status: 500 }
    )
  }
}

