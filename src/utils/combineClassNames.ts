export function cx(...classNames: (string | undefined)[]) {
  return classNames.filter(Boolean).join(' ');
}
