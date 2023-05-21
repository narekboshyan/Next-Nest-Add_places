export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Timestamp: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  signIn: User;
  signUp: Scalars['Boolean'];
};


export type MutationSignInArgs = {
  data: SigninDto;
};


export type MutationSignUpArgs = {
  data: SignupInput;
};

export type Query = {
  __typename?: 'Query';
  testing: Scalars['Boolean'];
};

export type SigninDto = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignupInput = {
  email: Scalars['String'];
  fullName: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Timestamp'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['Int'];
  image: Scalars['String'];
  password: Scalars['String'];
  updatedAt: Scalars['Timestamp'];
};
