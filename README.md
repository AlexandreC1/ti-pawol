# Ti Pawòl

A mobile-first message box for friends, with Haitian Creole as the default language. Creators choose a language and prompt, receive a link to share, and get a separate private inbox link.

Each inbox link contains a secret: anyone with that link can read its messages. Keep it private and back it up; there is no account-based recovery. The optional activity section counts page visits and broad device types. Visits are not unique visitors.

## Stack

- Vercel Functions and a private Vercel Blob store
- Static HTML, CSS, and JavaScript

## Setup

1. Run `npm install`.
2. Create and connect a **private** Vercel Blob store to the project. This supplies `BLOB_READ_WRITE_TOKEN`.
3. Run `vercel dev` for local development or deploy with `vercel deploy`.

The legacy `/admin` endpoint uses `INBOX_PASSWORD`; the per-link inbox flow uses its own randomly generated secret and does not require that variable. No credentials or messages are stored in this repository.

The public page tells visitors that visits and device types are counted. The app does not save IP addresses. This small project does not currently include account recovery, abuse prevention, or automatic deletion.

## Developer dashboard and notifications

The password-protected developer dashboard is at `/developer`. Set `INBOX_PASSWORD` as a sensitive server-side environment variable. It shows aggregate object counts and links to Vercel's real runtime logs; it does not show message contents or IP addresses. The counts may include test records and are capped for large datasets.

Reply notifications are opt-in from each inbox. Configure `VAPID_PUBLIC_KEY` and `VAPID_PRIVATE_KEY` on the server; never commit the private key. Notifications contain no message text. Browser and device support varies; on iPhone, a Home Screen installation may be required.
