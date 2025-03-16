export function getHistory(ticker: string) {
  if (!localStorage.getItem(ticker)) {
    return;
  }

  return JSON.parse(localStorage.getItem(ticker)!);
}

export function saveHistory(ticker: string) {
    localStorage.setItem()
}