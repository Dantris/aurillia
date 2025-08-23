// src/lib/secrets.ts
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const cache: Record<string, any> = {};
const sm = new SecretsManagerClient({ region: process.env.AWS_REGION || "us-east-1" });

export async function getContactConfig() {
    if (cache.contact) return cache.contact;

    // Prefer env (local/dev). In prod you can set CONTACT_SECRET_NAME instead.
    const name = process.env.CONTACT_TO && process.env.CONTACT_FROM ? null : process.env.CONTACT_SECRET_NAME;

    if (!name) {
        cache.contact = {
            to: process.env.CONTACT_TO!,
            from: process.env.CONTACT_FROM!,
        };
        return cache.contact;
    }

    const res = await sm.send(new GetSecretValueCommand({ SecretId: name }));
    const obj = res.SecretString ? JSON.parse(res.SecretString) : {};
    cache.contact = {
        to: process.env.CONTACT_TO || obj.CONTACT_TO,
        from: process.env.CONTACT_FROM || obj.CONTACT_FROM,
    };
    return cache.contact;
}
