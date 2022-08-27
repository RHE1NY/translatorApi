import {TypedUseSelectorHook, useSelector} from "react-redux";
import {store} from "./store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type RootState = ReturnType<typeof store.getState>;
