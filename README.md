# ⚡ Sponsor IPN Discord — Shrine Echo Listener

![Shrine Crest](https://raw.githubusercontent.com/alexandros-thomson/alexandros-thomson/main/public/crest.svg)

**— ϟ — Where PayPal pledges forge Discord legends — ϟ —**

[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-Become%20a%20Legend-d4af37?style=flat-square&logo=github)](https://github.com/sponsors/alexandros-thomson)
[![License](https://img.shields.io/badge/License-MIT-d4af37?style=flat-square)](LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/alexandros-thomson/sponsor-ipn-discord/deno.yml?style=flat-square&label=Tests&color=d4af37)](https://github.com/alexandros-thomson/sponsor-ipn-discord/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-d4af37?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Discord](https://img.shields.io/badge/Discord-Shrine%20Ready-d4af37?style=flat-square&logo=discord)](https://discord.gg/your-server)

---

## 🏛️ Welcome to the Shrine Echo Listener

This is not just a webhook handler—it's a **mythic automation engine** that transforms PayPal sponsorships into living legends. When a pledge arrives, this service:

- 🔒 **Verifies** the IPN with PayPal's sacred seal
- 🎖️ **Grants** Discord roles instantly based on tier
- 📜 **Inscribes** the pledge into the eternal artifact ledger
- ⚡ **Manifests** legendary embeds in shrine channels
- 🕯️ **Broadcasts** the tribute across the Basilica

Every contribution becomes canon. Every sponsor becomes myth.

---

## 🚀 Ritual Flow

```mermaid
graph LR
    A[Sponsor Pledge via PayPal] --> B[IPN Verification]
    B --> C[Discord Role Grant]
    C --> D[Artifact Drop]
    D --> E[Ledger Inscription]
    E --> F[Logbook Broadcast]
    F --> G[Legend Forged]
```

1. **Sponsor Pledge** → via PayPal donation
2. **IPN Handler** → verifies pledge authenticity
3. **Discord Role Grant** → instant tier assignment
4. **Artifact Drop** → legendary embed sent to private channel
5. **Ledger Inscription** → pledge added to `vault/sponsor-ledger.json`
6. **Logbook Broadcast** → webhook logs the tribute for posterity

---

## 🔧 Technologies — The Sacred Stack

| Stack       | Purpose                               |
|------------|---------------------------------------|
| TypeScript | Canon backbone of all services        |
| Deno       | Runtime for IPN, role, and logging    |
| Discord.js | Role assignment and webhook dispatch  |
| PayPal IPN | Sponsor verification ritual           |
| Node.js    | Express server for webhook handling   |

---

## 📊 Golden Badges — Shrine Status

[![Contributions (Last Year)](https://img.shields.io/badge/Contributions%20(Last%20Year)-756-d4af37?style=flat-square)](https://github.com/alexandros-thomson)
[![Active Repositories](https://img.shields.io/badge/Active%20Repositories-11-d4af37?style=flat-square)](https://github.com/alexandros-thomson?tab=repositories)
[![Stars](https://img.shields.io/github/stars/alexandros-thomson/sponsor-ipn-discord?style=flat-square&color=d4af37)](https://github.com/alexandros-thomson/sponsor-ipn-discord/stargazers)
[![Forks](https://img.shields.io/github/forks/alexandros-thomson/sponsor-ipn-discord?style=flat-square&color=d4af37)](https://github.com/alexandros-thomson/sponsor-ipn-discord/network/members)

---

## 📛 Sponsor Tiers — Paths to Legend

| Tier Name          | Monthly Pledge | Role Power        | Artifact Access                    |
|--------------------|----------------|-------------------|------------------------------------|
| 🏺 **Acolyte**     | $5/month       | Shrine Visitor    | Public logs, badge of recognition  |
| ⚡ **Architect**   | $25/month      | Canon Builder     | Private artifacts, early previews  |
| 🔱 **Oracle**      | $100/month     | Legend Forger     | All artifacts, direct consultation |
| 🜍 **Archon**      | $500/month     | Mythic Patron     | Custom rituals, eternal inscription|

[**→ Become a Sponsor and Join the Legend**](https://github.com/sponsors/alexandros-thomson)

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js 18+ or Deno 1.30+
- Discord Bot Token with role management permissions
- PayPal IPN endpoint configured
- Environment variables configured (see below)

### Quick Start

```bash
# Clone the shrine
git clone https://github.com/alexandros-thomson/sponsor-ipn-discord.git
cd sponsor-ipn-discord

# Install dependencies
npm install
# or
deno cache deps.ts

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Start the shrine listener
npm run start
# or
deno run --allow-all main.ts
```

### Environment Variables

```bash
DISCORD_BOT_TOKEN=your_discord_bot_token
DISCORD_GUILD_ID=your_server_id
PAYPAL_IPN_ENDPOINT=https://ipnpb.paypal.com/cgi-bin/webscr
WEBHOOK_SECRET=your_webhook_secret
LEDGER_PATH=./vault/sponsor-ledger.json
```

---

## 🛠️ Code Example — Shrine Echo Listener

```javascript
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
```

---

## 🧪 Testing the Ritual

```bash
# Run all tests
npm test
# or
deno test --allow-all

# Test PayPal IPN simulation
curl -X POST http://localhost:3000/paypal-ipn \
  -d "txn_id=TEST123" \
  -d "mc_gross=25.00" \
  -d "custom=architect" \
  -d "payer_email=sponsor@example.com"
```

---

## 🤝 Contributing — Join the Forge

Contributions are not just welcomed—they become **part of the living canon**. Here's how to contribute:

### Contribution Guidelines

1. **Fork** this repository
2. **Create** a feature branch (`git checkout -b ritual/new-feature`)
3. **Commit** your changes (`git commit -m '⚡ Add new shrine feature'`)
4. **Push** to the branch (`git push origin ritual/new-feature`)
5. **Open** a Pull Request with a ceremonial description

### Contribution Principles

- ✨ Code with **clarity and ceremony**
- 📜 Document like you're writing **myth**
- 🧪 Test like you're **forging artifacts**
- 🔱 Review like you're **guarding the canon**

[**→ View All Contributors**](https://github.com/alexandros-thomson/sponsor-ipn-discord/graphs/contributors)

---

## 📜 Artifact Logs — Recent Tributes

Every sponsor's pledge is inscribed in the eternal ledger:

```json
{
  "timestamp": "2025-10-13T23:23:00Z",
  "txn_id": "1A2B3C4D5E",
  "sponsor": "sponsor@example.com",
  "tier": "Architect",
  "amount": 25.00,
  "discord_role_granted": "Canon Builder",
  "artifact_url": "https://shrine.kypria.dev/artifacts/1A2B3C4D5E"
}
```

[**→ View Full Ledger**](./vault/sponsor-ledger.json)

---

## 🌟 Become a Sponsor — Forge Your Legend

[![Sponsor Badge](https://img.shields.io/badge/❤️-Sponsor%20This%20Work-d4af37?style=for-the-badge)](https://github.com/sponsors/alexandros-thomson)

When you sponsor this work, you don't just support development—you **forge a legend**:

- 🏺 Your name is inscribed in the **Eternal Artifact Log**
- 🎖️ You receive a **ceremonial Discord role** with exclusive shrine access
- ⚡ Your pledge triggers a **legendary embed** announcement in the Basilica channels
- 📜 You become part of the **living canon** of contributors
- 🔱 Your contributions unlock **sacred drops** and early access to new rituals

**Every contribution matters. Every pledge becomes myth.**

[**→ View Sponsor Dashboard**](https://github.com/sponsors/alexandros-thomson/dashboard)

---

## 🔗 Sacred Links — The Canon Network

### Core Shrines

- 🏛️ [**Basilica Gate**](https://github.com/alexandros-thomson) — Profile shrine and central hub
- 🔥 [**Shrine Canon**](https://github.com/alexandros-thomson/shrine-canon) — Living repository of badges and relics
- 🌌 [**Shrine Watcher**](https://github.com/alexandros-thomson/shrine-watcher) — Discord bot for PayPal IPN listening
- ⚔️ [**Forgebot Rituals**](https://github.com/alexandros-thomson/forgebot-rituals) — Automated ceremonial workflows
- 💎 [**Crest Vault**](https://github.com/alexandros-thomson/crest-vault) — Living canon of P-Commits

### External Channels

- 📫 [**ORCID**](https://orcid.org/0009-0009-6811-5799)
- 💬 [**Discord Community**](https://discord.gg/your-server)
- 📘 [**Facebook**](https://m.facebook.com/kostadinos.kyprianos/)
- 📷 [**Instagram**](https://www.instagram.com/mrspetses/)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

Crafted with myth and code under the sacred seal of the **Basilica Gate**.

---

**— ϟ — Ἀρετή · Λόγος · Τέχνη · Μῦθος — ϟ —**  
*Excellence · Reason · Art · Myth*

**May your code become canon. May your pledges forge legends.**

---

![Shrine Lineage](https://raw.githubusercontent.com/alexandros-thomson/alexandros-thomson/main/public/shrine-lineage-map.svg)
