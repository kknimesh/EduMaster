# EduMaster Design System

## Overview
The EduMaster Design System provides a comprehensive set of design principles, components, and guidelines to ensure consistency across all platforms (web, mobile, and admin interfaces).

## Design Principles

### 1. **Accessibility First**
- WCAG 2.1 AA compliance
- High contrast ratios (4.5:1 minimum)
- Keyboard navigation support
- Screen reader compatibility

### 2. **Mobile-First Responsive Design**
- Progressive enhancement approach
- Flexible grid system
- Touch-friendly interactions
- Optimal performance across devices

### 3. **Consistency & Clarity**
- Unified visual language
- Predictable interaction patterns
- Clear information hierarchy
- Intuitive navigation flows

## Color Palette

### Primary Colors
- **Blue 500**: `#3b82f6` - Primary actions, links
- **Blue 600**: `#2563eb` - Button hover states
- **Blue 700**: `#1d4ed8` - Active states

### Secondary Colors
- **Gray 50**: `#f9fafb` - Background
- **Gray 100**: `#f3f4f6` - Light backgrounds
- **Gray 500**: `#6b7280` - Text secondary
- **Gray 900**: `#111827` - Text primary

### Status Colors
- **Success**: `#22c55e` - Success states, confirmations
- **Danger**: `#ef4444` - Errors, destructive actions
- **Warning**: `#f59e0b` - Warnings, cautions
- **Info**: `#3b82f6` - Information, neutral states

## Typography

### Font Family
- **Primary**: Inter (web), System fonts (mobile)
- **Secondary**: ui-serif for headings when needed
- **Monospace**: ui-monospace for code

### Scale
- **H1**: 32px / 2rem - Page titles
- **H2**: 28px / 1.75rem - Section headers
- **H3**: 24px / 1.5rem - Subsection headers
- **H4**: 20px / 1.25rem - Card titles
- **Body**: 16px / 1rem - Regular text
- **Caption**: 14px / 0.875rem - Secondary text
- **Small**: 12px / 0.75rem - Labels, meta text

### Font Weights
- **Regular**: 400 - Body text
- **Medium**: 500 - Labels, secondary headings
- **Semibold**: 600 - Headings, important text
- **Bold**: 700 - Page titles, emphasis

## Spacing System

Based on 8px grid system:
- **XS**: 4px - Micro spacing
- **SM**: 8px - Small spacing
- **MD**: 16px - Standard spacing
- **LG**: 24px - Large spacing
- **XL**: 32px - Section spacing
- **XXL**: 48px - Page spacing

## Component Library

### Buttons
- **Primary**: Main actions (Submit, Save, Continue)
- **Secondary**: Secondary actions (Cancel, Back)
- **Danger**: Destructive actions (Delete, Remove)
- **Outline**: Tertiary actions, less emphasis

### Forms
- **Input Fields**: Text, email, password inputs
- **Select Dropdowns**: Single and multi-select
- **Checkboxes**: Boolean selections
- **Radio Buttons**: Single choice from options
- **Text Areas**: Long-form text input

### Navigation
- **Top Navigation**: Primary site navigation
- **Sidebar**: Secondary navigation for dashboards
- **Breadcrumbs**: Hierarchical navigation
- **Pagination**: Content navigation

### Data Display
- **Cards**: Content containers
- **Tables**: Structured data display
- **Lists**: Sequential content
- **Statistics**: Key metrics display

### Feedback
- **Alerts**: System messages
- **Toasts**: Temporary notifications
- **Loading States**: Progress indicators
- **Empty States**: No content scenarios

## Layout Guidelines

### Grid System
- **Breakpoints**:
  - Mobile: 0-767px
  - Tablet: 768-1023px
  - Desktop: 1024px+
- **Container**: Max-width 1200px, centered
- **Columns**: 12-column grid system
- **Gutters**: 16px on mobile, 24px on desktop

### Spacing Rules
- **Vertical Rhythm**: Consistent spacing between elements
- **Content Margins**: 16px minimum from screen edges
- **Section Spacing**: 48px between major sections
- **Component Spacing**: 24px between related components

## Interaction Patterns

### States
- **Default**: Initial state
- **Hover**: Mouse over interaction
- **Focus**: Keyboard navigation
- **Active**: Pressed/clicked state
- **Disabled**: Non-interactive state
- **Loading**: Processing state

### Animations
- **Duration**: 200ms for micro-interactions, 300ms for page transitions
- **Easing**: Ease-out for entrances, ease-in for exits
- **Fade In**: Opacity 0 to 1, translateY(10px) to 0
- **Slide Up**: translateY(100%) to 0

## Icons
- **Style**: Outline icons for consistency
- **Size**: 16px, 20px, 24px standard sizes
- **Weight**: 1.5px stroke width
- **Library**: Heroicons or similar consistent set

## Platform-Specific Guidelines

### Web (React)
- Use Tailwind CSS classes
- Implement proper semantic HTML
- Ensure keyboard navigation
- Optimize for desktop and tablet experiences

### Mobile (React Native)
- Follow platform conventions (iOS/Android)
- Use appropriate touch targets (44px minimum)
- Implement platform-specific animations
- Optimize for mobile performance

### Admin Dashboard
- Dense information layouts
- Advanced data visualization
- Bulk action capabilities
- Power user shortcuts

## Accessibility Requirements

### Color Contrast
- Text on background: 4.5:1 minimum
- Interactive elements: 3:1 minimum
- Focus indicators: Clearly visible

### Keyboard Navigation
- Tab order follows logical sequence
- All interactive elements accessible
- Skip links for main content
- Escape key closes modals/dropdowns

### Screen Readers
- Semantic HTML structure
- ARIA labels where needed
- Alt text for images
- Form labels properly associated

## Usage Examples

### Button Implementation
```tsx
<Button variant="primary" size="md" loading={isSubmitting}>
  Submit Form
</Button>
```

### Card Implementation
```tsx
<Card shadow="md" hover padding="lg">
  <h3>Course Title</h3>
  <p>Course description...</p>
</Card>
```

### Color Usage
```css
.primary-button {
  background-color: theme('colors.primary.600');
  color: theme('colors.white');
}

.primary-button:hover {
  background-color: theme('colors.primary.700');
}
```

## Maintenance

### Design Tokens
All design system values should be maintained as design tokens to ensure consistency and ease of updates across platforms.

### Component Updates
Any changes to core components should be:
1. Documented in this guide
2. Updated across all platforms
3. Tested for accessibility compliance
4. Communicated to the development team

### Version Control
This design system follows semantic versioning:
- **Major**: Breaking changes
- **Minor**: New components or features
- **Patch**: Bug fixes and minor improvements