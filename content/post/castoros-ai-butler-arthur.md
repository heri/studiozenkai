+++
date = "2026-07-21T09:00:00-04:00"
title = "Teaching an AI to Run My Chalet While I'm at the Beach"
tags = ['software', 'elixir', 'phoenix', 'AI', 'airbnb', 'entrepreneurship']
+++

[CastorOS](https://castoros.app) is the platform I've been building to automate the boring, repetitive parts of running an Airbnb: door codes, thermostats, guest messages, the works. The big idea is simple: you should be able to go off-grid for a weekend, phone dead, no bars, and not worry that a guest is standing at your door with no idea how to get in.

<!--more-->

## Six years of the same nine questions

I've hosted [my own chalet](https://studiozenkai.com/post/airbnb-vacation-home/) for six years now. Somewhere in year two, I noticed something obvious in hindsight: guests almost never ask anything new. What's the wifi password. What time is check-in. Are pets allowed. How do I start the BBQ. The answer to nearly every message is already sitting somewhere: in the listing description, in the Q&A section, or in a reply I typed out for a different guest months ago. I was manually re-answering the same nine questions, forever, at 11pm, on my phone, in bed.

That repetition is the whole thesis behind CastorOS's newest piece: a chat assistant, grounded entirely in *your* property's actual content, that answers those questions so you don't have to.

## New territory: Phoenix

CastorOS itself is written in Elixir on Phoenix — a first for me. Most of my work has been Ruby and JavaScript, so LiveView's server-rendered, no-JS-framework-needed model took some rewiring. It's been a genuinely pleasant surprise for a product like this: guest-facing pages that update in real time (a host replies, the guest's screen updates, no polling, no client-side state management) basically fall out of the framework for free. But Phoenix wasn't really the point of this project. The point was the second new thing.

## New territory: AI-enabled chat

I named him Arthur, because "the digital butler" needed a name and Arthur felt right. Guests type a question into a chat bubble on the property page. Arthur answers: grounded in the property's own description, house rules, and per-amenity guides. It never invents an answer it doesn't have. If it doesn't know, or the topic is sensitive (a real emergency, a complaint, anything about money), it stops and hands the conversation to me, with the full transcript, instantly.

That "never invent an answer" part is the whole game. An AI assistant that hallucinates a check-out time is worse than no assistant at all.

![arthur-chat-property-page](/images/arthur001.png "the floating chat bubble open on the property page, mid-conversation with a guest question and Arthur's answer")

## The technical concerns that actually kept me up

Building "an AI chatbot" is the easy 20%. Building one you would trust unsupervised on a real booking is the other 80%. A few of the problems worth writing down:

**Context caching.** Every guest question means re-sending the property's full corpus (description, house rules, every amenity guide) to the LLM as context. If we do that on every single message and we are paying full price, every time, for the same paragraphs. Explicit prompt caching solves this — the corpus gets cached server-side once, and subsequent questions in the same conversation only pay for the new tokens. It only works, though, if your system prompt is byte-for-byte identical across calls for the same property. One stray dynamic value (a timestamp, a random ID) in the wrong place silently busts the cache and you're back to paying full price without realizing it.

**Deciding what a message is actually asking for.** Not every message is a corpus question. Some are booking inquiries ("how much for next weekend?"). Some are from someone who isn't even a guest yet — an anonymous visitor poking around before booking. I ended up with two separate decisions running under the hood: a `get_visitor_intent` classifier for "is this person actually trying to book, or just browsing" (an anonymous visitor gets a few free questions before Arthur decides whether to keep engaging or hand off), and a `get_booking_intent` check for "is this specific message about price or availability." For the booking check, I deliberately did *not* reach for the LLM — a keyword match against a fixed list of phrases ("how much," "combien coûte," "availability," "nightly rate") plus a hardcoded date-math path is faster, free, and — critically — never wrong in a way that matters. If a guest asks about price, they get a real number from the actual rate table, not a plausible-sounding one from a language model.

**What happens after launch, not before.** The failure modes that matter aren't the ones you catch in testing — they're 429 rate limits and 503s from the LLM provider at 9pm on a Saturday when your dashboard isn't open. I added a small "Arthur health" panel to my own admin view: call volume, error rate over the last 24 hours, whether context caching is currently healthy. It's not glamorous, but it's the difference between finding out about an outage from a guest's angry text and finding out from a dashboard.

**Escalation, as a first-class feature, not a fallback.** The instinct is to treat "I don't know" as a failure state. I built it as the opposite — a designed path. Certain topics (safety, money, anything emotionally loaded) skip the AI entirely and go straight to me, with the guest told plainly that a human is now looking at this. Trust is the actual product here, and trust survives an AI that says "let me get my host" far better than one that guesses.

![arthur-escalation](/images/arthur002.png "the host-side dashboard showing an escalated conversation with the transferred badge, next to the admin health panel")

## Two seconds, in front of a friend

I did a live demo for a friend a couple of weeks ago — no script, just "here, ask it something." He typed: *"When's the check-in?"*

I will admit I stress-tested harder in that half-second than in any of my own QA. Would it escalate on something that trivial? Would it hedge? Would it just... not answer?

Two seconds later: *"Check-in is 11am."*

Short. Correct. No hallucinated caveat, no "let me check with the host," no personality performance. Just the actual answer, pulled straight from the property's own check-in page. That's the whole bet — not that AI is impressive, but that it's *boring* in exactly the right way.

![arthur-simple](/images/arthur003.png "When is the check-in - clean chat")

---

There's more coming — the booking flow, the payment side, and a few things I'm still deciding whether I'm brave enough to publish. For now: go enjoy your weekend. If a guest needs the wifi password, Arthur's got it.
