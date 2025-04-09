# Chart Component Fix Script

This script automatically fixes common chart component usage issues in the codebase.

## Issues Fixed

1. **BarChart Component**
   - Fixes incorrect data structure by converting from:
     ```tsx
     <BarChart
       data={[
         { name: "Category 1", value: 100 },
         { name: "Category 2", value: 200 }
       ]}
       xField="name"
       yField="value"
     />
     ```
     to:
     ```tsx
     <BarChart
       data={{
         labels: ["Category 1", "Category 2"],
         datasets: [
           {
             label: "Value",
             data: [100, 200],
             backgroundColor: "rgba(59, 130, 246, 0.8)"
           }
         ]
       }}
       options={{
         responsive: true,
         maintainAspectRatio: false
       }}
     />
     ```

2. **LineChart Component**
   - Fixes incorrect data structure by converting from:
     ```tsx
     <LineChart
       data={[
         { name: "Jan", value: 100 },
         { name: "Feb", value: 200 }
       ]}
       xField="name"
       yField="value"
     />
     ```
     to:
     ```tsx
     <LineChart
       data={[
         { x: "Jan", y: 100 },
         { x: "Feb", y: 200 }
       ]}
       xField="x"
       yField="y"
     />
     ```

## Usage

1. Make sure you have Node.js installed.
2. Run the script from the root of your project:

```bash
node fix-charts.js
```

3. The script will:
   - Find all `.tsx` and `.jsx` files in the `src` directory
   - Apply the fixes to each file
   - Report the number of files fixed

## Backup

It's recommended to create a backup or commit your changes before running the script:

```bash
git checkout -b fix-chart-components
```

## After Running

After running the script, you should:

1. Review the changes to ensure they're correct
2. Fix any remaining issues manually
3. Run your linter to check for any remaining errors
4. Test the application to ensure everything works as expected

## Limitations

- The script uses regular expressions to find and replace patterns, so it may not catch all edge cases.
- Some complex chart data structures may need manual fixes.
- The script doesn't handle all possible chart configurations. 