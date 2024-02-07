import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootStore } from "./store";
import { useState } from "react";

export const useAppDispatch = () => useDispatch<any>();
export const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;

export enum RequestMethods {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    PUT = 'PUT'
}

interface LoadersState {
    getLoader: boolean;
    postLoader: boolean;
    updateLoader: boolean;
    removeLoader: boolean;
  }

export default function useLoaders(): [LoadersState, (methods?: RequestMethods) => void] {
    const [loaders, setLoaders] = useState({
        getLoader: false,
        postLoader: false,
        updateLoader: false,
        removeLoader: false,
    })

    const changeLoaders = (methods?: RequestMethods) => {
        switch (methods) {
            case RequestMethods.GET:
                setLoaders((prevState) => {return {...prevState, getLoader: true}})
                break;
                
            case RequestMethods.POST:
                setLoaders((prevState) => {return {...prevState, postLoader: true}})
                break;

            case RequestMethods.DELETE:
                setLoaders((prevState) => {return {...prevState, removeLoader: true}})
                break;

            case RequestMethods.PATCH:
                setLoaders((prevState) => {return {...prevState, updateLoader: true}})
                break;

            case RequestMethods.PUT:
                setLoaders((prevState) => {return {...prevState, updateLoader: true}})
                break;
        
            default:
                setLoaders({
                        getLoader: false,
                        postLoader: false,
                        updateLoader: false,
                        removeLoader: false
                      })
                break;
        }
    }
    
    return [loaders, changeLoaders];
}
