// Minor-unit lookup for invoice currencies. ISO 4217 currencies carry a fixed
// number of minor-unit digits (USD 2, KWD 3, JPY 0), and a printed total must
// carry the same number of decimals as the currency's own format. The digits
// come from how ICU actually formats one unit of the currency, and each code
// is resolved once and remembered.
const digitsByCode = new Map<string, number>();

export function minorUnitDigits(currency: string): number {
	const known = digitsByCode.get(currency);
	if (known !== undefined) return known;
	const fraction = new Intl.NumberFormat("en", { style: "currency", currency })
		.formatToParts(1)
		.find((part) => part.type === "fraction");
	const digits = fraction ? fraction.value.length : 0;
	digitsByCode.set(currency, digits);
	return digits;
}
