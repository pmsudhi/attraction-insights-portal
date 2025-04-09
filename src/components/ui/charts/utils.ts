import { ChartDataFormat, SimpleDataFormat, ComplexDataFormat, ChartColors } from './types';

export const isComplexDataFormat = (data: unknown): data is ComplexDataFormat => {
  try {
    const typedData = data as ComplexDataFormat;
    return Boolean(
      data &&
      typeof data === 'object' &&
      !Array.isArray(data) &&
      Array.isArray(typedData.labels) &&
      Array.isArray(typedData.datasets)
    );
  } catch {
    return false;
  }
};

export const isSimpleDataFormat = (data: unknown): data is SimpleDataFormat => {
  try {
    return (
      Array.isArray(data) &&
      data.length > 0 &&
      typeof data[0] === 'object' &&
      data[0] !== null &&
      'label' in data[0] &&
      'value' in data[0]
    );
  } catch {
    return false;
  }
};

export const transformChartData = (
  data: ChartDataFormat,
  xField: string,
  yFields: string[]
): Array<Record<string, string | number>> => {
  try {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return [];
    }

    if (isSimpleDataFormat(data)) {
      return data.map(item => ({
        [xField]: item.label,
        [yFields[0]]: item.value
      }));
    }

    if (isComplexDataFormat(data)) {
      return data.labels.map((label, index) => ({
        [xField]: label,
        ...data.datasets.reduce((acc, dataset) => ({
          ...acc,
          [dataset.label]: dataset.data[index]
        }), {})
      }));
    }

    // Handle array of objects (LegacyDataFormat)
    if (Array.isArray(data) && data.length > 0) {
      // First check if all required fields exist in the data
      const hasAllFields = data.every(item => {
        if (!item || typeof item !== 'object') return false;
        const itemKeys = Object.keys(item);
        return xField in item && yFields.every(field => itemKeys.includes(field));
      });

      if (hasAllFields) {
        return data.map(item => {
          const result: Record<string, string | number> = {
            [xField]: item[xField]
          };
          yFields.forEach(field => {
            // Ensure we're getting a number for numerical fields
            const value = item[field];
            result[field] = typeof value === 'string' && !isNaN(Number(value))
              ? Number(value)
              : value;
          });
          return result;
        });
      }

      console.warn('Data format mismatch: Some required fields are missing', {
        required: [xField, ...yFields],
        available: Object.keys(data[0] || {})
      });
    }

    return [];
  } catch (error) {
    console.error('Error transforming chart data:', error);
    return [];
  }
};

export const getChartColors = (index: number, total: number): ChartColors => {
  const hue = index * (360 / total);
  return {
    stroke: `hsl(${hue}, 70%, 50%)`,
    fill: `hsl(${hue}, 70%, 90%)`
  };
};

export const getDataFields = (
  data: ChartDataFormat,
  defaultFields: string[]
): string[] => {
  try {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return defaultFields;
    }

    if (isSimpleDataFormat(data)) {
      return ['value'];
    }

    if (isComplexDataFormat(data)) {
      return data.datasets.map(ds => ds.label);
    }

    // For legacy format, return all fields that match the defaultFields
    if (Array.isArray(data) && data.length > 0) {
      const availableFields = Object.keys(data[0]);
      return defaultFields.filter(field => availableFields.includes(field));
    }

    return defaultFields;
  } catch (error) {
    console.error('Error getting data fields:', error);
    return defaultFields;
  }
};

export const formatTooltipValue = (value: number): string => {
  if (Math.abs(value) >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toFixed(1);
}; 