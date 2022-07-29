import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts', 
    async (params) => {
        if(params.popular){
            const {data} = await axios.get('/posts?popular=true')
            return data
        }

        const {data} = await axios.get('/posts')
        return data
    }
)

export const fetchTags = createAsyncThunk(
    'posts/fetchTags',
    async () => {
        const {data} = await axios.get('/tags')
        return data
    }
)

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (id) => {
        console.log(id)
        await axios.delete(`/posts/${id}`)
        return id
    }
)

const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    },
    tagPosts: {
        items: [],
        status: 'loading'
    }
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducer: {},
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.posts.items = []
            state.posts.status = "loading"
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.status = "loaded"
            state.posts.items = action.payload
        },
        [fetchPosts.rejected]: (state, action) => {
            state.posts.items = []
            state.posts.status = "error"
        },

        [fetchTags.pending]: (state, action) => {
            state.tags.items = []
            state.tags.status = "loading"
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload
            state.tags.status = "loaded"
        },
        [fetchTags.rejected]: (state, action) => {
            state.tags.items = []
            state.tags.status = "error"
        },

        [deletePost.pending]: (state, action) => {
            
        }, 
        [deletePost.fulfilled]: (state, action) => {
            state.posts.items = state.posts.items.filter((item) => item._id !== action.payload)
        }, 
        [deletePost.rejected]: () => {},        
    }
})

export const postReducer = postsSlice.reducer