import { IPNPayload } from "./types";
import { writeFileSync, readFileSync } from "fs";
import path from "path";

const ledgerPath = path.resolve("vault", "sponsor-ledger.json");

export async function appendToLedger(discordId: string, tier: string, payload: IPNPayload) {
  try {
    const entry = {
      discordId,
      tier,
      amount: payload.mc_gross,
      txn_id: payload.txn_id,
      email: payload.payer_email,
      timestamp: new Date().toISOString(),
    };

    const existing = JSON.parse(readFileSync(ledgerPath, "utf-8"));
    existing.push(entry);
    writeFileSync(ledgerPath, JSON.stringify(existing, null, 2));
    console.log(`📖 Ledger updated for ${discordId}`);
  } catch (err) {
    console.error("📛 Ledger update failed:", err);
  }
}
import { IPNPayload } from "./types.ts";
import { writeFileSync, readFileSync } from "fs";
import path from "path";

const ledgerPath = path.resolve("vault", "sponsor-ledger.json");

export async function appendToLedger(
  discordId: string,
  tier: string,
  payload: IPNPayload,
) {
  try {
    const entry = {
      discordId,
      tier,
      amount: payload.mc_gross,
      txn_id: payload.txn_id,
      email: payload.payer_email,
      timestamp: new Date().toISOString(),
    };

    const existing = JSON.parse(readFileSync(ledgerPath, "utf-8"));
    existing.push(entry);
    writeFileSync(ledgerPath, JSON.stringify(existing, null, 2));
    console.log(`📖 Ledger updated for ${discordId}`);
  } catch (err) {
    console.error("📛 Ledger update failed:", err);
  }
}
const express = require('express')
const bodyParser = require('body-parser')
const { handleSponsorshipCreated } = require('./webhooks/sponsor-handler')
const app = express()

app.use(bodyParser.json())

app.post('/github-webhook', async (req, res) => {
  const event = req.headers['x-github-event']
  if (event === 'sponsorship' && req.body.action === 'created') {
    await handleSponsorshipCreated(req.body.sponsorship)
  }
  res.sendStatus(200)
})

app.listen(process.env.PORT || 3000)
