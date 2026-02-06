import { useState } from 'react';
import { useActor } from './useActor';

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function useCustomDomainValidation() {
  const { actor } = useActor();
  const [isValidating, setIsValidating] = useState(false);

  // Client-side validation
  const validateDomainLocally = (domain: string): ValidationResult => {
    // Check for empty domain
    if (!domain.trim()) {
      return { isValid: false, error: 'Domain name cannot be empty.' };
    }

    // Check length (5-50 characters)
    if (domain.length < 5) {
      return { 
        isValid: false, 
        error: `Domain must be at least 5 characters. Your current domain has ${domain.length} character${domain.length === 1 ? '' : 's'}.` 
      };
    }
    if (domain.length > 50) {
      return { 
        isValid: false, 
        error: `Domain must be at most 50 characters. Your current domain has ${domain.length} characters.` 
      };
    }

    // Check for spaces
    if (domain.includes(' ')) {
      return { 
        isValid: false, 
        error: 'Domain can only contain letters, numbers, and hyphens. Please remove spaces and special characters.' 
      };
    }

    // Check for trailing hyphen
    if (domain.endsWith('-')) {
      return { 
        isValid: false, 
        error: 'Domain cannot end with a hyphen.' 
      };
    }

    // Check for valid characters (letters, numbers, hyphens only)
    const validPattern = /^[a-zA-Z0-9-]+$/;
    if (!validPattern.test(domain)) {
      return { 
        isValid: false, 
        error: 'Domain can only contain letters, numbers, and hyphens. Please remove spaces and special characters.' 
      };
    }

    return { isValid: true };
  };

  // Backend validation (optional, for publish-time validation)
  const validateDomainWithBackend = async (domain: string): Promise<ValidationResult> => {
    if (!actor) {
      return { isValid: false, error: 'Backend connection not available.' };
    }

    // First run local validation
    const localResult = validateDomainLocally(domain);
    if (!localResult.isValid) {
      return localResult;
    }

    // Then run backend validation
    setIsValidating(true);
    try {
      await actor.validateCustomDomain(domain);
      return { isValid: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Domain validation failed.';
      return { isValid: false, error: errorMessage };
    } finally {
      setIsValidating(false);
    }
  };

  return {
    validateDomainLocally,
    validateDomainWithBackend,
    isValidating,
  };
}
