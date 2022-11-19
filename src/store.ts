import { configureStore } from '@reduxjs/toolkit'
import {counterSlice} from "./features/counter/counterSlice";
import {authSlice} from "./features/auth/authSlice";
import {messageSlice} from "./features/messages/messageSlice";
const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        auth: authSlice.reducer,
        message: messageSlice.reducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store