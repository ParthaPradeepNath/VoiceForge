export interface QuickAction {
  title: string;
  description: string;
  gradient: string;
  href: string;
}

export const quickActions: QuickAction[] = [
  {
    title: "Narrate a Story",
    description: "Bring characters to life with expressive AI narration",
    gradient: "from-cyan-400 to-cyan-50",
    href: "/text-to-speech?text=In a village tucked between mist-covered mountains, there lived an old clockmaker whose clocks never told the right time - but they always told the truth. One rainy evening, a stranger walked in and asked for a clock that could show him his future.",
  },
  {
    title: "Game Character Voice",
    description: "Generate voices for RPG or action game characters",
    gradient: "from-purple-500 to-purple-100",
    href: "/text-to-speech?text=I am Kael, the last guardian of the Ember Blade. Step forward if you dare, but know this — I do not lose, and I do not forgive.",
  },
  {
    title: "Podcast Intro",
    description: "Create a professional podcast opening voice",
    gradient: "from-orange-400 to-orange-100",
    href: "/text-to-speech?text=Welcome back to The Future Byte, where we break down the latest in AI, tech, and innovation. I'm your host, and today we dive into the world of voice cloning.",
  },
  {
    title: "Motivational Speech",
    description: "Generate powerful and inspiring speeches",
    gradient: "from-green-400 to-green-100",
    href: "/text-to-speech?text=Every great journey begins with doubt. But what separates winners from the rest is the courage to take one more step, even when the path is unclear.",
  },
  {
    title: "YouTube Voiceover",
    description: "Create engaging narration for videos",
    gradient: "from-pink-400 to-pink-100",
    href: "/text-to-speech?text=In today's video, we're exploring the top 5 AI tools that are changing the way creators produce content. Stick around till the end for a bonus tip!",
  },
  {
    title: "Sci-Fi AI Assistant",
    description: "Futuristic assistant voice for sci-fi projects",
    gradient: "from-indigo-500 to-indigo-100",
    href: "/text-to-speech?text=System online. All neural pathways operational. Commander, I have analyzed the situation — the probability of mission success is currently at 87 percent.",
  },
];
