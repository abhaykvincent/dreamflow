import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface CanvasState {
  canvas: string;
  targetId:string,
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CanvasState = {
  canvas: '',
  targetId:'canvas',
  status: 'idle',
};

export const CanvasSlice = createSlice({
  name: 'canvas',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    update: (state,action: PayloadAction<string>) => {
      state.canvas=action.payload
    },
    setTarget:(state,action:PayloadAction<string>)=>{
      state.targetId=action.payload;
    }
  },
});

export const { update,setTarget } = CanvasSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCanvas = (state: RootState) => state.canvas.canvas;
export const selectTarget = (state: RootState) => state.canvas.targetId;



export default CanvasSlice.reducer;
