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
}import { Embed } from "./types"; // Or your preferred structure
import { WebhookClient } from "discord.js"; // Adjust for your bot framework

const LOG_WEBHOOK_URL = process.env.LOG_WEBHOOK_URL!; // From env for security

export async function sendToLogChannel(embed: Embed) {
  try {
    const webhook = new WebhookClient({ url: LOG_WEBHOOK_URL });
    await webhook.send({ embeds: [embed] });
  } catch (err) {
    console.error("Failed to dispatch artifact log:", err);
  }
}
