# Avatar Magic 🎨  
*A face-locked, browser-only avatar creator*

Avatar Magic is a lightweight web app that helps users create **stylized avatars** from a single photo — without writing prompts, without sending images to servers, and without relying on unstable AI APIs.

Instead of generating a new face, Avatar Magic **preserves the user’s real facial structure** and applies artistic styles like pixel art, sketch, and cyberpunk directly in the browser.

---

## ✨ Why this project exists

Creating good avatars with AI usually requires:
- Long, specific prompts
- Trial-and-error tweaking
- Losing facial identity in the output

Avatar Magic solves this by:
- Replacing text prompts with **simple visual choices**
- Locking facial geometry so the avatar still looks like *you*
- Running fully client-side for speed and privacy

---

## 🧠 Core Idea

> **Do not regenerate the face. Transform it.**

The app detects facial landmarks, then applies **controlled, region-based stylization** instead of free-form image generation.

This avoids:
- Identity drift  
- Random hallucinations  
- API failures  

---

## 🚀 Features

- 📸 Upload a single selfie
- 🔒 Facial structure preserved using landmarks
- 🎭 Style options:
  - Pixel
  - Sketch
  - Cyberpunk
- 👓 Optional accessories (e.g. glasses)
- 🎨 Vibe controls (warm / dark / neutral)
- 💾 Download avatar as PNG
- 🔐 No backend, no API keys, no data upload

---

## 🛠️ Tech Stack

- **HTML / CSS / JavaScript**
- **Tailwind CSS** (UI)
- **MediaPipe Face Mesh** (face landmark detection)
- **Canvas API** (image processing & rendering)

Everything runs **entirely in the browser**.

---

## 🧩 How it works (high level)

1. User uploads a photo  
2. MediaPipe detects facial landmarks  
3. A face bounding box is computed  
4. Styles are applied **only to the face region**  
5. Accessories are placed using landmark coordinates  
6. Final avatar is rendered on canvas  

No prompts. No AI generation. No network calls.


## 📁 Project Structure

