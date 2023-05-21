"use client";
import React, { useState, useContext, useCallback, useMemo } from "react";

import Card from "@/components/atoms/Card";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ErrorModal from "@/components/molecules/ErrorModal";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import ImageUpload from "@/components/molecules/ImageUpload";
import {
 VALIDATOR_EMAIL,
 VALIDATOR_MINLENGTH,
 VALIDATOR_REQUIRE,
} from "@/util/validators";
import { useForm } from "@/hooks/form-hook";
import { AuthContext } from "@/context/auth-context";
import { ChangeEventHandler, FormEventHandler } from "react";
import { useHttpClient } from "@/hooks/http-hook";
import { useSignUpMutation } from "@/graphql/mutations/generated/signupMutation.generated";
import { useSigninMutation } from "@/graphql/mutations/generated/signinMutation.generated";

const Auth = () => {
 const [isLoginMode, setIsLoginMode] = useState<boolean>(true);

 const [formState, inputHandler, setFormData]: Array<any> = useForm(
  {
   email: {
    value: "",
    isValid: false,
   },
   password: {
    value: "",
    isValid: false,
   },
  },
  false
 );

 const switchModeHandler = useCallback(() => {
  if (!isLoginMode) {
   setFormData(
    {
     ...formState.inputs,
     fullName: {
      value: "",
      isValid: false,
     },
     image: {
      value: "",
      isValid: false,
     },
    },
    formState.inputs.email.isValid && formState.inputs.password.isValid
   );
  } else {
   setFormData(
    {
     ...formState.inputs,
     fullName: {
      value: "",
      isValid: false,
     },
     image: {
      value: "",
      isValid: false,
     },
    },
    false
   );
  }
  setIsLoginMode((prevMode) => !prevMode);
 }, [formState.inputs, isLoginMode, setFormData]);

 console.log(formState, "formState");

 const { mutate: signUp, isLoading: signUpIsLoading } = useSignUpMutation({
  onSuccess: () => switchModeHandler(),
 });

 const { mutate: signin, isLoading: signIsLoading } = useSigninMutation({
  onSuccess: (res) => {
   console.log(res, "RES");
  },
 });

 const authSubmitHandler: FormEventHandler<HTMLFormElement> = useCallback(
  async (event): Promise<void> => {
   event.preventDefault();

   if (isLoginMode) {
    console.log("Signing in");
    const email = formState.inputs.email.value;
    const password = formState.inputs.password.value;

    signin({ data: { email, password } });
   } else {
    console.log(formState, "formState");
    signUp({
     data: {
      fullName: formState.inputs.fullName.value,
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
     },
    });
   }
  },
  [formState, isLoginMode, signUp]
 );

 const isLoading = useMemo(
  () => signIsLoading || signUpIsLoading,
  [signIsLoading, signUpIsLoading]
 );

 return (
  <React.Fragment>
   <Card className="authentication">
    {isLoading && <LoadingSpinner asOverlay />}
    <h2>Login Required</h2>
    <hr />
    <form onSubmit={authSubmitHandler}>
     {!isLoginMode && (
      <Input
       element="input"
       id="fullName"
       type="text"
       label="Your Full Name"
       validators={[VALIDATOR_REQUIRE()]}
       errorText="Please enter full name."
       onInput={inputHandler}
      />
     )}
     {!isLoginMode && (
      <ImageUpload
       center
       id="image"
       onInput={inputHandler}
       errorText="Please provide an image."
      />
     )}
     <Input
      element="input"
      id="email"
      type="email"
      label="E-Mail"
      validators={[VALIDATOR_EMAIL()]}
      errorText="Please enter a valid email address."
      onInput={inputHandler}
     />
     <Input
      element="input"
      id="password"
      type="password"
      label="Password"
      validators={[VALIDATOR_MINLENGTH(6)]}
      errorText="Please enter a valid password, at least 6 characters."
      onInput={inputHandler}
     />
     <Button type="submit" disabled={!formState.isValid}>
      {isLoginMode ? "LOGIN" : "SIGNUP"}
     </Button>
    </form>
    <Button inverse onClick={switchModeHandler}>
     SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
    </Button>
   </Card>
  </React.Fragment>
 );
};

export default Auth;
