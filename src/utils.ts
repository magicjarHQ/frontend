export function midEllipsis(input: string, maxLength: number): string {
  /* Source: https://github.com/PostHog/posthog */
  /* Truncates a string (`input`) in the middle.
  `maxLength` represents the desired maximum length of the output string excluding the ... */
  if (input.length <= maxLength) {
    return input;
  }

  const middle = Math.ceil(input.length / 2);
  const excess = Math.ceil((input.length - maxLength) / 2);
  return `${input.substring(0, middle - excess)}...${input.substring(
    middle + excess
  )}`;
}
