export default (count, singularWord) => {
  const text = `${count} ${singularWord}`;
  if (count > 1) {
    return text + "s";
  }
  return text;
};
