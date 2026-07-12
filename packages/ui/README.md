# @initbase/react-datetime-picker

Zero-dependency date, time, and range pickers for React 18+.

## Install

```bash
npm install @initbase/react-datetime-picker
```

## Usage

Import the component you need and its CSS:

```tsx
import { DatePicker } from '@initbase/react-datetime-picker';
import '@initbase/react-datetime-picker/datetime-picker.css';
```

### DatePicker

```tsx
import { useState } from 'react';
import { DatePicker } from '@initbase/react-datetime-picker';

function Example() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <DatePicker value={value} onChange={setValue} placeholder="Pick a date" />
  );
}
```

### DateRangePicker

```tsx
import { useState } from 'react';
import { DateRangePicker } from '@initbase/react-datetime-picker';

function Example() {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  return (
    <DateRangePicker value={value} onChange={setValue} placeholder="Pick a range" />
  );
}
```

### TimePicker

```tsx
import { useState } from 'react';
import { TimePicker } from '@initbase/react-datetime-picker';

function Example() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <TimePicker value={value} onChange={setValue} />
  );
}
```

### DateTimePicker

```tsx
import { useState } from 'react';
import { DateTimePicker } from '@initbase/react-datetime-picker';

function Example() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <DateTimePicker value={value} onChange={setValue} />
  );
}
```

### TimeRangePicker / DateTimeRangePicker

Same pattern with `[Date | null, Date | null]` tuple values.

## Common props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `Date \| null` / `[Date\|null, Date\|null]` | — | Controlled value |
| `onChange` | `(value) => void` | — | Change handler |
| `placeholder` | `string` | — | Placeholder text |
| `position` | `'bottom' \| 'top' \| 'flexible'` | `'flexible'` | Popover position |
| `step` | `number` | `1` | Minute/second step interval |
| `use12h` | `boolean` | `false` | 12-hour format |
| `showSeconds` | `boolean` | `false` | Show seconds column |

## Theming

Customize with CSS custom properties on any parent of `.rdp-wrapper`:

```css
.rdp-wrapper {
  --rdp-primary: #4f46e5;
  --rdp-primary-hover: #4338ca;
  --rdp-text: #111827;
  --rdp-text-muted: #9ca3af;
  --rdp-border: #e5e7eb;
  --rdp-border-radius: 8px;
  --rdp-font-size: 14px;
  --rdp-cell-size: 36px;
}
```

## Links

- [Docs](https://initbase.github.io/react-datetime-picker/docs/intro)
- [Demo](https://initbase.github.io/react-datetime-picker/demo/)
- [GitHub](https://github.com/initbase/react-datetime-picker)
- [Support](https://ko-fi.com/burhanahmeed)
