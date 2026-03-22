# PIP Preparation Tool

## Current State
A comprehensive PIP preparation web app with:
- Backend: Motoko actor with visit counter (recordVisit, getVisitCount)
- Frontend: React/TypeScript with 20+ pages, admin panel at /admin (password: 2024ForrealDanBowie)
- Admin panel manages: PayPal link, ads, news ticker, community tips, feedback viewer, visit counter
- Local browser storage for all user data (checklist, form answers, evidence list)
- Accessibility: high contrast mode, dyslexia font, text size controls
- Share buttons on home page and condition tips
- Back button on Evidence Helper page only

## Requested Changes (Diff)

### Add
- **General back button** on every page (browser history back navigation)
- **Admin: Most visited pages tracker** -- track which page routes users visit most, stored in backend
- **Admin: Feedback summary stats** -- count of submissions this week/month shown in admin
- **Admin: Edit condition tips from admin** -- add/edit/remove condition tips entries without rebuild
- **Admin: Pin urgent notice to top of every page** -- more prominent than ticker, full-width banner
- **Admin: Reply template library** -- admin-only saved response snippets for personal reference
- **Admin: Resource link manager** -- add/remove external resource links from admin panel
- **Admin: Activity log** -- record of when admin panel accessed and what changed
- **Admin: Change admin password from within panel** -- update password stored in localStorage
- **GoFundMe / Support Links section** -- visible to all users in footer or resources page; admin can add/remove external fundraising/support links

### Modify
- Header/navigation: add global back button (visible on all pages except home)
- Admin panel: add 8 new sections listed above
- Footer: add GoFundMe/support links section managed from admin
- Backend: add page visit tracking endpoint

### Remove
- Nothing removed

## Implementation Plan
1. Backend: add `recordPageVisit(page: Text)` and `getPageVisits()` to Motoko actor
2. Frontend - Global back button: add a back button in the Header or as a floating element on all non-home pages using browser history
3. Frontend - Admin panel additions:
   a. Most visited pages: read from backend, display sorted list
   b. Feedback summary stats: count localStorage feedback by date
   c. Edit condition tips: CRUD interface stored in localStorage
   d. Pinned urgent notice banner: toggle + text stored in localStorage, shown site-wide
   e. Reply template library: add/edit/delete snippets in localStorage
   f. Resource link manager: add/remove links in localStorage, shown on Resources page
   g. Activity log: append entries to localStorage on admin actions
   h. Change password: update stored password in localStorage
4. Frontend - GoFundMe links: admin adds links (title + URL) stored in localStorage; displayed in footer below donation section
