export default function debounce(func: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null;

  return function executedFunction(...args: any[]) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    clearTimeout(timeout || 0);
    timeout = setTimeout(later, wait);
  };
}
