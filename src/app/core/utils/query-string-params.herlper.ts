export function generateQueryStringParamsUrl(params: { [key: string]: any }) {
  return (
    '?' +
    Object.keys(params)
      .map((key) => `${key}=${params[key]}&`)
      .join('')
  );
}
