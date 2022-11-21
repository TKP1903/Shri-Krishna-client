export default (initVal: any) => {
  let oldVal : typeof initVal = initVal;
  return (newVal: any) => {
    if (oldVal == newVal) {
      return false;
    }
    oldVal = newVal;
    return true;
  };
};
