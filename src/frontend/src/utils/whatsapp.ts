/**
 * WhatsApp ordering utilities for composing messages and generating click-to-chat URLs
 */

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

/**
 * Compose a WhatsApp order message from selected items with customer details
 * @param items Array of order items with quantity > 0
 * @param total Grand total in INR
 * @param customerName Customer name
 * @param contactNumber Customer contact number
 * @param address Customer pickup/delivery address
 * @returns Formatted message string
 */
export function composeWhatsAppOrderMessage(
  items: OrderItem[], 
  total: number, 
  customerName?: string,
  contactNumber?: string, 
  address?: string
): string {
  if (items.length === 0) {
    return '';
  }

  let message = 'Hello! I would like to place a laundry order:\n\n';
  
  // Add customer details if provided
  if (customerName || contactNumber || address) {
    message += '📋 Customer Details:\n';
    if (customerName) {
      message += `Name: ${customerName}\n`;
    }
    if (contactNumber) {
      message += `Contact: ${contactNumber}\n`;
    }
    if (address) {
      message += `Address: ${address}\n`;
    }
    message += '\n';
  }
  
  message += '🧺 Order Items:\n';
  items.forEach((item) => {
    const lineTotal = item.quantity * item.price;
    message += `${item.name} × ${item.quantity} = ₹${lineTotal}\n`;
  });
  
  message += `\n💰 Grand Total: ₹${total}`;
  
  return message;
}

/**
 * Generate WhatsApp click-to-chat URL with prefilled message
 * @param phoneNumber WhatsApp phone number (e.g., +917248903366)
 * @param message Message to prefill
 * @returns WhatsApp wa.me URL
 */
export function generateWhatsAppURL(phoneNumber: string, message: string): string {
  // Remove any non-digit characters from phone number except leading +
  const cleanPhone = phoneNumber.replace(/[^\d+]/g, '');
  
  // URL encode the message
  const encodedMessage = encodeURIComponent(message);
  
  // Generate wa.me URL
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

/**
 * Open WhatsApp with order details
 * @param items Array of order items with quantity > 0
 * @param total Grand total in INR
 * @param phoneNumber WhatsApp phone number
 * @param customerName Customer name (optional)
 * @param contactNumber Customer contact number (optional)
 * @param address Customer pickup/delivery address (optional)
 */
export function openWhatsAppOrder(
  items: OrderItem[], 
  total: number, 
  phoneNumber: string,
  customerName?: string,
  contactNumber?: string,
  address?: string
): void {
  const message = composeWhatsAppOrderMessage(items, total, customerName, contactNumber, address);
  const url = generateWhatsAppURL(phoneNumber, message);
  window.open(url, '_blank');
}
