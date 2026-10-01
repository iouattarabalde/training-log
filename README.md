# Training Log

Strength sessions, rest timer and progress, kept on the phone. It replaces Gymverse.

**Live: https://iouattarabalde.github.io/training-log/**

## Install on the iPhone

Open the link in **Safari** → Share → **Add to Home Screen**. Launch it from that icon,
not from Safari: the home-screen app has its own storage, opens full screen, and works with no
signal once it has been opened online one time.

## What it does

| Tab | |
|---|---|
| **Today** | Shows the next session. It alternates the templates in rotation, and you can pick another one. Each exercise shows its target and a chip when it's time to progress. |
| **Workout** | Each set row shows last time's numbers, greyed out. Tap ✓ to log them as they are, or type over them first. Ticking a set starts the rest timer. Swap, add or remove exercises, add sets, write notes. |
| **History** | Every finished session. Tap one to edit or delete it. |
| **Progress** | For each exercise: top set, estimated 1RM, volume, and bests. Bodyweight core work shows reps or hold time. |
| **Settings** | lb or kg, rest times, template editor, backup. |

The templates are seeded from `SKILL_training-program-builder.md` in AI-Master-Context:
Session A (Chest & Back), Session B (Shoulders, Arms & Abs), and Legs & Abs switched off.
Core rehab is in every session.

### Progression

Add weight once every set and every rep has been hit in **2 consecutive sessions at the same
weight**. A session that already added weight starts a new count. For a range like Plank's 30
to 45 s, a set counts as hit when it reaches the top of the range.

### Back pain

The **Back pain** button flags the session and lists the spinal-load exercises still to do,
each with substitutes. **Drop to core rehab only** removes everything else that hasn't been
logged yet. A flag on either of the last two sessions puts that exercise's "add weight" on hold.
Spinal-load flags are set on: dumbbell row, standing overhead press, EZ bar curl, goblet squat,
Romanian deadlift and walking lunge.

## Your data

Everything is stored in the app's local storage on the phone. Nothing is sent anywhere, and
nothing personal is in this repo.

- **Back up.** Settings → Export opens the share sheet. Save the file to Files or iCloud Drive.
  After 14 days without an export, Today shows a reminder.
- **Deleting the home-screen icon deletes the log.** Clearing Safari data can delete it too.
  Export first.
- Import restores a backup file and replaces everything currently on the phone.

## iOS limits

- **When rest ends with the phone locked, nothing alerts you.** The beep only plays with the app
  open. The app keeps the screen awake during a workout, so the normal case is covered. A
  timer left running still shows the right time when you come back to the app.
- **Silent mode may mute the beep.** The timer bar also turns green and pulses.
- No vibration, no Apple Health, no Watch. Those need a native app.

## Files

| File | |
|---|---|
| `index.html` | The whole app: markup, styles, logic, seed templates |
| `sw.js` | Offline cache. The page loads from the network first, and after 2 s falls back to the cache. **Bump `VERSION` when you change a cached file.** |
| `manifest.webmanifest` | Home-screen name, colours, icons |
| `vendor/chart.umd.min.js` | Chart.js 4.4.1, same copy as `acheter-vs-louer` |
| `favicon.svg` | Source for every icon PNG |
