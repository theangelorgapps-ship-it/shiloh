type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

function collectClasses(value: ClassValue, classes: string[]) {
  if (!value) return;

  if (typeof value === 'string' || typeof value === 'number') {
    classes.push(String(value));
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectClasses(item, classes));
    return;
  }

  if (typeof value === 'object') {
    Object.entries(value).forEach(([key, active]) => {
      if (active) classes.push(key);
    });
  }
}

export function cn(...inputs: ClassValue[]) {
  const classes: string[] = [];
  inputs.forEach((input) => collectClasses(input, classes));
  return classes.join(' ');
}
