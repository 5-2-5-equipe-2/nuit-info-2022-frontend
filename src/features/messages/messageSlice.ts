import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSnackbar} from "notistack";


interface Message {
    text: string;
    type: "success" | "error" | "info";
}

interface MessageState {
    messages: Message[];
}


const initialState: MessageState = {
    messages: [],
}

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
            const {enqueueSnackbar} = useSnackbar();
            enqueueSnackbar(action.payload.text, {variant: action.payload.type});
        },
        clearMessages: (state) => {
            state.messages = [];
            const {closeSnackbar} = useSnackbar();
            closeSnackbar();
        }

    }
});

export const {addMessage, clearMessages} = messageSlice.actions;