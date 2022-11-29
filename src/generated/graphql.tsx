import { gql } from '@apollo/client';
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
};

export type CreateScopeInput = {
  description: Scalars['String'];
  title: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  scopeId: Scalars['Int'];
  username: Scalars['String'];
};

export type DeleteScopeResult = {
  __typename?: 'DeleteScopeResult';
  rowsAffected: Scalars['Int'];
  success: Scalars['Boolean'];
};

export type DeleteUserResult = {
  __typename?: 'DeleteUserResult';
  rowsAffected: Scalars['Int'];
  success: Scalars['Boolean'];
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createScope: Scope;
  createUser: User;
  deleteScope: DeleteScopeResult;
  deleteUser: DeleteUserResult;
  loginUser: ValidLoginResult;
  refreshUser: ValidLoginResult;
};


export type MutationCreateScopeArgs = {
  input: CreateScopeInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteScopeArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationLoginUserArgs = {
  input: LoginInput;
};


export type MutationRefreshUserArgs = {
  input: RefreshInput;
};

export type Query = {
  __typename?: 'Query';
  getUserById?: Maybe<User>;
  getUsers: Array<User>;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Int'];
};

export type RefreshInput = {
  refresh: Scalars['String'];
};

export type Scope = {
  __typename?: 'Scope';
  description: Scalars['String'];
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  password: Scalars['String'];
  scopeId: Scalars['Int'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type ValidLoginResult = {
  __typename?: 'ValidLoginResult';
  access: Scalars['String'];
  refresh: Scalars['String'];
};
