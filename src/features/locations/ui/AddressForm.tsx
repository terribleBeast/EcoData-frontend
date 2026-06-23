import type { IAddressDataFull, ICountry } from "@/shared/types/location";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import FormPage from "@/shared/components/FormPage";
import type { IEndpointState } from "@/shared/types/form";
import { EntityForm } from "@/shared/ui/EntityForm";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  useGetRegionsQuery,
  useGetDistrictsQuery,
  useGetSettlementsQuery,
  useGetStreetsQuery,
} from "@/api/endpoints";
import { useState } from "react";

// Form values extend the address DTO with cascading FK fields
type AddressFormValues = IAddressDataFull & {
  country_id: number;
  region_id: number;
  district_id: number;
  settlement_id: number;
  street_id: number;
};

interface IAddressFormProps {
  title: string;
  submitLabel: string;
  submitLoadingLabel: string;
  countries: ICountry[];
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
  const {
    control,
    handleSubmit,
  } = useForm<AddressFormValues>({
    mode: "onBlur",
    reValidateMode: "onSubmit",
    defaultValues: initialData ?? { house_number_id: 0, street_settlement_association_id: 0 },
  });

  // Cascading state
  const [countryId, setCountryId] = useState<number | null>(null);
  const [regionId, setRegionId] = useState<number | null>(null);
  const [districtId, setDistrictId] = useState<number | null>(null);
  const [settlementId, setSettlementId] = useState<number | null>(null);

  const { data: regions = [] } = useGetRegionsQuery(countryId ?? 0, {
    skip: countryId === null,
  });
  const { data: districts = [] } = useGetDistrictsQuery(regionId ?? 0, {
    skip: regionId === null,
  });
  const { data: settlements = [] } = useGetSettlementsQuery(districtId ?? 0, {
    skip: districtId === null,
  });
  const { data: streets = [] } = useGetStreetsQuery(settlementId ?? 0, {
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
                  setCountryId(Number(e.target.value));
                  setRegionId(null);
                  setDistrictId(null);
                  setSettlementId(null);
                }}
              >
                {countries.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
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
                  setRegionId(Number(e.target.value));
                  setDistrictId(null);
                  setSettlementId(null);
                }}
              >
                {regions.map((r) => (
                  <MenuItem key={r.id} value={r.id}>
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
                  setDistrictId(Number(e.target.value));
                  setSettlementId(null);
                }}
              >
                {districts.map((d) => (
                  <MenuItem key={d.id} value={d.id}>
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
                  setSettlementId(Number(e.target.value));
                }}
              >
                {settlements.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
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
