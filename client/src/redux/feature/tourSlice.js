import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

//createTour
export const createTour = createAsyncThunk("tour/createTour", async ({updatedTourData,navigate,toast},{rejectWithValue}) => {
    try {
        // Your logic to handle login, e.g., making an API request

        const response = await api.createTour(updatedTourData);
        toast.success("Tour Added Successfully");
        navigate("/");
        
        return response.data;



    } catch (error) {
        //console.log(error);
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);

        //throw error; // Optionally throw the error if you want to propagate it
    }
});

//getting all tours
export const getTours = createAsyncThunk("tour/getTour", async (_,{rejectWithValue}) => {
    try {
        // Your logic to handle login, e.g., making an API request

        const response = await api.fetchTours();
      //  console.log("API Response:", response);
        
        
        return response.data;



    } catch (error) {
        //console.log(error);
        console.error("API Error:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data?.message || "An error occurred");

        //throw error; // Optionally throw the error if you want to propagate it
    }
});


//getting single tours
export const getSingleTours = createAsyncThunk("tour/getSingleTour", async (id,{rejectWithValue}) => {
    try {
        // Your logic to handle login, e.g., making an API request

        const response = await api.fetchSingleTours(id);
       //console.log("API Response:", response);
        
        
        return response.data;



    } catch (error) {
        //console.log(error);
        console.error("API Error:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data?.message || "An error occurred");

        //throw error; // Optionally throw the error if you want to propagate it
    }
});


//getting single tours
export const getSingleToursByUser = createAsyncThunk("tour/getSingleTourByUser", async (userId,{rejectWithValue}) => {
    try {
        // Your logic to handle login, e.g., making an API request

        const response = await api.fetchTourByUser(userId);
      // console.log("API Response:", response);
        
        
        return response.data;



    } catch (error) {
        //console.log(error);
        console.error("API Error:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data?.message || "An error occurred");

        //throw error; // Optionally throw the error if you want to propagate it
    }
});


//deleteTour
export const deleteTours = createAsyncThunk("tour/deleteTour", async ({id,toast},{rejectWithValue}) => {
    try {
        // Your logic to handle login, e.g., making an API request

        const response = await api.deleteTour(id);
      // console.log("API Response:", response);

      toast.success("Tour Deleted Succussfully");
        
        
        return response.data;



    } catch (error) {
        //console.log(error);
        console.error("API Error:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data?.message || "An error occurred");

        //throw error; // Optionally throw the error if you want to propagate it
    }
});

//updateTour
export const updateTours = createAsyncThunk(
    "tour/updateTour",
    async ({ id, updatedTourData, toast, navigate }, { rejectWithValue }) => {
      try {
        const response = await api.updateTour(updatedTourData, id);
       // console.log(response);
        toast.success("Tour Updated Successfully");
        navigate("/");
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
);


const tourSlice = createSlice({
    name:"tour",
    initialState:{
        tour:null,
        tours:[],
        userTour:[],
        error:"",
        loading:false,


    },
    


    extraReducers: (builder) => {
        builder
            //creting tour
            .addCase(createTour.pending, (state) => {
                state.loading = true;
            })
            .addCase(createTour.fulfilled, (state, action) => {
                state.loading = false;
               state.tours = [action.payload];
            })
            .addCase(createTour.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Use action.error.message instead of action.payload.message
            })


            //getting complete tour
            .addCase(getTours.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTours.fulfilled, (state, action) => {
                state.loading = false;
               state.tours = action.payload.tours;
            })
            .addCase(getTours.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Use action.error.message instead of action.payload.message
            })

            //getting single tours
            .addCase(getSingleTours.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSingleTours.fulfilled, (state, action) => {
                state.loading = false;
                state.tour = action.payload.tours;                ; 
            })
            .addCase(getSingleTours.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Use action.error.message instead of action.payload.message
            })

            //userTours
            .addCase(getSingleToursByUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSingleToursByUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userTour = action.payload.tours;                ; 
            })
            .addCase(getSingleToursByUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Use action.error.message instead of action.payload.message
            })

            //deleteTours
            .addCase(deleteTours.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTours.fulfilled, (state, action) => {
                state.loading = false;
               // console.log(action,"action")
                const {arg :{id}} =  action.meta;
                if(id){
                    state.tours =  state.tours.filter((item)=>item._id !== id);
                    state.userTour =  state.userTour.filter((item)=>item._id !== id);

                }
            })
            .addCase(deleteTours.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Use action.error.message instead of action.payload.message
            })

            //update
            .addCase(updateTours.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateTours.fulfilled, (state, action) => {
                state.loading = false;
                
                const {arg :{id}} =  action.meta;
                //console.log(arg);
                console.log(id);
                
                if(id){
                    state.tours =  state.tours.map((item)=>item._id === id? action.payload:item);
                    state.userTour =  state.userTour.map((item)=>item._id === id?action.payload :item);

                }
            })
            .addCase(updateTours.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; 
            })

    },
});




export default tourSlice.reducer;