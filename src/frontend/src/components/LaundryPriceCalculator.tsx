import { useState } from 'react';
import { Shirt, Package, Wind, Sparkles, Layers, ShoppingBag, X, MessageCircle } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { openWhatsAppOrder } from '../utils/whatsapp';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

const WHATSAPP_NUMBER = '+917248903366';

export default function LaundryPriceCalculator() {
  const [shirtQty, setShirtQty] = useState(0);
  const [pantQty, setPantQty] = useState(0);
  const [sareeQty, setSareeQty] = useState(0);
  const [paithaniQty, setPaithaniQty] = useState(0);
  const [drillingQty, setDrillingQty] = useState(0);
  const [total, setTotal] = useState(0);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  
  // Customer contact details
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [customerNameError, setCustomerNameError] = useState('');
  const [contactError, setContactError] = useState('');
  const [addressError, setAddressError] = useState('');

  // Handle quantity input changes (prevent negative values and treat empty as 0)
  const handleQuantityChange = (value: string, setter: (val: number) => void) => {
    const numValue = parseInt(value);
    if (isNaN(numValue) || numValue < 0) {
      setter(0);
    } else {
      setter(numValue);
    }
  };

  // Calculate total when button is clicked
  const calculateBill = () => {
    const calculatedTotal = 
      (shirtQty * 10) + 
      (pantQty * 10) + 
      (sareeQty * 50) + 
      (paithaniQty * 100) + 
      (drillingQty * 150);
    setTotal(calculatedTotal);
  };

  // Handle order button click
  const handleOrder = () => {
    setShowOrderSummary(true);
  };

  // Get order items with quantity > 0
  const getOrderItems = (): OrderItem[] => {
    const items: OrderItem[] = [];
    if (shirtQty > 0) items.push({ name: 'Shirt', quantity: shirtQty, price: 10 });
    if (pantQty > 0) items.push({ name: 'Pant', quantity: pantQty, price: 10 });
    if (sareeQty > 0) items.push({ name: 'Saree', quantity: sareeQty, price: 50 });
    if (paithaniQty > 0) items.push({ name: 'Paithani Saree', quantity: paithaniQty, price: 100 });
    if (drillingQty > 0) items.push({ name: 'Drilling Saree', quantity: drillingQty, price: 150 });
    return items;
  };

  // Validate customer name
  const validateCustomerName = (value: string): boolean => {
    setCustomerNameError('');
    
    if (!value || value.trim() === '') {
      setCustomerNameError('Customer name is required');
      return false;
    }
    
    return true;
  };

  // Validate contact number
  const validateContactNumber = (value: string): boolean => {
    setContactError('');
    
    if (!value || value.trim() === '') {
      setContactError('Contact number is required');
      return false;
    }
    
    // Allow digits, spaces, +, -, parentheses
    const allowedCharsRegex = /^[\d\s+\-()]+$/;
    if (!allowedCharsRegex.test(value)) {
      setContactError('Contact number can only contain digits, spaces, +, -, and parentheses');
      return false;
    }
    
    // Count digits only
    const digitCount = value.replace(/\D/g, '').length;
    if (digitCount < 10) {
      setContactError('Contact number must contain at least 10 digits');
      return false;
    }
    
    return true;
  };

  // Validate address
  const validateAddress = (value: string): boolean => {
    setAddressError('');
    
    if (!value || value.trim() === '') {
      setAddressError('Pickup/Delivery address is required');
      return false;
    }
    
    return true;
  };

  // Handle WhatsApp order with validation
  const handleWhatsAppOrder = () => {
    const isNameValid = validateCustomerName(customerName);
    const isContactValid = validateContactNumber(contactNumber);
    const isAddressValid = validateAddress(address);
    
    if (!isNameValid || !isContactValid || !isAddressValid) {
      return;
    }
    
    const items = getOrderItems();
    openWhatsAppOrder(items, total, WHATSAPP_NUMBER, customerName, contactNumber, address);
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-amber-100 dark:border-neutral-700 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-neutral-700 dark:to-neutral-600 border-b border-amber-200 dark:border-neutral-600">
        <h2 className="text-xl font-semibold text-amber-900 dark:text-amber-100 mb-1">Laundry Price Calculator</h2>
        <p className="text-sm text-amber-700 dark:text-amber-300">Enter quantities to calculate total</p>
      </div>

      <div className="p-6 space-y-4">
        {/* Shirt */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-amber-50 dark:bg-neutral-700/50 border border-amber-200 dark:border-neutral-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-200 dark:bg-amber-900/50 flex items-center justify-center">
              <Shirt className="w-5 h-5 text-amber-700 dark:text-amber-300" />
            </div>
            <div>
              <p className="font-medium text-neutral-900 dark:text-neutral-100">Shirt</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">₹10 each</p>
            </div>
          </div>
          <input
            id="shirt"
            type="number"
            min="0"
            value={shirtQty || ''}
            onChange={(e) => handleQuantityChange(e.target.value, setShirtQty)}
            className="w-20 px-3 py-2 text-center rounded-lg border border-amber-300 dark:border-neutral-500 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 font-semibold"
            placeholder="0"
          />
        </div>

        {/* Pant */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-amber-50 dark:bg-neutral-700/50 border border-amber-200 dark:border-neutral-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-200 dark:bg-amber-900/50 flex items-center justify-center">
              <Package className="w-5 h-5 text-amber-700 dark:text-amber-300" />
            </div>
            <div>
              <p className="font-medium text-neutral-900 dark:text-neutral-100">Pant</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">₹10 each</p>
            </div>
          </div>
          <input
            id="pant"
            type="number"
            min="0"
            value={pantQty || ''}
            onChange={(e) => handleQuantityChange(e.target.value, setPantQty)}
            className="w-20 px-3 py-2 text-center rounded-lg border border-amber-300 dark:border-neutral-500 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 font-semibold"
            placeholder="0"
          />
        </div>

        {/* Saree */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-amber-50 dark:bg-neutral-700/50 border border-amber-200 dark:border-neutral-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-200 dark:bg-amber-900/50 flex items-center justify-center">
              <Wind className="w-5 h-5 text-amber-700 dark:text-amber-300" />
            </div>
            <div>
              <p className="font-medium text-neutral-900 dark:text-neutral-100">Saree</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">₹50 each</p>
            </div>
          </div>
          <input
            id="saree"
            type="number"
            min="0"
            value={sareeQty || ''}
            onChange={(e) => handleQuantityChange(e.target.value, setSareeQty)}
            className="w-20 px-3 py-2 text-center rounded-lg border border-amber-300 dark:border-neutral-500 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 font-semibold"
            placeholder="0"
          />
        </div>

        {/* Paithani Saree */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-amber-50 dark:bg-neutral-700/50 border border-amber-200 dark:border-neutral-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-200 dark:bg-amber-900/50 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-700 dark:text-amber-300" />
            </div>
            <div>
              <p className="font-medium text-neutral-900 dark:text-neutral-100">Paithani Saree</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">₹100 each</p>
            </div>
          </div>
          <input
            id="paithani"
            type="number"
            min="0"
            value={paithaniQty || ''}
            onChange={(e) => handleQuantityChange(e.target.value, setPaithaniQty)}
            className="w-20 px-3 py-2 text-center rounded-lg border border-amber-300 dark:border-neutral-500 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 font-semibold"
            placeholder="0"
          />
        </div>

        {/* Drilling Saree */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-amber-50 dark:bg-neutral-700/50 border border-amber-200 dark:border-neutral-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-200 dark:bg-amber-900/50 flex items-center justify-center">
              <Layers className="w-5 h-5 text-amber-700 dark:text-amber-300" />
            </div>
            <div>
              <p className="font-medium text-neutral-900 dark:text-neutral-100">Drilling Saree</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">₹150 each</p>
            </div>
          </div>
          <input
            id="drilling"
            type="number"
            min="0"
            value={drillingQty || ''}
            onChange={(e) => handleQuantityChange(e.target.value, setDrillingQty)}
            className="w-20 px-3 py-2 text-center rounded-lg border border-amber-300 dark:border-neutral-500 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 font-semibold"
            placeholder="0"
          />
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateBill}
          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 dark:from-amber-500 dark:to-orange-500 dark:hover:from-amber-600 dark:hover:to-orange-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98]"
        >
          Total Calculate
        </button>

        {/* Total Display */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-amber-100 to-orange-100 dark:from-neutral-700 dark:to-neutral-600 border border-amber-200 dark:border-neutral-600">
          <h3 id="total" className="text-2xl font-bold text-amber-900 dark:text-amber-100 text-center">
            Total: ₹{total}
          </h3>
        </div>

        {/* WhatsApp Contact Section */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700">
          <div className="flex items-center justify-center gap-2 text-green-800 dark:text-green-200">
            <SiWhatsapp className="w-5 h-5" />
            <span className="font-medium">WhatsApp Contact:</span>
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER.replace(/[^\d+]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              {WHATSAPP_NUMBER}
            </a>
          </div>
        </div>

        {/* Order Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleOrder}
            disabled={total === 0}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-neutral-400 disabled:to-neutral-500 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] disabled:active:scale-100 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            Order
          </button>

          <button
            onClick={handleWhatsAppOrder}
            disabled={total === 0}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-neutral-400 disabled:to-neutral-500 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] disabled:active:scale-100 flex items-center justify-center gap-2"
          >
            <SiWhatsapp className="w-5 h-5" />
            Order on WhatsApp
          </button>
        </div>

        {/* Order Summary Panel */}
        {showOrderSummary && (
          <div className="p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-neutral-700 dark:to-neutral-600 border-2 border-green-200 dark:border-green-700 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-green-900 dark:text-green-100 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Order Summary
              </h3>
              <button
                onClick={() => setShowOrderSummary(false)}
                className="p-1 rounded-full hover:bg-green-200 dark:hover:bg-neutral-600 transition-colors"
                aria-label="Close order summary"
              >
                <X className="w-5 h-5 text-green-700 dark:text-green-300" />
              </button>
            </div>

            {/* Customer Contact Details */}
            <div className="space-y-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="customer-name" className="text-green-900 dark:text-green-100 font-medium">
                  Customer Name
                </Label>
                <Input
                  id="customer-name"
                  type="text"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    setCustomerNameError('');
                  }}
                  placeholder="Enter your name"
                  className={`bg-white dark:bg-neutral-800 border-green-300 dark:border-neutral-500 focus:ring-green-500 dark:focus:ring-green-400 ${
                    customerNameError ? 'border-red-500 dark:border-red-500' : ''
                  }`}
                />
                {customerNameError && (
                  <p className="text-sm text-red-600 dark:text-red-400">{customerNameError}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-number" className="text-green-900 dark:text-green-100 font-medium">
                  Your Contact Number
                </Label>
                <Input
                  id="contact-number"
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => {
                    setContactNumber(e.target.value);
                    setContactError('');
                  }}
                  placeholder="e.g., +91 1234567890"
                  className={`bg-white dark:bg-neutral-800 border-green-300 dark:border-neutral-500 focus:ring-green-500 dark:focus:ring-green-400 ${
                    contactError ? 'border-red-500 dark:border-red-500' : ''
                  }`}
                />
                {contactError && (
                  <p className="text-sm text-red-600 dark:text-red-400">{contactError}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-green-900 dark:text-green-100 font-medium">
                  Pickup/Delivery Address
                </Label>
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setAddressError('');
                  }}
                  placeholder="Enter your complete address"
                  rows={3}
                  className={`bg-white dark:bg-neutral-800 border-green-300 dark:border-neutral-500 focus:ring-green-500 dark:focus:ring-green-400 resize-none ${
                    addressError ? 'border-red-500 dark:border-red-500' : ''
                  }`}
                />
                {addressError && (
                  <p className="text-sm text-red-600 dark:text-red-400">{addressError}</p>
                )}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {getOrderItems().map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-neutral-800 border border-green-200 dark:border-neutral-600"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                      {item.name}
                    </span>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      × {item.quantity}
                    </span>
                  </div>
                  <span className="font-semibold text-green-700 dark:text-green-300">
                    ₹{item.quantity * item.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t-2 border-green-300 dark:border-green-700">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-green-900 dark:text-green-100">
                  Total Amount:
                </span>
                <span className="text-2xl font-bold text-green-700 dark:text-green-300">
                  ₹{total}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
