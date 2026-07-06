import type {
  IAddressData,
  ICountry,
  IRegion,
  IDistrict,
  ISettlement,
  IStreet,
  ISettlementType,
  IHouseNumber,
} from "@/shared/types/location";

/** Full address shape returned by the API (flat — no nested embeds). */
export type IAddressDataFull = IAddressData;

export type ISelectedAddress = IAddressDataFull;

// Re-export shared types for convenience in the locations feature
export type {
  ICountry,
  IRegion,
  IDistrict,
  ISettlement,
  IStreet,
  ISettlementType,
  IHouseNumber,
};
