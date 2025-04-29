# 🧪 Test Neutralizer

A Chrome extension to automatically disable common test restrictions like copy/paste blocking, tab switch detection, and right-click prevention — designed for learning and dev testing.

## 🧰 Tech Stack

- ⚡ **Vite** + **React** + **TypeScript**
- 🔒 **Manifest v3** + **@crxjs/vite-plugin**
- 🎨 **Tailwind CSS** (DaisyUI-ready)

## 🔧 Usage

1. Clone the repo  
   `git clone https://github.com/ZeeshanMukhtar1/test-neutralizer.git`
2. Install dependencies  
   `pnpm install`
3. Start dev server  
   `pnpm dev`
4. Build for production  
   `pnpm build`
5. Load `dist/` in Chrome via `chrome://extensions` → **Load unpacked**

## ✅ Features

- Neutralizes:
  - Tab focus/blur detection
  - Copy/paste blocking
  - Context menu restrictions
- Runs automatically on all pages (or as configured)

## 📦 Roadmap

- Add toggle button to activate/deactivate script
- Inject UI overlay for status
- Per-site config and logging

---

> Built by Zeeshan for dev research and educational purposes.
