import * as Types from '../../types';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { axiosRequest } from '@/configs/axiosConfigs';
export type SignUpMutationVariables = Types.Exact<{
  data: Types.SignupInput;
}>;


export type SignUpMutation = { signUp: boolean };


export const SignUpDocument = `
    mutation signUp($data: SignupInput!) {
  signUp(data: $data)
}
    `;
export const useSignUpMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SignUpMutation, TError, SignUpMutationVariables, TContext>) =>
    useMutation<SignUpMutation, TError, SignUpMutationVariables, TContext>(
      ['signUp'],
      axiosRequest<SignUpMutation, SignUpMutationVariables>(SignUpDocument),
      options
    );