// ============================================================
// MOTIVATIONAL QUOTES — rotated daily
// ============================================================

const quotes = [
  "The only bad workout is the one you didn't do.",
  "Discipline is choosing between what you want now and what you want most.",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "Small steps every day lead to massive results.",
  "Consistency beats intensity. Show up today.",
  "You don't have to be extreme, just consistent.",
  "The pain you feel today is the strength you feel tomorrow.",
  "Success is the sum of small efforts repeated day in and day out.",
  "Take care of your body. It's the only place you have to live.",
  "Progress, not perfection.",
  "What you eat in private, you wear in public.",
  "It never gets easier. You just get stronger.",
  "Push harder than yesterday if you want a different tomorrow.",
  "Your health is an investment, not an expense.",
  "The best project you'll ever work on is you.",
  "Strive for progress, not perfection.",
  "Train insane or remain the same.",
  "Great things never come from comfort zones.",
  "Don't stop when you're tired. Stop when you're done.",
  "Just one more rep. One more step. One more day.",
  "The difference between try and triumph is a little umph.",
  "Sweat is fat crying.",
  "Every workout counts. Every meal matters.",
  "You are what you eat, so don't be fast, cheap, easy, or fake.",
  "Wake up. Work out. Look hot. Kick ass.",
  "Be stronger than your strongest excuse.",
  "The body achieves what the mind believes.",
  "Earn your body.",
  "Today's actions are tomorrow's results.",
  "Fitness is not about being better than someone else. It's about being better than you used to be.",
];

export const getQuoteForDate = (dateStr) => {
  // Deterministic quote based on date
  const hash = dateStr.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return quotes[hash % quotes.length];
};

export default quotes;
