<p align="center">
  <img src="docs/hero.svg" alt="Motion Architect — motion graphics with Claude, fully local" width="100%">
</p>

<p align="center">
  <b>Motion graphics with Claude, on your machine.</b><br>
  Give it videos, images and your brand. It designs, animates and renders.
</p>

<p align="center"><a href="README.md">Español</a></p>

---

## What it is

**Motion Architect** is a Claude Code agent that makes motion graphics for you. Talk to it like you would to a motion designer and get a rendered video back.

| | |
|---|---|
| 👁 **Watches your references** | Give it a video (link or file) or an image; it picks up rhythm, cuts, palette and motion style |
| 🎨 **Designs with your brand** | Colors, typography and visual style, either yours or proposed by the agent |
| 🎬 **Writes the storyboard** | Hook, build-up and punchline with exact timing. You approve it first |
| ✨ **Animates with taste** | Easing, timing and springs that feel professional, not "AI-made" |
| 📐 **Renders any format** | Vertical, landscape, square or 4:5, with Reels/TikTok safe zones |
| 🔊 **Adds sound** | Built-in SFX library, synced to the animation |

Everything runs **locally**: rendering, video analysis and preview. Nothing gets uploaded.

<p align="center"><img src="docs/demo.gif" alt="Demo rendered with Motion Architect" width="80%"></p>

## Install

Requirements: macOS or Linux, [Claude Code](https://claude.com/claude-code), Node 18+, ffmpeg, yt-dlp, Python 3. The installer checks everything and offers Homebrew installs on macOS.

```bash
git clone https://github.com/Hainrixz/motion-architect.git
cd motion-architect
./install.sh          # --yes for no prompts
```

Restart Claude Code afterwards. Optional: add `GROQ_API_KEY` or `OPENAI_API_KEY` to `~/.config/motion-architect/.env` to transcribe videos without captions.

## Usage

```
/motion a 15s vertical reel announcing my finance app, cinematic style
```

It asks what's missing in one message, studies your references, sets up your brand, writes a storyboard and waits for your OK, animates and reviews frame by frame, opens a live preview (`cd studio && npm run studio`, http://localhost:3000) and renders mp4s in the formats you asked for.

```
/motion animate my logo (~/Desktop/logo.svg), 5s, 16:9 and 9:16
Watch https://www.instagram.com/reel/... and make something with that rhythm in my brand. Vertical, 12s.
/motion-render MyVideo all
```

## Formats

| Format | Size | For |
|---|---|---|
| Vertical 9:16 | 1080×1920 | Reels, TikTok, Shorts |
| Landscape 16:9 | 1920×1080 | YouTube, web, decks |
| Square 1:1 | 1080×1080 | Feed, LinkedIn |
| Portrait 4:5 | 1080×1350 | Instagram feed |

## License

Motion Architect is **MIT**. Bundled open-source components are listed in [third_party/NOTICES.md](third_party/NOTICES.md).

The video engine is [Remotion](https://www.remotion.dev): free for individuals, non-profits and companies of up to 3 people. Larger companies need a [company license](https://www.remotion.dev/license).
