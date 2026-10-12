import { minorUnitDigits } from "./currency.ts";

export type Line = { amount: number };
export function formatTotal(lines: Line[], currency: string): string {
	const sum = lines.reduce((total, line) => total + line.amount, 0);
	return sum.toFixed(minorUnitDigits(currency));
}
