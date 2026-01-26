export default function dateFormatFR(input) {
  if (!input) return "";
  return new Intl.DateTimeFormat("fr-FR").format(new Date(input));
}
