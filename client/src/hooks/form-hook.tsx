import { useCallback, useReducer } from "react";

type InputValidity = {
 value: string;
 isValid: boolean;
};

type State = {
 inputs: Record<string, InputValidity>;
 isValid: boolean;
};

type Action =
 | { type: "INPUT_CHANGE"; value: string; isValid: boolean; inputId: string }
 | {
    type: "SET_DATA";
    inputs: Record<string, InputValidity>;
    formIsValid: boolean;
   };

const formReducer = (state: State, action: Action) => {
 switch (action.type) {
  case "INPUT_CHANGE":
   let formIsValid = true;
   for (const inputId in state.inputs) {
    if (!state.inputs[inputId]) {
     continue;
    }
    if (inputId === action.inputId) {
     formIsValid = formIsValid && action.isValid;
    } else {
     formIsValid = formIsValid && state.inputs[inputId].isValid;
    }
   }
   return {
    ...state,
    inputs: {
     ...state.inputs,
     [action.inputId]: { value: action.value, isValid: action.isValid },
    },
    isValid: formIsValid,
   };
  case "SET_DATA":
   return {
    inputs: action.inputs,
    isValid: action.formIsValid,
   };
  default:
   return state;
 }
};

export const useForm = (
 initialInputs: Record<string, InputValidity>,
 initialFormValidity: boolean
) => {
 const [formState, dispatch] = useReducer(formReducer, {
  inputs: initialInputs,
  isValid: initialFormValidity,
 });

 const inputHandler = useCallback(
  (id: string, value: string, isValid: boolean) => {
   console.log("WORKING DOWNLOADING");
   dispatch({
    type: "INPUT_CHANGE",
    value,
    isValid,
    inputId: id,
   });
  },
  []
 );

 const setFormData = useCallback(
  (inputData: Record<string, InputValidity>, formValidity: boolean) => {
   dispatch({
    type: "SET_DATA",
    inputs: inputData,
    formIsValid: formValidity,
   });
  },
  []
 );

 return [formState, inputHandler, setFormData];
};
