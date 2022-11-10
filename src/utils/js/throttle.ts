export default function throttle(func: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null;
  let context: any;
  let args: any[] | null;

  const later = () => {
    timeout = null;
    if (args) {
      func.apply(context, args);
    }
    context = args = null;
  };

  return function executedFunction(this: any, ...args: any[]) {
    if (!timeout) {
      timeout = setTimeout(later, wait);
      context = this;
      args = args;
    }
  };
}
