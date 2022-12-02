import {AddQuestionInput, AnswerQuestionInput, GameInput, gql, StartGameInput} from "../../../generated/graphql";
import {publicClient} from "../../../utils/graphqlAPI";

const ANSWER_QUESTION_MUTATION = gql`
    mutation ($node: AnswerQuestionInput){
        answerQuestion(input: $node){
            success
        }
    }`

export const answerQuestion = (node: AnswerQuestionInput) => {
    return publicClient.mutate({
        mutation: ANSWER_QUESTION_MUTATION,
        variables: {node}
    })
}

const START_GAME_MUTATION = gql`
    mutation($node:StartGameInput ){
        startGame(input : $node){
            id,
            health
        }
    }
`

export const startGame = (node: StartGameInput) => {
    return publicClient.mutate({
        mutation: START_GAME_MUTATION,
        variables: {node}
    })
}


const ADD_QUESTION_MUTATION = gql`
    mutation($node: AddQuestionInput){
        addQuestion(input: $node){
            id,
            question,
            answer,
            category,
            a1,
            a2
        }
    }
`

export const addQuestion = (node: AddQuestionInput) => {
    return publicClient.mutate({
        mutation: ADD_QUESTION_MUTATION,
        variables: {node}
    })
}

const GET_GAME_BY_USER_ID_QUERY = gql`
    query($id: ID!) {
        getGameByUserId(id: $id){
            id,
            userId,
            health
        }
    }
`

export const getGameByUserId = (id: number) => {
    return publicClient.query({
        query: GET_GAME_BY_USER_ID_QUERY,
        variables: {id},
        fetchPolicy: 'no-cache',

    })
}

const GET_RANDOM_QUESTION_QUERY = gql`
    query{
        getRandomQuestion{
            id,
            question,
            answer,
            category,
            a1,
            a2,
            explanation
        }
    }
`

export const getRandomQuestion = () => {
    return publicClient.query({
        query: GET_RANDOM_QUESTION_QUERY,
        fetchPolicy: 'no-cache',
    })
}

const END_GAME_MUTATION = gql`
    mutation($node : GameInput!){
        endGame(input: $node){
            success
        }
    }
`

export const endGame = (id: GameInput) => {
    return publicClient.mutate({
        mutation: END_GAME_MUTATION,
        variables: {node: id}
    })
}