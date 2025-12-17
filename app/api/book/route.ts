import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Booking from '@/models/Booking'

function generateTrackingCode(): string {
  const prefix = 'KN'
  const randomNum = Math.floor(100000 + Math.random() * 900000)
  return `${prefix}${randomNum}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { service, ...formData } = body

    // Validate required fields
    if (!service || !formData.senderName || !formData.receiverName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Connect to database
    await connectDB()

    // Generate unique tracking code
    let trackingCode = generateTrackingCode()
    let exists = await Booking.findOne({ trackingCode })
    
    // Ensure tracking code is unique
    while (exists) {
      trackingCode = generateTrackingCode()
      exists = await Booking.findOne({ trackingCode })
    }

    // Create booking document
    const booking = new Booking({
      trackingCode,
      service: {
        id: service.id,
        title: service.title,
        type: service.type,
        price: service.price,
      },
      senderName: formData.senderName,
      senderEmail: formData.senderEmail,
      senderPhone: formData.senderPhone,
      senderAddress: formData.senderAddress,
      receiverName: formData.receiverName,
      receiverEmail: formData.receiverEmail,
      receiverPhone: formData.receiverPhone,
      receiverAddress: formData.receiverAddress,
      weight: formData.weight,
      description: formData.description,
      pickupType: formData.pickupType || 'dropoff',
      status: 'pending',
    })

    // Save to database
    await booking.save()

    return NextResponse.json({
      success: true,
      trackingCode: booking.trackingCode,
      bookingId: booking._id.toString(),
      message: 'Booking submitted successfully',
    })
  } catch (error: any) {
    console.error('Booking error:', error)
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Tracking code already exists. Please try again.' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to process booking', details: error.message },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve bookings
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const searchParams = request.nextUrl.searchParams
    const trackingCode = searchParams.get('trackingCode')
    const awb = searchParams.get('awb')

    if (trackingCode) {
      const booking = await Booking.findOne({ trackingCode: trackingCode.toUpperCase() })
      if (!booking) {
        return NextResponse.json(
          { error: 'Booking not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({
        id: booking._id.toString(),
        trackingCode: booking.trackingCode,
        awb: booking.awb,
        service: booking.service,
        formData: {
          senderName: booking.senderName,
          senderEmail: booking.senderEmail,
          senderPhone: booking.senderPhone,
          senderAddress: booking.senderAddress,
          receiverName: booking.receiverName,
          receiverEmail: booking.receiverEmail,
          receiverPhone: booking.receiverPhone,
          receiverAddress: booking.receiverAddress,
          weight: booking.weight,
          description: booking.description,
          pickupType: booking.pickupType,
        },
        status: booking.status,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      })
    }

    if (awb) {
      const booking = await Booking.findOne({ awb: awb.toUpperCase() })
      if (!booking) {
        return NextResponse.json(
          { error: 'Booking with AWB not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({
        id: booking._id.toString(),
        trackingCode: booking.trackingCode,
        awb: booking.awb,
        service: booking.service,
        status: booking.status,
        createdAt: booking.createdAt,
      })
    }

    // Return all bookings (for admin - consider adding pagination and authentication)
    const bookings = await Booking.find({}).sort({ createdAt: -1 }).limit(100)
    return NextResponse.json(bookings.map(booking => ({
      id: booking._id.toString(),
      trackingCode: booking.trackingCode,
      awb: booking.awb,
      service: booking.service,
      status: booking.status,
      createdAt: booking.createdAt,
    })))
  } catch (error: any) {
    console.error('Get bookings error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings', details: error.message },
      { status: 500 }
    )
  }
}

