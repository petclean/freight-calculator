import { WEIGHTS, CORREIOS_WEIGHT_TO_PRICE } from "../const";

export const calcTotalWeight = ({ refils, dispensers }) =>
  refils * WEIGHTS.REFIL + dispensers * WEIGHTS.DISPENSER;

export const calcFreightPrice = ({ refils, dispensers }) => {
  const totalWeight = calcTotalWeight({ refils, dispensers });

  let price;
  if (totalWeight === 0) {
    return;
  } else if (totalWeight >= 10000) {
    price =
      CORREIOS_WEIGHT_TO_PRICE[10000] +
      (Math.floor((totalWeight - 10000) / 1000) + 1) *
        CORREIOS_WEIGHT_TO_PRICE.ADDTL;
  } else {
    const weightIdx = (Math.floor(totalWeight / 1000) + 1) * 1000;
    price = CORREIOS_WEIGHT_TO_PRICE[weightIdx];
  }

  return Math.floor(price) + 1;
};
