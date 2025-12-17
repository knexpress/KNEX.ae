# KN Express Webpage

A modern, responsive website for KN Express delivery services built with Next.js and Node.js.

## Features

- **Landing Page**: Hero section with tracking functionality and service highlights
- **Service Booking**: Complete booking system for cargo shipments
- **Tracking System**: Real-time shipment tracking with status updates
- **Service Portfolio**: Showcase of all available shipping routes and services
- **Hub Locations**: Interactive map showing global hub locations
- **Customer Reviews**: Display of YouTube and Google reviews
- **Contact Integration**: WhatsApp and social media integration

## Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Icons**: Icon library
- **Node.js**: Backend API routes
- **MongoDB**: Database for bookings and tracking
- **Mongoose**: MongoDB object modeling

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- MongoDB database (local or MongoDB Atlas)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb://localhost:27017/knexpress
   ```
   Or for MongoDB Atlas:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/knexpress?retryWrites=true&w=majority
   ```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── book/          # Booking API endpoints
│   │   └── tracking/      # Tracking API endpoints
│   ├── book/              # Booking page
│   ├── tracking/          # Tracking page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section
│   ├── ServiceCards.tsx   # Service cards
│   ├── About.tsx          # About section
│   ├── Services.tsx       # Services showcase
│   ├── Hubs.tsx           # Hub locations
│   ├── ShippingSteps.tsx  # Shipping process steps
│   ├── Reviews.tsx        # Customer reviews
│   ├── Contact.tsx        # Contact section
│   └── Footer.tsx         # Footer
└── public/                # Static assets
```

## API Endpoints

### Booking API
- `POST /api/book` - Submit a new booking (saves to MongoDB)
- `GET /api/book?trackingCode=KN123456` - Retrieve booking by tracking code
- `GET /api/book?awb=AWB123456` - Retrieve booking by AWB

### Tracking API
- `GET /api/tracking?code=KN123456` - Get tracking information
  - First checks `invoicerequests` collection for AWB
  - If not found, checks `bookings` collection for AWB or tracking code

## Features in Detail

### Booking System
- Select from multiple shipping routes (Philippines-UAE, UAE-Philippines, Thailand-UAE, Sea Cargo)
- Complete sender and receiver information forms
- Automatic tracking code generation
- Pickup or drop-off options

### Tracking System
- Real-time status updates
- Location tracking
- Timestamp information
- Visual status indicators

## Customization

### Colors
Edit `tailwind.config.ts` to customize the color scheme:
- Primary green: `#2d5016`
- Accent yellow: `#fbbf24`

### Services
Update the services array in `components/Services.tsx` to add or modify shipping routes.

### Hub Locations
Modify hub information in `components/Hubs.tsx` and update Google Maps embed URLs.

## Production Deployment

1. Set up environment variables if needed
2. Configure database connection (replace mock data)
3. Set up email service for booking confirmations
4. Deploy to Vercel, Netlify, or your preferred hosting platform

## Database Schema

### Bookings Collection
- `trackingCode` (String, unique, indexed)
- `awb` (String, optional, indexed)
- `service` (Object)
- `senderName`, `senderEmail`, `senderPhone`, `senderAddress`
- `receiverName`, `receiverEmail`, `receiverPhone`, `receiverAddress`
- `weight`, `description`, `pickupType`
- `status` (String)
- `createdAt`, `updatedAt` (timestamps)

### InvoiceRequests Collection
- `awb` (String, required, indexed)
- `invoiceNumber` (String, optional)
- `bookingId` (String, optional)
- `trackingCode` (String, optional)
- `status` (String)
- `createdAt`, `updatedAt` (timestamps)

## Tracking Logic

The tracking API follows this flow:
1. Search for AWB in `invoicerequests` collection
2. If found, return invoice information and related booking (if exists)
3. If not found, search `bookings` collection by AWB or tracking code
4. Return booking information if found

## Notes

- MongoDB connection is cached for performance
- All tracking codes and AWBs are stored in uppercase
- Configure email service for booking confirmations
- Add authentication for admin access to view all bookings

## License

© 2025 All Rights Reserved by KN Express

