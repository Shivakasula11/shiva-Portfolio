// ══════════════════════════════════════════════════════════════
//  Personalization — inject the visitor's name into specific
//  intent replies. Kept narrow on purpose — touching every reply
//  reads as robotic; touching greetings/thanks/bye feels natural.
// ══════════════════════════════════════════════════════════════

export function personalizeResponse(text, intentId, userName) {
  if (!userName || !text) return text;
  switch (intentId) {
    case 'greeting':
      return text
        .replace('How can I help you today?',         `How can I help you today, ${userName}?`)
        .replace('How may I assist you today?',       `How may I assist you today, ${userName}?`)
        .replace("I'm here to answer your questions", `I'm here to answer your questions, ${userName}`)
        .replace('Feel free to explore my portfolio', `Feel free to explore my portfolio, ${userName}`);
    case 'thanks':
      return text.replace("You're welcome!", `You're welcome, ${userName}!`);
    case 'bye':
      return text.replace('Thank you for visiting my portfolio!', `Thank you for visiting, ${userName}!`);
    case 'contact':
      return text.replace(/^You can reach me/, `${userName}, you can reach me`);
    case 'availability':
      return `${text}\n\nFeel free to reach out anytime, ${userName}!`;
    default:
      return text;
  }
}