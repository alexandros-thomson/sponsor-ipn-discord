// Riff Loop Sponsor Handler — v1.0 Kyprian Build
import { decodeGlyphs, logEvent, deliverArtifact } from './kyprian-core';
import { getSponsorTier, assignDiscordRole } from './discord-hooks';

export async function handleRiffSequence(glyphChain, sponsorID) {
  const decoded = decodeGlyphs(glyphChain); // Interpret 🛠️📜🚀...

  // Log the invocation
  await logEvent({
    sponsorID,
    glyphChain,
    decodedAction: decoded.action,
    timestamp: new Date().toISOString(),
    type: 'riff-loop',
  });

  // Determine sponsor tier from action
  const tier = getSponsorTier(decoded.action);
  await assignDiscordRole(sponsorID, tier.role);

  // Drop vault artifact if applicable
  if (decoded.perk === 'artifact drop') {
    await deliverArtifact({
      sponsorID,
      type: 'sigil-bundle',
      path: `/drops/${decoded.action}/${sponsorID}.json`,
    });
  }

  return {
    status: 'success',
    message: `Riff loop completed for ${sponsorID} via ${glyphChain}`,
    perksUnlocked: [decoded.perk],
    tier,
  };
}
