export const limitDisplayedTextLength = (text: string, textLength: number) => {
  if (text.length > textLength) {
    return text.slice(0, textLength) + "...";
  } else {
    return text;
  }
};
