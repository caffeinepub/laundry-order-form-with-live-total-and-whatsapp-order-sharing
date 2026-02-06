import { useState } from 'react';
import { Shirt, Package, Wind, Sparkles, Layers } from 'lucide-react';

export default function LaundryPriceCalculator() {
  const [shirtQty, setShirtQty] = useState(0);
  const [pantQty, setPantQty] = useState(0);
  const [sareeQty, setSareeQty] = useState(0);
  const [paithaniQty, setPaithaniQty] = useState(0);
  const [drillingQty, setDrillingQty] = useState(0);
  const [total, setTotal] = useState(0);

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
      </div>
    </div>
  );
}
