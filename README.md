# 💪 MKB Fitness Academy

**Premium Gym, Swimming Pool & Wellness Center in Ravet, Pune**

🌐 Website: [www.mkbfitnessacademy.com](https://www.mkbfitnessacademy.com)

---

## 📋 About

MKB Fitness Academy is a premium fitness center located at **Sector 29, Aditya Malhar Road, Ravet, Pune - 412101**. We offer world-class gym facilities, swimming pool, kids activities, personal training, and wellness therapy services.

## 🏋️ Services

| Service | Description |
|---------|-------------|
| 🏋️ Gym | State-of-the-art equipment & training |
| 🏊 Swimming | Professional swimming pool |
| 👶 Kids Activities | Fun fitness programs for children |
| 🧘 Wellness & Therapy | Holistic wellness services |
| 💼 Personal Training | One-on-one expert guidance |

## 🕐 Timings

| Session | Time |
|---------|------|
| Morning | 6:00 AM – 12:00 PM |
| Evening | 4:00 PM – 10:00 PM |

> Open all 7 days a week

## 📞 Contact

- **Phone:** [+91 9503834888](tel:+919503834888)
- **Location:** Sector 29, Aditya Malhar Road, Ravet, Pune - 412101

## 🛠️ Tech Stack

Static HTML — no framework, no build step.

```
index.html  gym.html  swimming.html  kids.html  trainers.html
wellness.html  pricing.html  about.html  contact.html
css/style.css   (single stylesheet)
js/main.js      (mobile nav, pricing sub-nav, contact form → Google Sheet + WhatsApp)
images/         (optimised JPGs, ≤1600px)
.htaccess       (HTTPS redirect, security headers, caching)
```

## 🚀 Deploy to Hostinger

1. hPanel → **Files → File Manager** → open `public_html`.
2. Upload everything except `.git/`.
3. Or: hPanel → **Advanced → Git** → connect this repo, branch `main`, deploy path `public_html`.

## ✏️ Editing prices

All prices live in `pricing.html` and in the matching section on each program page. Search for the `₹` amount and edit in both places.
