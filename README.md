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
