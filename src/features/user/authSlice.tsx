import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootStateType } from "@/app/store";
import type { IAuthUser } from "@/shared/types/user";
import { userEndpoints } from "@/api/endpoints";

interface AuthState {
  user: IAuthUser | null;
  token: string | null;
}

const initialState: AuthState = {
  // user: {
  //   id: 1,
  //   email: "kovalenko@gmail.com",
  //   name: "Иван",
  //   surname: "Иванов",
  //   patronymic: "Иванович",
  //   token: "1234",
  // },
  // token: "1234",
  user: null,
  token: localStorage.getItem("userToken"),
};
export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    userLoggedOut(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("userToken");
    },
    setCredentials: (state, { payload }: { payload: IAuthUser }) => {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userEndpoints.endpoints.login.matchFulfilled,
      (state, { payload }: PayloadAction<IAuthUser>) => {
        console.log(payload);
        state.user = payload;
        state.token = payload.token;
        localStorage.setItem("userToken", payload.token ?? "");
      },
    );
    builder.addMatcher(
      userEndpoints.endpoints.createResearcher.matchFulfilled,
      (state, { payload }: PayloadAction<IAuthUser>) => {
        state.user = payload;
        state.token = payload.token;
        localStorage.setItem("userToken", payload.token ?? "");
      },
    );
  },
});

export const selectUserInfo = (state: RootStateType) => state.auth.user;
export const selectIsAuthenticated = (state: RootStateType): boolean =>
  state.auth.token !== null;
export const { userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
