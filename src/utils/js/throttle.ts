export default (callback: Function, delay = 250) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let waitingArgs: any[] | null = null;

  return (...args: any[]) => {
    if (timer) {
      waitingArgs = args;
      return;
    }
    callback(...args);
    timer = setTimeout(() => {
      timer = null;
      if (waitingArgs) {
        callback(...waitingArgs);
        waitingArgs = null;
      }
    }, delay);
  };
};
