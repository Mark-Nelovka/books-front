import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootStore } from "./store";

export const useAppDispatch = () => useDispatch<any>();
export const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;
