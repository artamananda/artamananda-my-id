---
title: How I Keep My Cloud Hosting Bill at Exactly $0
date: 2026-04-04
---

Running a learning platform like [terasbelajarasik.web.id](https://terasbelajarasik.web.id) comes with an interesting challenge: it's a _free_ learning platform, which means the hosting costs should ideally be free too. And somehow, I've managed to pull that off — my monthly cloud bill is exactly $0, despite running three separate apps across multiple platforms.

Here's how I did it.

---

## The Stack: Three Apps, Multiple Platforms

My setup consists of three apps:

- **Backend** — a REST API written in **Go (Golang)**, running on [Fly.io](https://fly.io), along with a managed PostgreSQL database, also on Fly.io.
- **CMS** — a React-based content management system deployed on [Vercel](https://vercel.com).
- **Web** — the main frontend at terasbelajarasik.web.id, also React-based, also on Vercel.

Each platform was chosen deliberately — not just for performance, but for cost.

---

## Fly.io: The Art of Running on the Minimum

For the backend and database, I chose Fly.io. I run **3 apps** total there:

1. **Go backend** — the main REST API server, `shared-cpu-1x` with 256MB RAM, 1 machine.
2. **PostgreSQL** — the database, also `shared-cpu-1x` with 256MB RAM, 1 machine.
3. **Uptime Kuma** — a self-hosted uptime monitoring tool, same spec, 1 machine.

High availability is disabled on all three, meaning each app runs on exactly one machine. Lean, intentional, no unnecessary redundancy.

All three are deployed in the **EWR (Newark, US East Coast)** region — not **SIN (Singapore)**, which would actually be geographically closer to me here in Indonesia. But this wasn't an arbitrary choice.

### Why EWR and Not SIN?

Two reasons.

First, latency. For a platform at my current scale — still a small user base, no real-time data requirements — the extra milliseconds from a server sitting in America are barely noticeable in practice. A perfectly acceptable trade-off.

Second — and more importantly — **cost**. Since July 2024, Fly.io has implemented [region-specific pricing](https://fly.io/docs/about/pricing/). Different regions now carry different price tags, and Asia Pacific (including SIN) is significantly more expensive than North America due to higher infrastructure costs over there.

A rough estimate: a `shared-cpu-1x 256MB` machine running 24/7 in North America (like EWR) costs around **$1.94/month** per machine. Multiply by 3: 3 × $1.94 = ~$5.82/month

If I were using SIN instead, the per-machine price would be noticeably higher ($2.47/month per machine) — and that difference alone would start to break the math I'm about to explain.

### Two Layers of Protection That Make the Bill $0

Two things work together here, and both matter.

**Layer one: Legacy Free Allowance.**

My account is on the **Legacy Hobby Plan** — a grandfathered plan from before Fly.io overhauled their pricing on October 7, 2024. Under this plan, I get the following resources included for free:

- Up to **3 shared-cpu-1x 256MB VMs** — exactly what I run
- **3GB of persistent volume storage** (total)
- **100GB outbound data transfer** for North America & Europe per month

This is also another reason I can't just switch to SIN. Asia Pacific outbound transfer only gets **30GB** under the legacy allowance — versus 100GB for North America & Europe. Smaller quota, higher per-machine price, more risk of going over. EWR keeps me comfortably inside the allowance on both dimensions.

**Layer two: The sub-$5 invoice waiver.**

Beyond the free allowance, Fly.io has an additional policy: if your total monthly invoice comes in **under $5, they waive it entirely**. This isn't a formally advertised feature on their pricing page, but it's been acknowledged directly by Fly.io staff in their community forum — they do it because many small invoices are the result of accidental usage, and $5 is a reasonable threshold to absorb rather than create nasty surprises for users. If an invoice hits $5 or more, the full amount is charged.

So putting it all together:

| Scenario                | Detail                                                                       | Cost                   |
| ----------------------- | ---------------------------------------------------------------------------- | ---------------------- |
| Within free allowance   | 3 VMs in EWR, 3GB storage, 100GB transfer                                    | $0                     |
| Slightly over allowance | As long as total bill stays under $5                                         | $0 (waived)            |
| If using SIN instead    | Higher per-machine price + smaller transfer quota = more likely to breach $5 | Starts getting charged |

This is why region selection isn't just a latency decision — it's a billing decision. EWR gives enough headroom to stay safely within both layers of protection. SIN likely wouldn't.

> **Important note:** The Legacy Hobby Plan is no longer available to new users. Fly.io stopped offering free allowances for new signups after October 2024. This is a privilege, not an expectation — and I'm very careful not to accidentally click the "Switch to Pay As You Go" button, because once you do, there's no going back.

---

## Vercel: Free Tier That Just Works

For the two frontend apps — the main web and the CMS — I use Vercel. Both are React-based, and Vercel's free tier handles them effortlessly. No configuration headaches, no bandwidth concerns at this scale.

Deployment is also a highlight: using **GitHub Actions**, both frontend apps typically deploy in **under 2 minutes**. The Go backend on Fly.io takes a bit longer, around **3 minutes**, mostly because the service has grown and Fly.io runs a full Docker build during deployment. But honestly, that's still fast enough for my workflow.

---

## Transactional Email: Brevo Free Plan

For sending emails — things like OTP, account verification, and notifications — I use [**Brevo**](https://brevo.com) (formerly Sendinblue). Their free plan allows up to **300 emails per day**, which resets daily. That's roughly 9,000 emails per month, and for our current user base, that's more than enough.

The free plan also comes with transactional email support via SMTP and REST API, which integrates cleanly with the Go backend. The only caveat is that emails include Brevo branding in the footer, but that's a trade-off I'm completely fine with at this stage.

---

## Object Storage: Cloudflare R2

For file uploads — profile pictures, question images, and other web assets — I use **[Cloudflare R2](https://developers.cloudflare.com/r2/)**. R2's free tier includes 10GB of storage and 1 million Class A operations per month, with **no egress fees**. That last part is a big deal compared to AWS S3 or Google Cloud Storage, where outbound bandwidth can quietly inflate your bill.

For a platform at my scale, this is more than enough.

As for **video content**, I don't store that myself at all — I embed YouTube links stored as URLs in the database. Videos would drain that modest object storage instantly, and YouTube already handles encoding, CDN delivery, and bandwidth at zero cost to me. No reason to reinvent that wheel.

---

## Domain + Cloudflare: The Only Real Expense

The one thing I do pay for is the domain name — and even that is minimal, around **$2–3 per year**. Once acquired, I point it to **[Cloudflare](https://cloudflare.com)**, which gives me a suite of genuinely useful free features:

- **Global CDN** — static content cached on servers around the world, reducing latency regardless of where users are
- **Free SSL/TLS** — automatic HTTPS with zero certificate management overhead
- **DDoS protection** — basic but effective mitigation against common attacks
- **DNS management** — fast, reliable, and completely free
- **Auto Minify** — automatic compression of HTML, CSS, and JavaScript files
- **Analytics** — basic traffic monitoring and request insights
- **Always Online** — Cloudflare serves cached pages even if the origin server briefly goes down
- **Firewall rules** — up to 5 free rules to block suspicious traffic patterns

All of that, for $0.

---

## The Full Picture

| Component           | Platform         | Cost                   |
| ------------------- | ---------------- | ---------------------- |
| Backend (Go API)    | Fly.io           | $0 (legacy hobby plan) |
| PostgreSQL DB       | Fly.io           | $0 (legacy hobby plan) |
| Uptime Kuma         | Fly.io           | $0 (legacy hobby plan) |
| CMS Frontend        | Vercel           | $0 (free tier)         |
| Web Frontend        | Vercel           | $0 (free tier)         |
| Transactional Email | Brevo            | $0 (free tier)         |
| Object Storage      | Cloudflare R2    | $0 (free tier)         |
| CDN + DNS + SSL     | Cloudflare       | $0 (free tier)         |
| Video Hosting       | YouTube (embed)  | $0                     |
| Domain              | Domain Registrar | ~$2–3/year             |

**Total monthly cost: $0.** Total annual cost: the price of a domain.

---

## Final Thoughts

Could I just pay for hosting? Sure. It would be simpler. But there's something genuinely satisfying about engineering a zero-cost infrastructure — especially for a platform that's free to its users. It forces you to think carefully about every architectural decision: which region to deploy in, whether high availability is actually needed, what belongs in object storage versus a CDN versus YouTube.

It feels like playing the role of a cost-obsessed CTO — except my entire annual budget is just one domain renewal.

The opportunities are out there. You just have to know where to look — and be willing to not click that "upgrade plan" button.

---

_If you have questions about any part of this setup, feel free to reach out!_
