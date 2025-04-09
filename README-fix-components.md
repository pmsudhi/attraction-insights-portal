# Component Fix Script

This script automatically fixes common component usage issues in the codebase.

## Issues Fixed

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

## Usage

1. Make sure you have Node.js installed.
2. Run the script from the root of your project:

```bash
node fix-components.js
```

3. The script will:
   - Find all `.tsx` and `.jsx` files in the `src` directory
   - Apply the fixes to each file
   - Report the number of files fixed

## Backup

It's recommended to create a backup or commit your changes before running the script:

```bash
git checkout -b fix-component-usage
```

## After Running

After running the script, you should:

1. Review the changes to ensure they're correct
2. Fix any remaining issues manually
3. Run your linter to check for any remaining errors
4. Test the application to ensure everything works as expected

## Limitations

- The script uses regular expressions to find and replace patterns, so it may not catch all edge cases.
- Some complex component usage patterns may need manual fixes.
- The script doesn't fix issues with chart components or other complex components. 