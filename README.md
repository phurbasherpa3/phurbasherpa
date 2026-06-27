# Phurba Geljen Sherpa - Personal Portfolio Website

A modern, responsive portfolio website showcasing filmmaking projects, mountain guiding experiences, book recommendations, and professional services.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Dark theme with gradient accents and smooth transitions
- **Lightbox Gallery**: Interactive media viewer for images and videos
- **Contact Integration**: Direct WhatsApp integration for inquiries
- **Smooth Animations**: Page transitions and hover effects
- **SEO Optimized**: Proper meta tags and semantic HTML

## File Structure

```
├── index.html              # Home page
├── filmmaking.html         # Filmmaking portfolio
├── trekking.html          # Trekking & climbing services
├── books.html             # Book recommendations
├── services.html          # Professional services
├── contact.html           # Contact page with form
├── 404.html               # GitHub Pages error page
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   └── main.js            # JavaScript functionality
└── README.md              # This file
```

## Deployment to GitHub Pages

### Option 1: Deploy to User/Organization Page
1. Rename the repository to `username.github.io`
2. Push to the `main` branch
3. Site will be live at `https://username.github.io`

### Option 2: Deploy to Project Page
1. Push to the `gh-pages` branch (or set in Settings)
2. Site will be live at `https://username.github.io/repository-name`

### Steps:
1. Create a new repository on GitHub
2. Clone locally and copy files into it
3. Commit and push:
   ```bash
   git add .
   git commit -m "Deploy portfolio website"
   git push origin main
   ```
4. Go to repository Settings → Pages
5. Select the branch to deploy from (usually `main`)
6. Enable GitHub Pages
7. Your site will be live at the generated URL

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Advanced styling with CSS variables and animations
- **Vanilla JavaScript**: No framework dependencies
- **External Libraries**:
  - FontAwesome 6.4.0 (Icons)
  - Google Fonts (Outfit, Plus Jakarta Sans)
  - Cloudinary (Image hosting)

## Browser Support

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features in Detail

### Navigation
- Responsive hamburger menu for mobile
- Active page highlighting
- Smooth page transitions with overlay effect

### Lightbox
- Click to expand images and videos
- Keyboard navigation (Arrow keys, Escape)
- YouTube video embed support

### Contact Form
- Direct WhatsApp integration
- Form validation
- Pre-formatted message template

### Responsive Design
- Mobile-first approach
- Breakpoints for tablets and desktops
- Touch-friendly interface

## Customization

### Update Contact Information
Edit the phone number in `js/main.js`:
```javascript
const phoneNumber = 'YOUR_PHONE_HERE';
```

### Change Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary: #3B82F6;
    --accent: #F59E0B;
    --bg-dark: #0B0B0C;
    /* ... more colors ... */
}
```

### Add Social Links
Update social links in HTML files by editing the contact cards and footer sections.

## Performance

- **Optimized Images**: Uses Cloudinary for external image hosting
- **CSS Animations**: Hardware-accelerated transforms
- **Minimal JavaScript**: No heavy dependencies
- **Fast Load Time**: Optimized for all connection speeds

## Security

- No external scripts that could compromise security
- All forms use standard HTTPS
- Content Security Policy friendly

## License

© 2026 Phurba Geljen Sherpa. All Rights Reserved.

## Support

For issues or questions about deployment:
- Email: phurba.work@gmail.com
- WhatsApp: +977 9803716195
- Instagram: @phurbageljensherpa

---

**Note**: This website is optimized for GitHub Pages. When hosting, ensure JavaScript is enabled for full functionality.
