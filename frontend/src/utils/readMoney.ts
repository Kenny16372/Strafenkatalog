export default function readMoney(money: string) {
  return moneyInCents(parseFloat(money.replace(/,/, ".")));
}

export function moneyInCents(amount: number) {
  return roundTwoDigits(amount) * 100;
}

export function roundTwoDigits(num: number) {
  return Math.floor((num + 1e-6) * 100) / 100;
}
