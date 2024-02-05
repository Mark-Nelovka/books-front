import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootStore } from "./store";

export const useAppDispatch = () => useDispatch<any>();
export const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;

export enum RequestMethods {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    PUT = 'PUT'
}
