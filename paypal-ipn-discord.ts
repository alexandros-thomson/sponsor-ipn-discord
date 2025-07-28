// paypal-ipn-discord.ts
import { validateIPN } from "./services/ipnValidator.ts";
import { assignRole } from "./services/roleAssigner.ts";
import { logArtifact } from "./services/artifactLogger.ts";

interface IPNPayload {
  txn_id: string;
  payer_email: string;
  custom: string; // could contain Discord ID
  payment_status: string;
  mc_gross: string;
}

async function handleIPN(payload: IPNPayload) {
  const isValid = await validateIPN(payload);
  if (!isValid) {
    console.warn("Invalid IPN payload", payload);
    return;
  }

  const discordId = payload.custom;
  const tier = determineSponsorTier(payload.mc_gross);

  await assignRole(discordId, tier);
  await logArtifact(discordId, tier, payload.txn_id);

  console.log(`Sponsor role "${tier}" assigned to ${discordId}`);
}

function determineSponsorTier(amount: string): string {
  const value = parseFloat(amount);
  if (value >= 50) return "Archon";
  if (value >= 20) return "Mythkeeper";
  return "Initiate";
}

// Example usage: triggered by IPN webhook
// handleIPN(receivedPayload);

export { handleIPN };
