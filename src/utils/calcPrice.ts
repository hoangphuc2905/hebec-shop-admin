export const calcDiscountPercent = (unitPrice: number, finalPrice: number) => {
  return Math.round(100 - (finalPrice / unitPrice) * 100 || 0);
};

export const getFinalPrice = (unitPrice: number, percent: number) => {
  return Math.round(unitPrice * ((100 - percent) / 100));
};
