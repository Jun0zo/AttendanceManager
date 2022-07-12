function zeroFormat(number_or_string) {
  const n = Number(number_or_string);
  return n > 10 ? String(n) : '0' + String(n);
}

export function dateFormat(date_object, format_string) {
  const year = date_object.getFullYear();
  const month = date_object.getMonth() + 1;
  const date = date_object.getDate();

  if (format_string === 'MM') {
    return zeroFormat(month);
  }

  if (format_string === 'M') {
    return month;
  }

  if (format_string === 'YYYY-MM-DD') {
    return [String(year), zeroFormat(month), zeroFormat(date)].join('-');
  }

  if (format_string === 'YYYY-MM') {
    return [String(year), zeroFormat(month)].join('-');
  }
}
