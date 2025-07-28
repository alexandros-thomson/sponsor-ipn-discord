// services/ipnValidator.ts
// Confirms PayPal IPN payloads by posting back to PayPal’s validation endpoint.

interface IPNPayload {
  [key: string]: string;
}

/**
 * Posts the raw IPN payload back to PayPal for verification.
 * Returns true if PayPal responds with “VERIFIED”.
 */
export async function validateIPN(payload: IPNPayload): Promise<boolean> {
  const params = new URLSearchParams({ cmd: "_notify-validate", ...payload });
  const response = await fetch(
    "https://ipnpb.paypal.com/cgi-bin/webscr",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    },
  );

  const text = await response.text();
  return text.trim() === "VERIFIED";
}feat: add IPN payload validator service
