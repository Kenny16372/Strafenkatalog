export default function readMoney(money: string) {
  console.log(money);

  const result = moneyInCents(parseFloat(money.replace(/,/, ".")));
  console.log(result);

  return result;
}

export function moneyInCents(amount: number) {
  return roundTwoDigits(amount) * 100;
}

export function roundTwoDigits(num: number) {
  return Math.floor((num + 1e-6) * 100) / 100;
}
