# StratumFive - Coding Challenge

## Important Note

My desktop broke the day before I attempted this so I had to complete it on a friend's laptop, hence all the commits
being from "Serafín Maza Domínguez". If you want a chat with me at any point about of how I approached
this to make sure it's actually my work that'd be more than welcome. :sweat_smile:

## Jack's Submission

To run:

```bash
# Dev build
yarn serve

# Prod build
yarn build
npx serve dist
```

## Noteworthy commits

[96f88a8](https://github.com/jack-cooper/coding-challenge/commit/96f88a8d6dc0996f4ae18e48781705ebd64220cc)

This is where the actual work begins. Every commit prior to this one is just me scaffolding the project and setting up prettier, tailwind etc.

[6474c4e](https://github.com/jack-cooper/coding-challenge/commit/6474c4e6bd328600dd6d658a6f0b7cddea5d906b)

This is where the spec work is complete (outside of one minor bug, see below). Every commit after this one is me throwing up a simple SVG to interactively chart a ship's journey.

## My thoughts

This was a really fun challenge! I got through most of the actual spec work reasonably quickly, although it did have some quirks
in it that I wasn't expecting. Having each ship need to be aware of prior ships' lost positions was a
nice touch that made me really rethink how I was originally planning on approaching the problem. I made a small mistake when
first reading the spec that the first line represented the _size_ of the world, and not the maximum (0-indexed) co-ordinates. That gave me a bit of a shock later on but I´d written everything in a robust enough way that I spent more time changing various variable names than I did fixing up the logic. I finished the spec reasonably early enough so I thought I'd have a crack at an ad-hoc interactive playground for each ship. I ended up calling it a day before that got to a point I'd consider myself happy with but it _does_ work. :smile:

### Things I'm happy with

- Output comes as fast as it can be computed, while more exciting bits of the page are deferred
- Solving the lost ships issue with a method-style Vuex getter worked out incredibly nicely
- I got an interactive grid working in reasonable time, even if it is a little messy

### Things that could have gone better

- Adding in the interactive grid made the components a lot bigger and messier. I'd imagine I can clean them up
  nicer than they currently are but I could have planned ahead on the feature creep for this one way better.
- My desktop breaking! Repeated distractions while chasing it up throughout the day alongside trying
  to use a Spanish language keyboard made for a less than ideal environment :joy:
