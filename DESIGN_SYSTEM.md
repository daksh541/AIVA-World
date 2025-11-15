# AIVA World - Design System & Component Library

## Overview

This document provides comprehensive information about the AIVA World design system, component library, and implementation guidelines.

## Design System

### Color Palette

#### Primary Colors
- **Deep Dark Background**: `#0a0e27` (RGB: 10, 14, 27) - OLED optimized
- **Card Background**: `#1a1a2e` (RGB: 26, 26, 46)
- **Soft White Text**: `#e5e7eb` (RGB: 229, 231, 235)

#### Neon Accent Colors
- **Neon Blue**: `#00d4ff` (RGB: 0, 212, 255)
- **Neon Purple**: `#b537ff` (RGB: 181, 55, 255)
- **Neon Pink**: `#ff2e97` (RGB: 255, 46, 151)
- **Neon Cyan**: `#00fff9` (RGB: 0, 255, 249)
- **Neon Orange**: `#ffa500` (RGB: 255, 165, 0)

#### Theme Support
The application supports three themes:
1. **Dark Mode** (Default): Deep dark backgrounds with neon accents
2. **Light Mode**: Light backgrounds with vibrant accents
3. **High Contrast Mode**: Maximum contrast for accessibility

### Typography

- **Headers**: Modern sans-serif (Poppins, Inter, or Space Grotesk)
- **Body**: Clean readable sans-serif (Roboto, Segoe UI, or SF Pro Display)
- **Font Sizes**: Scale from 12px to 48px with 1.5 line height
- **Font Features**: Enabled ligatures and contextual alternates

### Spacing & Layout

- **Base Unit**: 4px
- **Container**: Max-width with responsive padding
- **Grid System**: 12-column fluid grid using CSS Grid/Flexbox
- **Breakpoints**:
  - Mobile: 375px - 768px
  - Tablet: 768px - 1024px
  - Desktop: 1024px+

## Component Library

### Button Component

The Button component supports multiple variants and states:

#### Variants
- `default`: Primary CTA with gradient (neon-blue to neon-cyan)
- `secondary`: Secondary action with gradient (neon-purple to neon-pink)
- `outline`: Outlined style with border
- `ghost`: Minimal text/icon button
- `link`: Text link with underline
- `fab`: Floating Action Button (56x56px circle)
- `destructive`: Destructive actions (red)

#### Sizes
- `sm`: Small (h-9, min-height: 44px)
- `default`: Default (h-11, min-height: 44px)
- `lg`: Large (h-14, min-height: 56px)
- `icon`: Icon only (h-11 w-11, min: 44x44px)

#### States
- **Default**: Full opacity, clear visual affordance
- **Hover**: 5-10% brightness increase, scale 1.02x
- **Focus**: 2px border glow with accent color
- **Pressed/Active**: Scale 0.98x, deeper color, shadow
- **Disabled**: 40% opacity, gray tone, no cursor
- **Loading**: Animated spinner with `loading` prop

#### Usage Example
```tsx
<Button 
  variant="default" 
  size="lg" 
  loading={isLoading}
  loadingText="Processing..."
>
  Start Chat
</Button>
```

### Input Component

Enhanced input with validation and accessibility:

#### Features
- Label support
- Error state with icon
- Success state with checkmark
- Helper text
- Minimum 44px height for mobile
- ARIA labels and descriptions
- Real-time validation feedback

#### Usage Example
```tsx
<Input
  label="Email Address"
  type="email"
  placeholder="your@email.com"
  error={errors.email}
  helperText="We'll never share your email"
  success={isValid}
/>
```

### Theme Toggle Component

Accessible theme switcher with three options:
- Dark Mode
- Light Mode
- High Contrast Mode

Persists user preference in localStorage.

### Navigation Bar

Enhanced navbar with:
- Responsive mobile menu (hamburger)
- Theme toggle
- User dropdown menu
- Notification bell
- Active route highlighting
- Keyboard navigation support
- ARIA labels

### Chat Room Component

Full-featured chat interface with:
- Real-time message display
- Voice calling UI
- Mic/Volume controls
- Connection quality indicator
- Call duration timer
- Typing indicators
- Message timestamps
- Responsive layout (70/30 split on desktop)

### Motion Control Panel

Avatar animation controls:
- Preset motion library (8 default presets)
- Category filtering (Idle, Action, Emotion, Custom)
- Playback controls (Play, Pause, Reset, Skip)
- Timeline scrubber
- Playback speed control (0.25x - 2x)
- Save/Load presets
- Export/Import functionality

## Animation & Motion

### Animation Specifications

- **Spring Animation**: 
  - Tension: 300
  - Friction: 30
  - Mass: 1

- **Easing**: 
  - Fast: `cubic-bezier(0.34, 1.56, 0.64, 1)` (bouncy)
  - Standard: `ease-out`
  - Slow: `ease-in-out`

- **Durations**:
  - Fast: 200ms
  - Standard: 400ms
  - Slow: 600ms
  - Maximum: 1000ms

### GPU Acceleration

All animations use GPU-accelerated properties:
- `transform` (translate, scale, rotate)
- `opacity`
- `will-change` property for optimization

### Reduced Motion Support

Respects `prefers-reduced-motion` media query:
- Disables animations for users who prefer reduced motion
- Maintains functionality without motion

## Accessibility

### WCAG 2.2 AA Compliance

- **Contrast Ratios**: Minimum 4.5:1 for text
- **Keyboard Navigation**: Full Tab, Enter, Escape support
- **Screen Reader Support**: ARIA labels, semantic HTML
- **Focus Indicators**: Visible 2px outline on all interactive elements
- **Alt Text**: All images and icons have descriptive text
- **Skip Links**: Skip to main content link

### Touch Targets

- **Mobile**: Minimum 44x44px
- **Desktop**: Minimum 48x48px
- All interactive elements meet these requirements

### Form Accessibility

- Labels associated with inputs
- Error messages with `role="alert"`
- Helper text with proper IDs
- Required field indicators
- Validation feedback

## Performance Optimizations

### Code Splitting

- Lazy loading for all route pages
- Suspense boundaries with loading states
- Dynamic imports for heavy components

### Image Optimization

- Use `loading="lazy"` for below-fold images
- Responsive `srcset` attributes
- WebP format with fallbacks
- Proper aspect ratios

### Caching

- React Query for API caching (5-minute stale time)
- LocalStorage for theme preferences
- Service Worker ready (can be added)

### Bundle Size

- Target: < 500KB gzipped for initial load
- Tree-shaking enabled
- Unused code elimination

## Responsive Design

### Mobile-First Approach

Design starts at 375px width and scales up:
1. Mobile (375px - 768px)
2. Tablet (768px - 1024px)
3. Desktop (1024px+)

### Navigation

- **Mobile**: Hamburger menu with slide animation
- **Desktop**: Horizontal navigation bar
- **Tablet**: Adaptive layout

### Grid System

- 12-column fluid grid
- Responsive column spans
- Auto-wrapping on mobile

## Usage Examples

### Creating a New Page

```tsx
import { lazy } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      <Navbar />
      <main id="main-content">
        {/* Your content */}
      </main>
      <Footer />
    </div>
  );
}
```

### Using Buttons

```tsx
// Primary CTA
<Button variant="default" size="lg">
  Get Started
</Button>

// Secondary action
<Button variant="secondary">
  Learn More
</Button>

// Icon button
<Button variant="ghost" size="icon" aria-label="Settings">
  <Settings />
</Button>

// Loading state
<Button loading={isSubmitting} loadingText="Saving...">
  Save Changes
</Button>
```

### Using Forms

```tsx
<form onSubmit={handleSubmit}>
  <Input
    label="Email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    error={errors.email}
    helperText="Enter your email address"
  />
  <Button type="submit" loading={isSubmitting}>
    Submit
  </Button>
</form>
```

## Testing Checklist

### Mobile Testing
- [ ] Test on 375px, 414px, 768px widths
- [ ] Verify touch targets are 44x44px minimum
- [ ] Test hamburger menu functionality
- [ ] Verify responsive images load correctly
- [ ] Test form inputs on mobile keyboard

### Accessibility Testing
- [ ] Keyboard navigation works throughout
- [ ] Screen reader announces all interactive elements
- [ ] Focus indicators visible on all elements
- [ ] Color contrast meets WCAG AA standards
- [ ] Forms have proper labels and error messages

### Performance Testing
- [ ] Lighthouse score: 85+ Performance, 95+ Accessibility
- [ ] Initial bundle size < 500KB gzipped
- [ ] Images lazy load correctly
- [ ] Code splitting works as expected
- [ ] No console errors or warnings

### Browser Testing
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Customization

### Changing Colors

Update CSS custom properties in `src/index.css`:

```css
:root {
  --neon-blue: 0 212 255;
  --neon-purple: 181 55 255;
  /* ... */
}
```

### Adding New Button Variants

Extend `buttonVariants` in `src/components/ui/button.tsx`:

```tsx
variant: {
  // ... existing variants
  custom: 'bg-custom-color text-white hover:...',
}
```

### Theme Customization

Add new theme in `src/index.css`:

```css
[data-theme="custom-theme"] {
  --background: ...;
  --foreground: ...;
  /* ... */
}
```

## Support

For questions or issues, please refer to:
- Component documentation in code comments
- TypeScript types for prop definitions
- Storybook (if available)

---

**Last Updated**: 2024
**Version**: 1.0.0

