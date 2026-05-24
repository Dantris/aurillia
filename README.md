# Aurillia

Aurillia is a focused agency site for web development, selected mobile app work, and an AI project assistant.

## Core Routes

- `/` - brand landing hero
- `/home` - legacy landing URL with the same hero
- `/services/web` - primary web development offer
- `/services/mobile` - selected mobile app offer
- `/contact` - project inquiry form
- `/api/aurillia-assistant` - chatbot endpoint
- `/api/contact` - contact form email endpoint

## Development

```bash
npm run dev
npm run build
```

Environment values live in `.env.local`.

- `OPENAI_API_KEY` powers the chat assistant.
- `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` store leads and assistant usage.
- `CONTACT_TO` is the private inbox that receives contact form notifications, for example `info@aurillia.de`.
