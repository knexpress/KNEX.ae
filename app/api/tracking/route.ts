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
        const createdAt = booking.createdAt
          ? (booking.createdAt instanceof Date ? booking.createdAt.toISOString() : new Date(booking.createdAt).toISOString())
          : new Date().toISOString()

        // Format shipment_status_history into tracking status array
        let statusHistory: TrackingStatus[] = []
        
        if (booking.shipment_status_history && Array.isArray(booking.shipment_status_history) && booking.shipment_status_history.length > 0) {
          // Sort by updated_at (newest first) and format
          statusHistory = booking.shipment_status_history
            .map((historyItem: any) => {
              const updatedAt = historyItem.updated_at
                ? (historyItem.updated_at instanceof Date 
                    ? historyItem.updated_at.toISOString() 
                    : new Date(historyItem.updated_at).toISOString())
                : new Date().toISOString()
              
              // Format status for display
              const statusText = historyItem.status?.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Unknown'
              
              // Determine location based on status
              let location = 'In transit'
              if (historyItem.status?.includes('MANILA')) {
                location = 'Manila, Philippines'
              } else if (historyItem.status?.includes('DUBAI') || historyItem.status?.includes('UAE')) {
                location = 'Dubai, UAE'
              } else if (booking.receiverAddress) {
                location = booking.receiverAddress
              } else if (booking.senderAddress) {
                location = booking.senderAddress
              }

              return {
                status: historyItem.status || 'UNKNOWN',
                location: location,
                timestamp: updatedAt,
                description: historyItem.notes || statusText,
              }
            })
            .sort((a: TrackingStatus, b: TrackingStatus) => {
              // Sort by timestamp (newest first)
              return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            })
        } else if (booking.shipment_status) {
          // If no history but has current status, create a single status entry
          const statusText = booking.shipment_status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l: string) => l.toUpperCase())
          let location = 'In transit'
          if (booking.shipment_status.includes('MANILA')) {
            location = 'Manila, Philippines'
          } else if (booking.shipment_status.includes('DUBAI') || booking.shipment_status.includes('UAE')) {
            location = 'Dubai, UAE'
          } else if (booking.receiverAddress) {
            location = booking.receiverAddress
          }
          
          statusHistory = [{
            status: booking.shipment_status,
            location: location,
            timestamp: booking.updatedAt 
              ? (booking.updatedAt instanceof Date ? booking.updatedAt.toISOString() : new Date(booking.updatedAt).toISOString())
              : new Date().toISOString(),
            description: statusText,
          }]
        } else if (booking.status) {
          // Fallback to old status field
          statusHistory = [{
            status: booking.status,
            location: booking.receiverAddress || 'In transit',
            timestamp: booking.updatedAt 
              ? (booking.updatedAt instanceof Date ? booking.updatedAt.toISOString() : new Date(booking.updatedAt).toISOString())
              : new Date().toISOString(),
            description: `Booking ${booking.status}`,
          }]
        }

        return NextResponse.json({
          code: searchCode,
          type: 'booking',
          booking: {
            trackingCode: booking.trackingCode,
            awb: booking.awb || null,
            service: booking.service,
            status: booking.shipment_status || booking.status || 'pending',
            batch_no: (booking as any).batch_no || null,
            createdAt: createdAt,
          },
          status: statusHistory,
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
          status: (booking as any).shipment_status || booking.status,
        } : null,
        status: (() => {
          // If booking found, use its shipment_status_history
          if (booking && (booking as any).shipment_status_history && Array.isArray((booking as any).shipment_status_history) && (booking as any).shipment_status_history.length > 0) {
            return (booking as any).shipment_status_history
              .map((historyItem: any) => {
                const updatedAt = historyItem.updated_at
                  ? (historyItem.updated_at instanceof Date 
                      ? historyItem.updated_at.toISOString() 
                      : new Date(historyItem.updated_at).toISOString())
                  : invoiceUpdatedAt
                
                const statusText = historyItem.status?.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Unknown'
                
                let location = 'In transit'
                if (historyItem.status?.includes('MANILA')) {
                  location = 'Manila, Philippines'
                } else if (historyItem.status?.includes('DUBAI') || historyItem.status?.includes('UAE')) {
                  location = 'Dubai, UAE'
                } else if (booking.receiverAddress) {
                  location = booking.receiverAddress
                }

                return {
                  status: historyItem.status || 'UNKNOWN',
                  location: location,
                  timestamp: updatedAt,
                  description: historyItem.notes || statusText,
                }
              })
              .sort((a: TrackingStatus, b: TrackingStatus) => {
                return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
              })
          }
          // If booking has shipment_status but no history, create status from shipment_status
          if (booking && (booking as any).shipment_status) {
            const statusText = (booking as any).shipment_status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l: string) => l.toUpperCase())
            let location = 'In transit'
            if ((booking as any).shipment_status.includes('MANILA')) {
              location = 'Manila, Philippines'
            } else if ((booking as any).shipment_status.includes('DUBAI') || (booking as any).shipment_status.includes('UAE')) {
              location = 'Dubai, UAE'
            } else if (booking.receiverAddress) {
              location = booking.receiverAddress
            }
            return [{
              status: (booking as any).shipment_status,
              location: location,
              timestamp: booking.updatedAt 
                ? (booking.updatedAt instanceof Date ? booking.updatedAt.toISOString() : new Date(booking.updatedAt).toISOString())
                : invoiceUpdatedAt,
              description: statusText,
            }]
          }
          // Fallback to invoice status
          return invoiceRequest.status ? [
            {
              status: invoiceRequest.status,
              location: booking?.receiverAddress || 'In transit',
              timestamp: invoiceUpdatedAt,
              description: `Invoice ${invoiceRequest.status}`,
            },
          ] : []
        })(),
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

