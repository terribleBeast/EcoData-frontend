import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootStateType } from "@/app/store";
import type {
  TokenResponse,
  ResearcherProfileResponse,
} from "@/shared/types/user";
import type { IResearcherDataFull } from "@/shared/types/researcher";
import { userEndpoints } from "@/api/endpoints";
import { researcherEndpoints } from "@/api/endpoints";

interface AuthState {
  me: ResearcherProfileResponse | null;
  token: string | null;
  researcher: IResearcherDataFull | null;
}

const initialState: AuthState = {
  me: null,
  token: localStorage.getItem("userToken"),
  researcher: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    userLoggedOut(state) {
      state.me = null;
      state.token = null;
      state.researcher = null;
      localStorage.removeItem("userToken");
    },
    setMe: (state, { payload }: PayloadAction<ResearcherProfileResponse>) => {
      state.me = payload;
    },
    setResearcher: (state, { payload }: PayloadAction<IResearcherDataFull>) => {
      state.researcher = payload;
    },
  },
  extraReducers: (builder) => {
    // Login fulfilled → store token
    builder.addMatcher(
      userEndpoints.endpoints.login.matchFulfilled,
      (state, { payload }: PayloadAction<TokenResponse>) => {
        state.token = payload.access_token;
        localStorage.setItem("userToken", payload.access_token);
      },
    );
    // getMe fulfilled → store current researcher profile
    builder.addMatcher(
      userEndpoints.endpoints.getMe.matchFulfilled,
      (state, { payload }: PayloadAction<ResearcherProfileResponse>) => {
        state.me = payload;
        // Also populate researcher with the same data (it's the combined table)
        state.researcher = {
          entity_id: payload.researcher_id,
          researcher_id: payload.researcher_id,
          email: payload.email,
          first_name: payload.first_name,
          last_name: payload.last_name,
          is_active: payload.is_active,
          system_role: payload.system_role ?? null,
          phone: payload.phone,
          orcid_link: payload.orcid_link,
          job: payload.job ?? null,
          organization: payload.organization ?? null,
          created_at: payload.created_at,
        };
      },
    );
    // getResearcherById → sync researcher
    builder.addMatcher(
      researcherEndpoints.endpoints.getResearcherById.matchFulfilled,
      (state, { payload }: PayloadAction<IResearcherDataFull>) => {
        if (state.me && payload.researcher_id === state.me.researcher_id) {
          state.researcher = payload;
        }
      },
    );
  },
});

export const selectCurrentUser = (state: RootStateType) => state.auth.me;
export const selectResearcher = (state: RootStateType) => state.auth.researcher;
export const selectIsAuthenticated = (state: RootStateType): boolean =>
  state.auth.token !== null;
export const { userLoggedOut, setMe, setResearcher } = authSlice.actions;

export default authSlice.reducer;
