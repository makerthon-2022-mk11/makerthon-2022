export const formatLink = (link: string): string => {
  if (
    link.length < 7 ||
    (link.substring(0, 7) !== 'http://' && link.substring(0, 8) !== 'https://')
  ) {
    return 'http://' + link;
  }

  return link;
};
