---
sidebar_position: 1
---

# @initbase/react-datetime-picker

A React date time picker component library supporting six modes:

- **Date only** — `<DatePicker />`
- **Time only** — `<TimePicker />`
- **Date & time** — `<DateTimePicker />`
- **Date range** — `<DateRangePicker />`
- **Time range** — `<TimeRangePicker />`
- **Date time range** — `<DateTimeRangePicker />`

## Installation

```bash
npm install @initbase/react-datetime-picker react react-dom
```

## Quick Start

```tsx
import { DatePicker, TimePicker } from '@initbase/react-datetime-picker';
import '@initbase/react-datetime-picker/datetime-picker.css';

function App() {
  return (
    <>
      <DatePicker onChange={(date) => console.log(date)} />
      <TimePicker onChange={(time) => console.log(time)} step={15} />
    </>
  );
}
```

## Customization

Override CSS custom properties to match your design system:

```css
.rdp-wrapper {
  --rdp-primary: #7c3aed;
  --rdp-border-radius: 12px;
  --rdp-font-family: 'Inter', sans-serif;
}
```

Or pass `className` and `style` props directly to any component for Tailwind/custom CSS.
