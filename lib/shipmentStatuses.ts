// Standard shipment statuses
export const SHIPMENT_STATUSES = {
  RECEIVED: 'Shipment Received',
  PROCESSING: 'Shipment Processing',
  DEPARTED: 'Shipment Departed',
  ARRIVED: 'Shipment Arrived',
  DELIVERED: 'Shipment Delivered',
} as const

export type ShipmentStatus = typeof SHIPMENT_STATUSES[keyof typeof SHIPMENT_STATUSES]

// Status values that can be stored in database (with underscores)
export const SHIPMENT_STATUS_VALUES = {
  RECEIVED: 'SHIPMENT_RECEIVED',
  PROCESSING: 'SHIPMENT_PROCESSING',
  DEPARTED: 'SHIPMENT_DEPARTED',
  ARRIVED: 'SHIPMENT_ARRIVED',
  DELIVERED: 'SHIPMENT_DELIVERED',
} as const

// Map database status values to display names
export const STATUS_DISPLAY_MAP: Record<string, string> = {
  'SHIPMENT_RECEIVED': SHIPMENT_STATUSES.RECEIVED,
  'SHIPMENT_PROCESSING': SHIPMENT_STATUSES.PROCESSING,
  'SHIPMENT_DEPARTED': SHIPMENT_STATUSES.DEPARTED,
  'SHIPMENT_ARRIVED': SHIPMENT_STATUSES.ARRIVED,
  'SHIPMENT_DELIVERED': SHIPMENT_STATUSES.DELIVERED,
  // Handle variations
  'shipment_received': SHIPMENT_STATUSES.RECEIVED,
  'shipment_processing': SHIPMENT_STATUSES.PROCESSING,
  'shipment_departed': SHIPMENT_STATUSES.DEPARTED,
  'shipment_arrived': SHIPMENT_STATUSES.ARRIVED,
  'shipment_delivered': SHIPMENT_STATUSES.DELIVERED,
}

// Helper function to normalize status (for grouping/comparison)
export function normalizeStatus(status: string | undefined | null): string {
  if (!status) return 'UNKNOWN'
  
  const upperStatus = status.toUpperCase().trim()
  
  // Check if it's already a standard status value
  if (Object.values(SHIPMENT_STATUS_VALUES).includes(upperStatus as any)) {
    return upperStatus
  }
  
  // Check if it's in display format and convert to value
  if (upperStatus === 'SHIPMENT RECEIVED' || upperStatus === 'RECEIVED') {
    return SHIPMENT_STATUS_VALUES.RECEIVED
  }
  if (upperStatus === 'SHIPMENT PROCESSING' || upperStatus === 'PROCESSING') {
    return SHIPMENT_STATUS_VALUES.PROCESSING
  }
  if (upperStatus === 'SHIPMENT DEPARTED' || upperStatus === 'DEPARTED') {
    return SHIPMENT_STATUS_VALUES.DEPARTED
  }
  if (upperStatus === 'SHIPMENT ARRIVED' || upperStatus === 'ARRIVED') {
    return SHIPMENT_STATUS_VALUES.ARRIVED
  }
  if (upperStatus === 'SHIPMENT DELIVERED' || upperStatus === 'DELIVERED') {
    return SHIPMENT_STATUS_VALUES.DELIVERED
  }
  
  // Return as-is if not recognized
  return upperStatus
}

// Helper function to format status for display
export function formatStatusForDisplay(status: string | undefined | null): string {
  if (!status) return 'Unknown'
  
  // Check if it's already in display format
  if (Object.values(SHIPMENT_STATUSES).includes(status as ShipmentStatus)) {
    return status
  }
  
  // Normalize first, then get display name
  const normalized = normalizeStatus(status)
  if (STATUS_DISPLAY_MAP[normalized]) {
    return STATUS_DISPLAY_MAP[normalized]
  }
  
  // Fallback: format with title case
  return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l: string) => l.toUpperCase())
}

