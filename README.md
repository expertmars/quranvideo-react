> ⚠️ **Notice: This Website Version is Discontinued**  
> This website implementation of Quran Video Creator is no longer maintained.  
> A new **cross-platform app** has been developed instead, offering a much better experience.  
> 👉 Check out the app version here: [Quran Video Creator App](https://github.com/expertmars/quranvideoapp)

# 📸 Quran Video Maker — Legacy Website

An early version of a tool designed to let users generate Quran recitation videos effortlessly — with options to select Surah, Qari, Ayah range, and apply custom text styles for both Arabic and translated verses.

---

## 📖 Original Purpose

This website was created to:

- Let users select a **Surah** and **Ayah range**
- Choose a **Qari (reciter)** from a list of supported voices
- Display Arabic text in different fonts/styles
- Add translated text in languages like English, Urdu, Malayalam, etc.
- Render a synchronized video where recitation matches the displayed text

It was an early attempt to simplify high-quality Quran video creation, mainly for Islamic content creators, students, and educators.

---

## ❌ Why It Was Discontinued

- The web version had **technical limitations** (especially with real-time video rendering and audio/text sync in the browser).
- We decided to move to a **dedicated application (desktop/mobile)** that offers:
  - Better performance
  - More design flexibility
  - Export presets for social media
  - Seamless rendering using FFmpeg under the hood

> **The new app offers everything this site aimed to do — and more.**

---

## 🖼️ UI Preview (Legacy)

![Group 83 (1)](https://github.com/user-attachments/assets/c348520a-441e-4b09-8b6b-d8227c08e960)

---

## 🚀 How It Worked (Legacy Flow)

1. **User selected Surah, Ayah range, and Qari**
2. **Chose Arabic text style and translation language**
3. **Clicked 'Generate Video'**
4. The system would render a basic video with synchronized audio and verse display

---

## 🧱 Tech Stack (Legacy)

- **Frontend**: HTML, CSS, JavaScript (React)
- **Backend**: Node.js
- **Media**: Basic audio stitching + text rendering logic
- **Fonts**: Quranic fonts like Amiri, Scheherazade, and Noto Naskh Arabic
- **APIs**: Quran.com

---

## 🗃️ File Structure

```bash
quranvideomaker/
├── public/            # Fonts, static assets
├── src/
│   ├── components/    # UI elements (buttons, input, etc.)
│   ├── pages/         # Views like Home, Generate
│   ├── utils/         # Verse parser, sync helpers
│   └── styles/        # Custom CSS or Tailwind
└── server/            # Backend logic (if any)
````

---

## 📦 Project Status

**Discontinued**
This repository is no longer being updated.
You're welcome to fork it, learn from it, or repurpose the code.

---

## 📲 What’s Next

We’ve moved forward with a fully featured **Quran Video Creator app**
If you're interested in getting updates on the app or contributing to it:

📧 Contact: \[[Muneer Malik](mailto:armuneermalik@gmail.com)]
🔗 App Repo: `https://github.com/expertmars/quranvideoapp`

---

## 📜 License

This code is released under the MIT License — you're free to reuse and build upon it with attribution.

---

## 🤍 Final Note

This site laid the foundation for a better, more powerful tool.
Thanks to everyone who supported it — the journey continues with the app. ✨

> *"So remind, if the reminder should benefit."* — \[Qur’an 87:9]
