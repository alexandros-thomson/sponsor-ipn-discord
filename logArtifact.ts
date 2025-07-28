import { IPNPayload } from "./types"; // Adjust import as needed

export async function logArtifact(discordId: string, tier: string, payload: IPNPayload) {
  try {
    const embed = {
      title: `🎁 New Artifact Logged`,
      description: `Sponsor: <@${discordId}>\nTier: **${tier}**\nAmount: $${payload.mc_gross}`,
      fields: [
        { name: "Transaction ID", value: payload.txn_id, inline: true },
        { name: "Email", value: payload.payer_email || "N/A", inline: true },
      ],
      timestamp: new Date().toISOString(),
    };

    await sendToLogChannel(embed); // You’d define this to post to Discord
    console.log(`Logged artifact for ${discordId} at tier ${tier}`);
  } catch (err) {
    console.error("Error logging artifact:", err);
  }
}
