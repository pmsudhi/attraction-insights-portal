# Component and Chart Fix Script

This script automatically fixes common component and chart usage issues in the codebase.

## What It Does

This script combines the functionality of two separate scripts:

1. **Component Fix Script** (`fix-components.js`)
   - Fixes `CardHeader`, `Badge`, and `Button` component usage

2. **Chart Fix Script** (`fix-charts.js`)
   - Fixes `BarChart` and `LineChart` component usage

## Usage

1. Make sure you have Node.js installed.
2. Run the script from the root of your project:

```bash
node fix-all.js
```

3. The script will:
   - Create a backup branch using Git
   - Run the component fix script
   - Run the chart fix script
   - Report the results

## What Gets Fixed

### Component Fixes

1. **CardHeader Component**
   - Replaces incorrect usage with `title` and `subtitle` props with the correct pattern using `CardTitle` and `CardDescription` components as children.
   - Adds necessary imports for `CardTitle` and `CardDescription`.

2. **Badge Component**
   - Fixes incorrect variant values:
     - `primary` → `default`
     - `success` → `default`
     - `danger` → `destructive`
     - `warning` → `secondary`
   - Removes unsupported `size` prop.

3. **Button Component**
   - Fixes incorrect variant values:
     - `primary` → `default`
   - Fixes incorrect usage of `icon` and `iconPosition` props by using a flex layout with children.
   - Fixes incorrect size values:
     - `xs` → `sm`

### Chart Fixes

1. **BarChart Component**
   - Fixes incorrect data structure by converting from array of objects with `name` and `value` properties to the correct format with `labels` and `datasets`.

2. **LineChart Component**
   - Fixes incorrect data structure by converting from array of objects with `name` and `value` properties to the correct format with `x` and `y` properties.

## After Running

After running the script, you should:

1. Review the changes to ensure they're correct
2. Fix any remaining issues manually
3. Run your linter to check for any remaining errors
4. Test the application to ensure everything works as expected

## Limitations

- The script uses regular expressions to find and replace patterns, so it may not catch all edge cases.
- Some complex component usage patterns may need manual fixes.
- The script doesn't fix all possible issues with chart components or other complex components. 