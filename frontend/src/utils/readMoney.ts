export default function readMoney(money: string) {
  return roundTwoDigits(parseFloat(money.replace(/,/, ".")));
}

export function roundTwoDigits(num: number) {
  return Math.floor((num + 1e-6) * 100) / 100;
}
