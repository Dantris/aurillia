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

- `NEXT_PUBLIC_LEGAL_NAME`, `NEXT_PUBLIC_LEGAL_ADDRESS`, and `NEXT_PUBLIC_LEGAL_PHONE` fill the Impressum and Datenschutz contact details.
- `NEXT_PUBLIC_LEGAL_FORM` defaults to `Einzelunternehmer`.
- `NEXT_PUBLIC_LEGAL_TAX_STATUS=kleinunternehmer` shows the § 19 UStG VAT notice. Change it to `regular` once VAT is charged under the general rules.
- `NEXT_PUBLIC_LEGAL_VAT_ID`, `NEXT_PUBLIC_LEGAL_BUSINESS_ID`, `NEXT_PUBLIC_LEGAL_REGISTER_COURT`, and `NEXT_PUBLIC_LEGAL_REGISTER_NUMBER` are optional public legal identifiers. Do not publish your private Steuernummer.
- `OPENAI_API_KEY` powers the chat assistant.
- `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` store leads and assistant usage.
- `CONTACT_TO` is the private inbox that receives contact form notifications, for example `info@aurillia.de`.
- `RESEND_API_KEY` enables contact form email forwarding.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` enable optional Cloudflare Turnstile spam protection.
