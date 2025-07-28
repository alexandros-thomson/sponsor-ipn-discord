import { Embed } from "./types";
import { WebhookClient } from "discord.js";

const LOG_WEBHOOK_URL = Deno.env.get("LOG_WEBHOOK_URL")!;

export async function sendToLogChannel(embed: Embed) {
  try {
    const webhook = new WebhookClient({ url: LOG_WEBHOOK_URL });
    await webhook.send({ embeds: [embed] });
  } catch (err) {
    console.error("Failed to dispatch artifact log:", err);
  }
}
