import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api";


//login
export const login = createAsyncThunk("auth/login", async ({formValue,navigate,toast},{rejectWithValue}) => {
    try {
        // Your logic to handle login, e.g., making an API request

        const response = await api.singIn(formValue);
        toast.success("login Successfully");
        navigate("/");
        
        return response.data;



    } catch (error) {
        //console.log(error);
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);

        //throw error; // Optionally throw the error if you want to propagate it
    }
});


//register
export const register = createAsyncThunk("auth/register", async ({formValue,navigate,toast},{rejectWithValue}) => {
    try {
        // Your logic to handle login, e.g., making an API request

        const response = await api.singUp(formValue);
        toast.success("Register Successfully");
        navigate("/");
        
        return response.data;



    } catch (error) {
        //console.log(error);
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);

        //throw error; // Optionally throw the error if you want to propagate it
    }
});


const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        error:"",
        loading:false,


    },
    reducers:{
        setUser:(state,action) =>{
            state.user = action.payload
        },
        setLogout:(state,action)=>{
            state.user = null;
            localStorage.clear();
        }
    },


    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                localStorage.setItem("profile", JSON.stringify(action.payload));
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Use action.error.message instead of action.payload.message
            });

        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                localStorage.setItem("profile", JSON.stringify(action.payload));
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Use action.error.message instead of action.payload.message
            });
    },
});

export const {setUser} = authSlice.actions;
export const {setLogout} = authSlice.actions;


export default authSlice.reducer;