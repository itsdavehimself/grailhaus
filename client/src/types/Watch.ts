export type Watch = {
  id: number;
  brand: string;
  model: string;
  name: string;
  reference: string;
  specs: {
    caseSizeMm: number;
    lugToLugMm: number;
    thicknessMm: number;
    caseMaterial: string;
    crystal: string;
    waterResistanceM: number;
  };
  movement: {
    type: string;
    name: string;
    powerReserveHours: number | null;
  };
  bracelet: string;
  dialColor: string;
  priceUsd: number;
  imageUrl: string;
};
