import { useState } from 'react';
import { Globe, CheckCircle2 } from 'lucide-react';
import { useCustomDomainValidation } from './hooks/useCustomDomainValidation';
import LaundryPriceCalculator from './components/LaundryPriceCalculator';

export default function App() {
  // Custom domain state
  const [customDomain, setCustomDomain] = useState('');
  const [domainError, setDomainError] = useState<string | undefined>();
  const [domainSuccess, setDomainSuccess] = useState(false);

  const { validateDomainLocally, validateDomainWithBackend, isValidating } = useCustomDomainValidation();

  // Handle domain validation
  const handleValidateDomain = async () => {
    setDomainError(undefined);
    setDomainSuccess(false);

    // Run local validation first
    const localResult = validateDomainLocally(customDomain);
    if (!localResult.isValid) {
      setDomainError(localResult.error);
      return;
    }

    // Run backend validation
    const backendResult = await validateDomainWithBackend(customDomain);
    if (!backendResult.isValid) {
      setDomainError(backendResult.error);
    } else {
      setDomainSuccess(true);
    }
  };

  // Clear domain error when user types
  const handleDomainChange = (value: string) => {
    setCustomDomain(value);
    setDomainError(undefined);
    setDomainSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-b border-amber-200 dark:border-neutral-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <img 
            src="/assets/generated/laundry-mark.dim_256x256.png" 
            alt="STAYM Laundry" 
            className="w-12 h-12 rounded-lg shadow-sm"
          />
          <div>
            <h1 className="text-2xl font-bold text-amber-900 dark:text-amber-100">STAYM Laundry</h1>
            <p className="text-sm text-amber-700 dark:text-amber-300">Price Calculator</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Laundry Price Calculator */}
        <LaundryPriceCalculator />

        {/* Custom Domain Configuration Section */}
        <div className="mt-8 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-amber-100 dark:border-neutral-700 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-neutral-700 dark:to-neutral-600 border-b border-amber-200 dark:border-neutral-600">
            <h2 className="text-xl font-semibold text-amber-900 dark:text-amber-100 mb-1">Publish Configuration</h2>
            <p className="text-sm text-amber-700 dark:text-amber-300">Configure your custom domain</p>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="customDomain" className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                <Globe className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Custom Domain
              </label>
              <input
                id="customDomain"
                type="text"
                value={customDomain}
                onChange={(e) => handleDomainChange(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-amber-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 transition-all"
                placeholder="Enter domain (e.g., staym-laundry)"
              />
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                Domain must be 5-50 characters, contain only letters, numbers, and hyphens, and cannot end with a hyphen.
              </p>
              {domainError && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{domainError}</p>
              )}
              {domainSuccess && (
                <div className="mt-2 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Domain is valid and ready to publish!</span>
                </div>
              )}
            </div>

            <button
              onClick={handleValidateDomain}
              disabled={!customDomain.trim() || isValidating}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 dark:from-amber-500 dark:to-orange-500 dark:hover:from-amber-600 dark:hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {isValidating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Validating...
                </>
              ) : (
                <>
                  <Globe className="w-5 h-5" />
                  Validate Domain
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
          <p>© 2026. Built with ❤️ using <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 hover:underline">caffeine.ai</a></p>
        </footer>
      </main>
    </div>
  );
}
