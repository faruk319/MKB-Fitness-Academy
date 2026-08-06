# WordPress Upload Instructions

## Method 1: Direct Upload (Fastest)

1. **Zip your files:**
   - Select all files (HTML, CSS, img folder)
   - Create a zip file

2. **Upload via WordPress:**
   - Go to Media > Add New
   - Upload your zip file
   - Extract in `/wp-content/uploads/kids-exercise/`

3. **Access pages:**
   - `yoursite.com/wp-content/uploads/kids-exercise/home.html`

## Method 2: WordPress Pages (Better SEO)

1. **Upload images:**
   - Go to Media > Add New
   - Upload all images from img folder
   - Note the URLs

2. **Add CSS:**
   - Appearance > Customize > Additional CSS
   - Paste your styles.css content

3. **Create pages:**
   - Pages > Add New
   - Title: "Kids Exercise Home"
   - Content: Copy HTML from home.html (body content only)
   - Repeat for each day

4. **Update image paths:**
   - Replace `img/01plank.png` with full WordPress URLs
   - Example: `https://yoursite.com/wp-content/uploads/2024/10/01plank.png`

## Method 3: Plugin Solution

1. **Install "Insert HTML Snippet" plugin**
2. **Create snippets for each page**
3. **Use shortcodes in WordPress pages**

## Quick Setup Commands

```bash
# If you have WordPress CLI access:
wp media import img/*.png
wp post create --post_type=page --post_title="Kids Exercise Home" --post_content="[your-html-content]"
```

## Image Path Updates Needed

Replace in all HTML files:
- `img/01plank.png` → `https://yoursite.com/wp-content/uploads/exercise-images/01plank.png`
- `img/02pushup.png` → `https://yoursite.com/wp-content/uploads/exercise-images/02pushup.png`
- etc.

## WordPress Page URLs

Set up these page slugs:
- `/kids-exercise/` (home)
- `/kids-exercise-day-1/`
- `/kids-exercise-day-2/`
- ... through day 10
