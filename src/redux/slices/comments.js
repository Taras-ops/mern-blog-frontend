import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

const initialState = {
    currentComments: [],
    status: 'loading',
    commentsCount: 0
}

export const getCurrentComments = createAsyncThunk(
    'comments/getCurrentComments',
    async (postId) => {
        const {data} = await axios.get(`/posts/${postId}/comments`)
        return data
    }
)

export const createComment = createAsyncThunk(
    'comments/createComment',
    async (commentData) => {
        const {data} = await axios.post(`/posts/${commentData.postId}/comments`, commentData.values)
        return data
    }
)

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: {
        [getCurrentComments.pending]: (state) => {
            state.status = 'loading'
            state.currentComments = []
        },
        [getCurrentComments.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.currentComments = action.payload
            state.commentsCount = action.payload.length || 0
        },
        [getCurrentComments.rejected]: (state) => {
            state.status = 'error'
            state.currentComments = []
        },

        [createComment.pending]: (state) => {

        },
        [createComment.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.currentComments = [action.payload, ...state.currentComments]
            state.commentsCount++
        },
        [createComment.rejected]: (state) => {

        },
    }
})

export const commentReducer = commentsSlice.reducer
