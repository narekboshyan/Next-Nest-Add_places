import * as Types from '../../types';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { axiosRequest } from '@/configs/axiosConfigs';
export type SigninMutationVariables = Types.Exact<{
  data: Types.SigninDto;
}>;


export type SigninMutation = { signIn: { id: number, fullName: string, email: string } };


export const SigninDocument = `
    mutation signin($data: SigninDTO!) {
  signIn(data: $data) {
    id
    fullName
    email
  }
}
    `;
export const useSigninMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SigninMutation, TError, SigninMutationVariables, TContext>) =>
    useMutation<SigninMutation, TError, SigninMutationVariables, TContext>(
      ['signin'],
      axiosRequest<SigninMutation, SigninMutationVariables>(SigninDocument),
      options
    );