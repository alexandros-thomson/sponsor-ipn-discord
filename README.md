# 🛠️ Kypria Sponsor Pipeline
// sponsor-handler.js — Shrine Echo Listener 🕯️
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const { spawn } = require('child_process');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/paypal-ipn', async (req, res) => {
  const payload = req.body;

  try {
    // Step 1: Validate IPN with PayPal 🔒
    const verifyRes = await axios.post(
      'https://ipnpb.paypal.com/cgi-bin/webscr',
      new URLSearchParams({ cmd: '_notify-validate', ...payload })
    );

    if (verifyRes.data !== 'VERIFIED') {
      return res.status(403).send('IPN not verified.');
    }

    // Step 2: Log sponsor to scroll 📜
    const logEntry = `🕯️ Sponsor Pledge Received:
- TXN_ID: ${payload.txn_id}
- Archetype: ${payload.custom}
- Amount: $${payload.mc_gross}
- Email: ${payload.payer_email}
- Timestamp: ${new Date().toISOString()}\n\n`;

    fs.appendFileSync('sponsor-scroll.md', logEntry);

    // Step 3: Trigger Discord shrine echo 🎇
    spawn('node', ['discord-ping.js', payload.custom, payload.txn_id]);

    res.send('Sponsor logged and shrine awakened.');
  } catch (err) {
    console.error('🔴 Error handling IPN:', err);
    res.status(500).send('Shrine glitch detected.');
  }
});

module.exports = router;
A mythic automation engine that grants Discord roles, drops digital artifacts, and inscribes each sponsor’s pledge into the eternal ledger—all powered by PayPal and Deno.

---

## 🚀 Ritual Flow

1. **Sponsor Pledge** → via PayPal
2. **IPN Handler** → verifies pledge
3. **Discord Role Grant** → instant tier assignment
4. **Artifact Drop** → embed sent to private channel
5. **Ledger Inscription** → pledge added to `vault/sponsor-ledger.json`
6. **Logbook Broadcast** → webhook logs the tribute

---

## 🔧 Technologies

| Stack       | Purpose                              |
|------------|---------------------------------------|
| TypeScript | Canon backbone of all services        |
| Deno       | Runtime for IPN, role, and logging    |
| Discord.js | Role assignment and webhook dispatch  |
| PayPal IPN | Sponsor verification ritual           |

---

## 🧪 CI Status

![Deno Tests](https://github.com/alexan.../actions/workflows/deno.yml/badge.svg)  
> _Each test validates the mythic heartbeat. Errors = fissures in canon._

---

## 📛 Sponsor Tiers

| Tier Name    | Role Power       | Artifact Access |
|--------------|------------------|------------------|
| Novice       | Read-only lore   | Basic vault drop |
| Champion     | Role + Embed     | Extended drop    |
| Archon       | Role + Embed + Vault Inscription | Mythic vault tier |

---

## 🔁 Developer Rituals

```bash
deno run --allow-net --allow-env src/ipnHandler.ts      # Start the pledge daemon
deno test --allow-read --allow-env                      # Validate the scribe + log echo
