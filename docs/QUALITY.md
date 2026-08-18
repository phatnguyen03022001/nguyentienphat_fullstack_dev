# Portfolio Quality Standard

This repository is treated as a professional public portfolio, not only as a UI demo.

## Release gate

A change is ready for production only when:

- the project builds successfully;
- no critical security issue is introduced;
- keyboard navigation remains usable;
- important interactive elements have visible focus;
- reduced-motion users are supported;
- layouts work at mobile, tablet and desktop widths;
- important links and assets work;
- page metadata stays correct;
- production deployment returns HTTP 200;
- the content remains truthful, clear and easy to understand.

## Review order

1. Repository and security
2. Architecture and content model
3. Positioning and copy
4. Design system
5. UX and accessibility
6. Responsive behavior
7. Performance and SEO
8. Production verification
9. Final red-team review

## Severity

### P0 — Release blocker

Build failure, broken production, security issue, critical accessibility failure, missing critical content, or wrong personal information.

### P1 — Major issue

Important mobile, UX, content, performance or SEO problem that weakens the professional experience.

### P2 — Polish

Visual consistency, spacing, micro-interactions and other non-blocking improvements.

## Content rule

Never invent experience, users, metrics or results. When a measurable result is not available, explain the scope and the work completed instead.

## Design rule

Motion should help orientation or feedback. It should not distract from the content.
