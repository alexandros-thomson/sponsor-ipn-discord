
# sponsor-ipn-discord

Webhook handler that listens for PayPal IPNs and assigns Discord sponsor roles with artifact logs.

---

## Overview

This service captures PayPal’s Instant Payment Notifications (IPNs), verifies them with PayPal’s validation endpoint, and then elevates your community members in Discord by assigning sponsor roles. Every sponsorship event is recorded as an artifact log in your designated channel, creating a living ledger of patronage.

---

## Features

- Validates IPN payloads against PayPal’s “VERIFIED” oracle  
- Determines sponsor tier based on payment amount  
- Assigns corresponding Discord role via bot integration  
- Logs each sponsorship as an embed in your “artifact log” channel  
- Lightweight Deno implementation—zero dependencies, frictionless deploy  

---

## Architecture & Data Flow

```text
[ PayPal IPN ] 
       ↓
  paypal-ipn-discord.ts  
       ↓
  ┌────────────────────┐
  │ validateIPN()      │───► PayPal validation API  
  └────────────────────┘
       ↓
  ┌────────────────────┐
  │ determineTier()    │  
  └────────────────────┘
       ↓
  ┌────────────────────┐
  │ assignRole()       │───► Discord API  
  └────────────────────┘
       ↓
  ┌────────────────────┐
  │ logArtifact()      │───► Discord “artifact-log” channel  
  └────────────────────┘
