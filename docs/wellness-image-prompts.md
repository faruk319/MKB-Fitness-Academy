# MKB Wellness — Image Generation Prompts (Google Gemini / Imagen)

Reference docs se banaya gaya hai:
- `docs/welness page refence.jpeg` — Cupping Therapy (dark green + gold branding)
- `docs/reference page for welness.jpeg` — IASTM Therapy (teal branding)
- `docs/reference page for welness page.jpeg` — main Wellness poster

**Brand palette (har prompt me maintain karo):**
- Accent teal: `#0e7c7b` · Deep green: `#12472c` · Gold: `#c9a227`
- Clinic interior: bright, white, airy, soft natural light, shallow depth of field

**Global negative prompt (har generation ke saath paste karo):**
```
text, letters, words, watermark, logo, signature, caption, subtitle, UI elements,
cartoon, illustration, 3d render, cgi, anime, painting, caricature, deformed hands,
extra fingers, mutated fingers, extra limbs, bad anatomy, blurry, low resolution,
jpeg artifacts, noise, harsh flash, oversaturated, neon colors, cluttered background,
duplicate limbs, plastic skin
```

**How to use:** Gemini me image generate karte waqt ratio choose karo —

| Slot | Ratio | Output |
|---|---|---|
| Service cards (svc-*) | 4:3 | 800x600 |
| Wide hero (cupping-therapy, iastm-therapy) | 16:10 | 1100x687 |
| Small (cupping-dry, cupping-silicone) | 4:3 | 600x450 |

Generate karne ke baad file ko `images/wellness/` me usi naam se save karo
(`.jpg`, quality 80-85) — HTML me `width`/`height` already set hain, koi markup change nahi karna.

**Consistency ke liye** har prompt ke end me ye line rakho:
`bright airy clinical photography, white and mint-green clinic interior, soft natural daylight, high-key lighting, photorealistic, 8K detail`

---

## 1. svc-cupping.jpg — Cupping Therapy (service card)
**Size:** 800x600 · **Ratio:** 4:3

```
Professional photograph of a physiotherapist in a white clinical uniform performing
cupping therapy on a patient's bare upper back. Five transparent medical-grade
silicone suction cups with yellow valves are attached in a row along the back,
pulling the skin upward into visible dome shapes with mild natural redness.
Therapist's hands are gently adjusting one cup. Bright modern clinic room, soft
diffused natural window light, clean white and pale mint background, shallow depth
of field, realistic skin texture, calm clinical atmosphere, professional healthcare
photography, 4:3 aspect ratio
```

---

## 2. svc-theragun.jpg — Theragun / Percussion Therapy
**Size:** 800x600 · **Ratio:** 4:3

```
Professional photograph of a therapist using a black handheld percussion massage
gun on the shoulder of a shirtless male patient lying face down on a treatment
table. Therapist wears a white clinical uniform and holds the device firmly with
both hands. The round massage head presses into the shoulder muscle. Modern
wellness clinic, bright white walls, soft natural light, clean minimal background,
shallow depth of field, realistic skin and muscle detail, professional healthcare
photography, 4:3 aspect ratio
```

---

## 3. svc-infrared.jpg — Infrared Light Therapy
**Size:** 800x600 · **Ratio:** 4:3

```
Professional photograph of infrared red light therapy treatment. A patient lies
face up on a clinic bed wearing a light robe, with a large red LED panel lamp
positioned above, casting a vivid warm red glow across the body and the ceiling.
Visible red light gradient and soft rays. Modern physiotherapy clinic, dark
surroundings contrasting with the red glow, clinical and technological mood,
shallow depth of field, professional healthcare photography, 4:3 aspect ratio
```

---

## 4. svc-tens.jpg — Electrotherapy / TENS
**Size:** 800x600 · **Ratio:** 4:3

```
Professional photograph of a TENS electrotherapy treatment. A patient lies face up
on a treatment bed with two white adhesive electrode pads attached to the lower back
area, connected by thin white wires to a small white TENS unit device resting beside
them. A therapist's hand is visible adjusting the device knob. Clean modern clinic,
bright white and soft mint-green background, soft natural light, shallow depth of
field, clinical and reassuring mood, professional healthcare photography, 4:3 aspect ratio
```


---

## 5. svc-deep-tissue.jpg — Deep Tissue Massage
**Size:** 800x600 · **Ratio:** 4:3

```
Professional photograph of a deep tissue massage session. A therapist in a white
uniform applies firm pressure with both hands on the upper back of a shirtless male
client lying face down on a treatment table covered with a white sheet. Muscles and
shoulders clearly defined, hands pressing into the trapezius area. Warm spa-like
clinic interior, soft diffused light, neutral white and beige tones, shallow depth
of field, realistic skin texture, relaxing professional mood, professional
healthcare photography, 4:3 aspect ratio
```

---

## 6. svc-relaxation.jpg — Wellness & Relaxation Therapy
**Size:** 800x600 · **Ratio:** 4:3

```
Serene professional photograph of a relaxation therapy session. A client lies face
up on a massage bed covered with a soft white sheet and a light green towel, eyes
closed with a calm peaceful expression. Small white stones and a green leaf are
placed near the head, with a small vase of fresh green leaves in the background.
Bright airy wellness spa room, large window with soft daylight, white and sage-green
tones, minimal decor, shallow depth of field, tranquil spa atmosphere, professional
healthcare photography, 4:3 aspect ratio
```

---

## 7. cupping-therapy.jpg — Cupping Hero Banner (wide)
**Size:** 1100x687 · **Ratio:** 16:10

```
Wide professional photograph of cupping therapy being administered. A patient lies
face down on a treatment bed showing their bare upper back, with six transparent
silicone cupping cups with yellow valves attached in two rows, creating visible
raised dome shapes and natural circular redness marks on the skin. A therapist in a
white uniform stands beside the bed, one hand gently holding a cup. Modern clinic
room, bright white and mint-green interior, soft natural window light, clean and
professional, shallow depth of field with the back in sharp focus, realistic skin
texture, calm therapeutic mood, professional healthcare photography, 16:10 aspect ratio
```

---

## 8. iastm-therapy.jpg — IASTM Hero Banner (wide)
**Size:** 1100x687 · **Ratio:** 16:10

```
Wide professional photograph of Instrument Assisted Soft Tissue Mobilization
therapy. A patient lies face down on a treatment bed showing their bare upper back
and shoulder. A therapist in a white clinical uniform holds a curved stainless-steel
IASTM scraping instrument and glides it firmly across the skin of the shoulder blade
area, one hand stabilising the shoulder. Visible mild natural redness on the treated
skin. Bright modern clinic interior, white walls, soft natural light, teal-green
accents, clean and sterile feel, shallow depth of field, sharp focus on the
instrument and shoulder, professional healthcare photography, 16:10 aspect ratio

---

## 9. cupping-dry.jpg — Dry Cupping (small)
**Size:** 600x450 · **Ratio:** 4:3

```
Close-up professional photograph of dry cupping therapy. A bare back fills the
frame with five transparent medical silicone suction cups with small yellow valves
attached in a row, the skin pulled upward into domes with visible circular redness
marks. A therapist's hand enters the frame from the top adjusting the last cup.
Bright clinical setting, soft natural light, clean neutral background, sharp focus
on the cups, realistic skin detail, professional healthcare photography, 4:3 aspect ratio
```

---

## 10. cupping-silicone.jpg — Silicone Cupping (small)
**Size:** 600x450 · **Ratio:** 4:3

```
Close-up professional photograph of a therapist's hand gently pressing a soft pink
silicone cupping cup onto a client's bare shoulder. The cup is smooth, rounded and
made of flexible medical-grade silicone. Hand has clean short nails, client skin is
soft and natural. Bright clean clinic background, soft diffused light, shallow depth
of field, gentle and safe mood, realistic photography, 4:3 aspect ratio
```

---

## Note: `logo.jpg` ke liye prompt nahi hai

`images/wellness/logo.jpg` (560x560) ek **vector-style logo graphic** hai, photo nahi —
wahi hai jo `docs/wellness logo.jpg` me already hai. Ise AI se generate na karein,
 warna official brand mark hat jayega. Ye file as-is rakhein.

Sirf **10 photo slots** (niche #1–#10) Gemini se generate karne hain.

---

## Tips for best results

1. **Negative prompt sabse zaroori hai** — text/watermark hatane ke liye har baar paste karo.
2. **Aspect ratio image ke size se match karo**, warna crop hoga.
3. **Hands galat aayein toh** prompt me `"hands clearly visible, five fingers on each hand,
   correct human anatomy"` add kar do.
4. `"8K, highly detailed, photorealistic, DSLR"` jodne se quality improve hoti hai.
5. Har image generate karne ke baad browser me check karo — agar image ati-dark lagi toh
   `"bright, high-key lighting, well-exposed"` add karo.
6. Har prompt ke end me consistency line rakho:
   `bright airy clinical photography, white and mint-green clinic interior, soft natural daylight, high-key lighting, photorealistic, 8K detail`

```