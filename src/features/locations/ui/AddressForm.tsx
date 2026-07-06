import type { IAddressDataFull } from "../types";
import type { CountryResponse } from "@/shared/types/location";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import FormPage from "@/shared/components/FormPage";
import type { IEndpointState } from "@/shared/types/form";
import { EntityForm } from "@/shared/ui/EntityForm";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {
  useGetRegionsQuery,
  useGetDistrictsQuery,
  useGetSettlementsQuery,
  useGetStreetsQuery,
} from "@/api/endpoints";
import { useState } from "react";

// Form values extend the address DTO with cascading FK fields
type AddressFormValues = IAddressDataFull & {
  country_id: string;
  region_id: string;
  district_id: string;
  settlement_id: string;
  street_id: string;
};

interface IAddressFormProps {
  title: string;
  submitLabel: string;
  submitLoadingLabel: string;
  countries: CountryResponse[];
  initialData?: IAddressDataFull;
  onSubmit: SubmitHandler<AddressFormValues>;
  endpointState: IEndpointState;
}

export const AddressForm = ({
  initialData,
  submitLabel,
  submitLoadingLabel,
  title,
  onSubmit,
  endpointState,
  countries,
}: IAddressFormProps) => {
  const { control, handleSubmit } = useForm<AddressFormValues>({
    mode: "onBlur",
    reValidateMode: "onSubmit",
    defaultValues: initialData ?? {
      house_number_id: "",
      street_id: "",
      settlement_id: "",
    },
  });

  // Cascading state
  const [countryId, setCountryId] = useState<string | null>(null);
  const [regionId, setRegionId] = useState<string | null>(null);
  const [districtId, setDistrictId] = useState<string | null>(null);
  const [settlementId, setSettlementId] = useState<string | null>(null);

  const { data: regions = [] } = useGetRegionsQuery(countryId ?? "", {
    skip: countryId === null,
  });
  const { data: districts = [] } = useGetDistrictsQuery(regionId ?? "", {
    skip: regionId === null,
  });
  const { data: settlements = [] } = useGetSettlementsQuery(districtId ?? "", {
    skip: districtId === null,
  });
  const { data: streets = [] } = useGetStreetsQuery(settlementId ?? "", {
    skip: settlementId === null,
  });

  return (
    <FormPage>
      <EntityForm
        title={title}
        submitLabel={submitLabel}
        submitLoadingLabel={submitLoadingLabel}
        endpointState={endpointState}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="country_id"
          rules={{ required: "Страна обязательна" }}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth error={!!error}>
              <InputLabel>Страна</InputLabel>
              <Select
                {...field}
                label="Страна"
                onChange={(e) => {
                  field.onChange(e);
                  setCountryId(e.target.value);
                  setRegionId(null);
                  setDistrictId(null);
                  setSettlementId(null);
                }}
              >
                {countries.map((c) => (
                  <MenuItem key={c.country_id} value={c.country_id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="region_id"
          rules={{ required: "Регион обязателен" }}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth error={!!error} disabled={!countryId}>
              <InputLabel>Регион</InputLabel>
              <Select
                {...field}
                label="Регион"
                onChange={(e) => {
                  field.onChange(e);
                  setRegionId(e.target.value);
                  setDistrictId(null);
                  setSettlementId(null);
                }}
              >
                {regions.map((r) => (
                  <MenuItem key={r.region_id} value={r.region_id}>
                    {r.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="district_id"
          rules={{ required: "Район обязателен" }}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth error={!!error} disabled={!regionId}>
              <InputLabel>Район</InputLabel>
              <Select
                {...field}
                label="Район"
                onChange={(e) => {
                  field.onChange(e);
                  setDistrictId(e.target.value);
                  setSettlementId(null);
                }}
              >
                {districts.map((d) => (
                  <MenuItem key={d.district_id} value={d.district_id}>
                    {d.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="settlement_id"
          rules={{ required: "Нас. пункт обязателен" }}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth error={!!error} disabled={!districtId}>
              <InputLabel>Населённый пункт</InputLabel>
              <Select
                {...field}
                label="Населённый пункт"
                onChange={(e) => {
                  field.onChange(e);
                  setSettlementId(e.target.value);
                }}
              >
                {settlements.map((s) => (
                  <MenuItem key={s.settlement_id} value={s.settlement_id}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="street_id"
          rules={{ required: "Улица обязательна" }}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth error={!!error} disabled={!settlementId}>
              <InputLabel>Улица</InputLabel>
              <Select {...field} label="Улица">
                {streets.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      </EntityForm>
    </FormPage>
  );
};
