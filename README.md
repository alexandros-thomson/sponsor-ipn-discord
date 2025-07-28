# 🛠️ Kypria Sponsor Pipeline

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
