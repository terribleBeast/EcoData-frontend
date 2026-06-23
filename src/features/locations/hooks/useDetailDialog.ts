import { useGetCountriesQuery } from "@/api/endpoints";
import { useSuccessNavigation } from "@/shared/hooks/useFormCallback";
import type { IAddressDataFull } from "@/shared/types/location";
import { useNavigate } from "react-router";
import { useLocationsCrud } from "./useLocationsState";

export const useDetailDialog = () => {
  const navigate = useNavigate();

  const { create, update, mutationsState } = useLocationsCrud();

  const onSuccess = useSuccessNavigation(() => navigate(".."), 1000);

  const { data: countries = [] } = useGetCountriesQuery();

  const handleCreateAddress = async (data: IAddressDataFull) => {
    try {
      await create(data);
      onSuccess();
    } catch {
      // FormTemplate shows the error via endpointState.isError
    }
  };
  const handleEditAddress = async (data: IAddressDataFull) => {
    try {
      await update(data);
      onSuccess();
    } catch {
      // FormTemplate shows the error via endpointState.isError
    }
  };
  return {
    countries,
    handleCreateAddress,
    handleEditAddress,
    mutationsState,
  };
};
