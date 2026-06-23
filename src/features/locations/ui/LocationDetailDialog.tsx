import { GenericEntityDetailDialog } from "@/shared/ui/GenericEntityDetailDialog";
import { AddressFullInfo } from "../components/AddressFullInfo";
import { AddressForm } from "./AddressForm";
import { useDetailDialog } from "../hooks/useDetailDialog";
import { type DetailDialogModeType, getDialogType } from "@/shared/utils";
import { useLocation, useParams } from "react-router";
import { useAddressDetail } from "../hooks/useAddressDetail";
import type { IAddressDataFull } from "@/shared/types/location";

const LocationDetailDialog = () => {
  const { handleCreateAddress, handleEditAddress, countries, mutationsState } =
    useDetailDialog();

  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();

  const dialogType: DetailDialogModeType = getDialogType(pathname);
  const { addressQuery } = useAddressDetail(id ? Number(id) : -1);

  return (
    <GenericEntityDetailDialog<IAddressDataFull>
      mode={dialogType}
      data={addressQuery.data}
      maxWidth="sm"
      state={{
        isLoading: addressQuery.isLoading,
        isError: addressQuery.isError,
        error: addressQuery.error,
      }}
      renderRead={(address) => <AddressFullInfo address={address} />}
      renderCreate={() => (
        <AddressForm
          onSubmit={handleCreateAddress}
          endpointState={{
            ...mutationsState.create,
            successMsg: "Адрес создан",
          }}
          countries={countries}
          title="Создание адреса"
          submitLabel="Создать"
          submitLoadingLabel="Создание..."
        />
      )}
      renderEdit={(detail) => (
        <AddressForm
          onSubmit={handleEditAddress}
          countries={countries}
          endpointState={{
            ...mutationsState.update,
            successMsg: "Данные изменены",
          }}
          title="Редактирование адреса"
          submitLabel="Изменить"
          submitLoadingLabel="Изменение..."
          initialData={detail}
        />
      )}
    />
  );
};
export default LocationDetailDialog;
