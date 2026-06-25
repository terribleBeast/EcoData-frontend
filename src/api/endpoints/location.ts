import type {
  IAddressData,
  CountryResponse,
  RegionResponse,
  DistrictResponse,
  SettlementResponse,
  IStreet,
  ISettlementType,
} from "@/shared/types/location";

// ── Local type alias for address responses ──
// API returns flat IAddressData; this alias documents the read shape.
type IAddressDataFull = IAddressData;
import { apiSlice } from "../apiSlice";

export const locationEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Main entity – addresses
    getAddresses: builder.query<IAddressDataFull[], void>({
      query: () => "/locations",
      transformResponse: (response: { data: IAddressDataFull[] }) =>
        response.data,
      providesTags: [{ type: "Locations", id: "LIST" }],
    }),
    getAddressById: builder.query<IAddressDataFull, string>({
      query: (id) => `/locations/${id}`,
      transformResponse: (response: { data: IAddressDataFull }) =>
        response.data,
      providesTags: (response, error, arg) => [{ type: "Locations", id: arg }],
    }),

    // Lookup dictionaries
    getCountries: builder.query<CountryResponse[], void>({
      query: () => "/locations/countries",
      transformResponse: (response: { data: CountryResponse[] }) =>
        response.data,
    }),
    getRegions: builder.query<RegionResponse[], string>({
      query: (countryId) => `/locations/regions?country_id=${countryId}`,
      transformResponse: (response: { data: RegionResponse[] }) =>
        response.data,
    }),
    getDistricts: builder.query<DistrictResponse[], string>({
      query: (regionId) => `/locations/districts?region_id=${regionId}`,
      transformResponse: (response: { data: DistrictResponse[] }) =>
        response.data,
    }),
    getSettlements: builder.query<SettlementResponse[], string>({
      query: (districtId) => `/locations/settlements?district_id=${districtId}`,
      transformResponse: (response: { data: SettlementResponse[] }) =>
        response.data,
    }),
    getStreets: builder.query<IStreet[], string>({
      query: (settlementId) =>
        `/locations/streets?settlement_id=${settlementId}`,
      transformResponse: (response: { data: IStreet[] }) => response.data,
    }),
    getSettlementTypes: builder.query<ISettlementType[], void>({
      query: () => "/locations/settlement-types",
      transformResponse: (response: { data: ISettlementType[] }) =>
        response.data,
    }),

    // Mutations
    createAddress: builder.mutation<void, IAddressDataFull>({
      query: (address) => ({
        url: "/locations",
        method: "POST",
        body: address,
      }),
      invalidatesTags: ["Locations"],
    }),
    editAddress: builder.mutation<IAddressDataFull, Partial<IAddressDataFull>>({
      query: (address) => ({
        url: `/locations/${address.id}`,
        method: "PATCH",
        body: address,
      }),
      invalidatesTags: (address) => [{ type: "Locations", id: address?.id }],
    }),
    deleteAddress: builder.mutation<void, string>({
      query: (id) => ({
        url: `/locations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Locations", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useLazyGetAddressesQuery,
  useGetAddressByIdQuery,
  useLazyGetAddressByIdQuery,
  useGetCountriesQuery,
  useGetRegionsQuery,
  useGetDistrictsQuery,
  useGetSettlementsQuery,
  useGetStreetsQuery,
  useGetSettlementTypesQuery,
  useCreateAddressMutation,
  useEditAddressMutation,
  useDeleteAddressMutation,
} = locationEndpoints;
