# Specification

## Summary
**Goal:** Add a donation section to the site-wide footer displaying a PayPal QR code with a friendly support message.

**Planned changes:**
- Crop the uploaded PayPal QR code image to the card area only (removing surrounding whitespace and light-blue background), keeping the PayPal label, and save as a static asset
- Add a donation section above the existing footer content in `Footer.tsx` displaying the cropped QR code image, the name "Danielle Boylan", a friendly message encouraging users to support the tool (e.g. "If this tool helped you, consider buying me a coffee ☕"), and a "Scan to donate via PayPal" label
- Style the donation section to be visually distinct but consistent with the app's design system, including high-contrast mode support

**User-visible outcome:** Every page of the app shows a donation section in the footer with Danielle's PayPal QR code, so users who found the tool helpful can easily scan and donate.
