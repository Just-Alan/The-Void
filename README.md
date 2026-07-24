The Void

A place where thoughts drift between strangers.

The Void is an anonymous message-in-a-bottle web app built for Stardance 2026. You write something, anything, and release it. Someone else receives it. They can dissolve it forever or release it again so it drifts further. No usernames. No likes. No algorithm. Just words moving between people.

How it works
Log in with your Hack Club account (You must be a part of the Stardance event. If you aren't, even if you have an HC account it won't let you in)
Give yourself a name (6 characters) and choose the color your thoughts appear in
Once a day, release a thought into the void
When someone sends you a thought, a small button appears in the corner of your screen
You choose: dissolve it forever, or release it back

Thoughts that keep getting released glow brighter over time. Most people won't notice. Some will.

Tech stack
Frontend — vanilla HTML, CSS, and JavaScript with a WebGL vortex shader

Database — Supabase (users, thoughts, deliveries)

Auth — Hack Club Auth (HCA), Stardancers only

Moderation — Groq API (llama-3.3-70b-versatile) checks every thought before delivery

Backend — Vercel serverless functions for the OAuth token exchange and moderation

No install needed, just go to https://the-void-dusky.vercel.app and see for yourself how it works.





The void is waiting.



Don't let it wait any longer.
