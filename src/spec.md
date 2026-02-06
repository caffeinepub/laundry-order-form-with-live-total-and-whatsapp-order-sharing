# Specification

## Summary
**Goal:** Add a simple Laundry Price Calculator UI to compute a laundry bill total in INR based on five item types and per-item pricing.

**Planned changes:**
- Create a “Laundry Price Calculator” section with 5 quantity number inputs (default 0): Shirt, Pant, Saree, Paithani Saree, Drilling Saree.
- Add a “Total Calculate” button that computes and displays the total as `Total: ₹<number>`, starting at `Total: ₹0` on load.
- Implement basic input validation so quantities are non-negative and empty/invalid inputs are treated as 0, ensuring totals never show NaN or negative values.
- Ensure all calculator-related user-facing text is English-only.

**User-visible outcome:** Users can enter quantities for the five laundry items, click “Total Calculate,” and see the total bill displayed in INR, with invalid/negative inputs safely handled.
