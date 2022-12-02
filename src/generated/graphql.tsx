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

export type AddQuestionInput = {
  a1: Scalars['String'];
  a2: Scalars['String'];
  answer: Scalars['String'];
  category: Scalars['String'];
  explanation: Scalars['String'];
  question: Scalars['String'];
};

export type AnswerQuestionInput = {
  answer: Scalars['String'];
  questionId: Scalars['Int'];
  token: Scalars['String'];
};

export type AnswerQuestionResult = {
  __typename?: 'AnswerQuestionResult';
  success: Scalars['Boolean'];
};

export type CreateNoteInput = {
  text: Scalars['String'];
  title: Scalars['String'];
};

export type CreateScopeInput = {
  description: Scalars['String'];
  title: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  scopeId: Scalars['Int'];
  username: Scalars['String'];
};

export type DeleteNoteResult = {
  __typename?: 'DeleteNoteResult';
  rowsAffected: Scalars['Int'];
  success: Scalars['Boolean'];
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

export type Game = {
  __typename?: 'Game';
  health: Scalars['Int'];
  id: Scalars['Int'];
  userId: Scalars['Int'];
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addQuestion: Questions;
  answerQuestion: AnswerQuestionResult;
  createNote: Note;
  createScope: Scope;
  createUser: User;
  deleteNote: DeleteNoteResult;
  deleteScope: DeleteScopeResult;
  deleteUser: DeleteUserResult;
  loginUser: ValidLoginResult;
  refreshUser: ValidLoginResult;
  startGame: Game;
};


export type MutationAddQuestionArgs = {
  input: AddQuestionInput;
};


export type MutationAnswerQuestionArgs = {
  input: AnswerQuestionInput;
};


export type MutationCreateNoteArgs = {
  input: CreateNoteInput;
};


export type MutationCreateScopeArgs = {
  input: CreateScopeInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteNoteArgs = {
  id: Scalars['Int'];
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


export type MutationStartGameArgs = {
  input: StartGameInput;
};

export type Note = {
  __typename?: 'Note';
  id: Scalars['Int'];
  text: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getGameByUserId?: Maybe<Game>;
  getNoteById?: Maybe<Note>;
  getNotes: Array<Note>;
  getQuestionById?: Maybe<Questions>;
  getRandomQuestion?: Maybe<Questions>;
  getUserById?: Maybe<User>;
  getUsers: Array<User>;
};


export type QueryGetGameByUserIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetNoteByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetQuestionByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Int'];
};

export type Questions = {
  __typename?: 'Questions';
  a1: Scalars['String'];
  a2: Scalars['String'];
  answer: Scalars['String'];
  category: Scalars['String'];
  explanation: Scalars['String'];
  id: Scalars['Int'];
  question: Scalars['String'];
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

export type StartGameInput = {
  token: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
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
export {gql};

