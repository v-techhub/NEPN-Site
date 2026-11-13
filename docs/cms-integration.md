# CMS Integration Notes

## Architecture

- `core/api/client.ts` centralizes CMS URL construction, headers, auth token attachment, and error handling.
- `core/api/services/*` contains resource-specific API functions.
- `core/api/query-keys.ts` keeps React Query keys stable and consistent.
- `core/hooks/queries/*` owns all server-state access for the UI.
- Presentation components consume hooks only and never call `fetch` directly.

## React Query Strategy

- `slider` data powers the homepage hero carousel.
- `posts` powers news listing and pagination.
- `partners` powers partner grids and partnership sections.
- `testimonial` powers testimonials.
- `faq` powers FAQ accordion content.
- `leadership` powers the about/Who We Are leadership cards.
- `what-we-do` powers the homepage "What We Do" business area cards.
- `company-data` powers the corporate overview tabs (History, Mission, Vision/Values) and story sections.
- `about` powers the `/about` (Who We Are) story section (badge, titles, paragraphs, and quick facts).
- `history` powers the `/about` "Our Journey / A History of Milestones" timeline cards.
- `values` powers the `/about` "Our Values" cards (Integrity, Excellence, Community Focus, Innovation).
- `capabilities` powers the `/operations` "Operational Capabilities" grid cards.
- `commitment` powers the `/sustainability` "Our Commitment" environmental stewardship section.
- `community-development` powers the `/sustainability` "Host Community Development" CSR header and copy.
- `contact-info` powers the footer and contact page contact details (phone, email, head office, working hours).
- `gallery` powers sustainability/CSR imagery.
- `contact-form` and `email-submission` are used by mutations for the contact form and newsletter subscription.

Cache policy:

- Mostly static CMS data uses a long `staleTime` and `gcTime`.
- Posts use a shorter `staleTime` so the news page can stay fresher.
- Query refetch on window focus is disabled to avoid duplicate fetches on content-heavy pages.

## API Layer Design

- `apiFetch` accepts a resource path plus optional query parameters and normalizes CMS responses into typed generics.
- Asset URLs are normalized through `getImageUrl`.
- Mutation endpoints remain isolated from the UI and can be reused by forms or future admin flows.

## Data Flow

1. A component calls a resource-specific hook.
2. The hook runs the relevant service function.
3. The service delegates to the shared client.
4. The component renders loading, error, empty, or hydrated content based on React Query state.

## Assumptions

- The CMS endpoints available to this project are:
  `slider`, `posts`, `partners`, `testimonial`, `faq`, `leadership`, `gallery`, `what-we-do`, `company-data`, `contact-form`, and `email-submission`.
- I treated the existing static homepage sections as design-led content where the CMS does not currently expose a matching resource.
- Network E&P branding, page structure, and image assets remain part of the site shell, while CMS data fills the content-heavy sections.
