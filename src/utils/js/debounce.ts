export default function debounce<T,>(func: (...args: any[]) => T, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null;

  return async (...args: any[]) : Promise<T> => {
    const later = (
      resolve: (value : T) => void,
      reject: (reason?: any) => void
    ) : void => {
      try {
        timeout = null;
        resolve(func(...args));
        return;
      } catch (err) {
        reject(err);
        return;
      }
    };
    clearTimeout(timeout || 0);
    // ! returning a promise form async function, await will be redundant !
    return new Promise((resolve: (value: T) => void, reject) => {
      timeout = setTimeout(() => later(resolve, reject), wait);
    });
  };
}
