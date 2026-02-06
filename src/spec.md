# Specification

## Summary
**Goal:** Add a Customer Name field to the Laundry order flow and include it in the generated WhatsApp order message.

**Planned changes:**
- Add a new “Customer Name” input to the Order Summary panel alongside the existing contact number and pickup/delivery address fields, storing the value in React component state.
- Add client-side validation for Customer Name (non-empty/non-whitespace) and block “Order on WhatsApp” until Customer Name, contact number, and address are all valid, showing an inline English error message when Customer Name is invalid.
- Update the prefilled WhatsApp message to include a “Name:” line in the customer details section, while keeping the WhatsApp destination number as +917248903366.

**User-visible outcome:** Users can enter a customer name during checkout; they can’t open WhatsApp to place an order until name, contact number, and address are filled, and the WhatsApp message includes the customer’s name along with the existing order details.
