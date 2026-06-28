+++
date = "2026-05-26T08:00:00-04:00"
title = "Numbers That Should Not Change After the Fact"
tags = ['software', 'rails', 'mobile', 'ios']
+++

I have been building [My Challenge Coin](https://mychallengecoin.app), a family achievement app where kids log challenges, earn coins, and track habits with their parents. I have been running it with my two kids for six weeks.

<!--more-->

Two numbers kept breaking in ways that were hard to name. Both looked fine during development. Both broke in production under conditions I could not easily reproduce. And both turned out to have the same root cause.

## The coin balance that went negative

Each completion earns one coin. Spending a coin on a reward deducts one. The balance is what the kid sees at the top of the screen at all times, and it matters to them.

My first version returned completions and spends as separate API responses. The React Native client computed the balance:

```typescript
const balance = completions.length - spends.length;
```

This looks correct. It is not.

On a real device with a real network, the two requests fire in parallel and resolve at slightly different times. When completions loaded first and spends had not arrived yet, the displayed balance was inflated. When spends loaded first, which happened often on slower connections, the kid would briefly see a negative number. A kid who earned 8 coins and spent 6 would see -6, then 2. It lasted half a second. That was enough.

The fix was to stop computing the balance on the client entirely. The server computes it once and returns it as a single field:

```ruby
# app/controllers/profiles_controller.rb
def me
  render_ok({
    ...
    coin_balance: @current_person.coin_balance,
    earned_count: completions.count,
  })
end

# app/models/person.rb
def coin_balance
  completions.count - spends.sum(:amount)
end
```

One number. Computed in one place. No race condition. The client displays what it receives and does not recalculate.

If a number is the result of a calculation across multiple data sources, compute it on the server and return it as one authoritative value. Do not let the client reassemble parts that arrive at different times.

## The personal record delta that rewrote history

Record challenges track personal bests: longest breath hold, fastest 100m, most push-ups. Each new completion must beat the current record. When it does, the card reads something like "14 seconds better than last time."

My first version computed this delta on the fly when rendering the card:

```ruby
delta = completion.value - challenge.current_record
```

This also looks correct. The problem appeared a few weeks in.

When a kid broke the record again, `challenge.current_record` updated. Every previous completion now showed a different delta, not what was true on the day they logged it, but the distance from today's record. A completion that used to read "14 seconds better" now read "8 seconds worse" because their sibling had since beaten them. The math was accurate. The meaning was completely wrong.

The fix was to snapshot the previous record at the exact moment of completion creation and store it permanently:

```ruby
# app/controllers/completions_controller.rb
def create
  challenge = Challenge.find(params[:challenge_id])

  completion = Completion.new(completion_params)
  completion.previous_record = challenge.current_record  # snapshot now

  if challenge.record_type?
    completion.record_delta = completion.value - challenge.current_record
  end

  if completion.save
    challenge.update(current_record: completion.value)  # advance the record after
  end
end
```

The delta is computed once, at the time the event happened. The record displayed on that card is the record as it stood that day. It will not change regardless of what happens next.

```ruby
def record_display
  direction = challenge.higher_is_better? ? "↑" : "↓"
  "#{direction} #{record_delta.abs} #{challenge.unit} from last time"
end
```

## The pattern

Both bugs had the same shape. A number representing something real was being silently recomputed from live data every time it was displayed. The first time a user looked at it, the number was right. After some time, the live data had moved and the number said something different.

This is fine for a dashboard metric. It is wrong for anything that records what actually happened.

The question I now ask before any computation: if I look at this number in five years, should it reflect what was true on the day it happened, or what is true today? If the answer is the day it happened, store it then. Write it once. Do not touch it again.

My Challenge Coin is available on the [App Store](https://mychallengecoin.app). The backend is Rails 8 with SQLite on Fly.io.
