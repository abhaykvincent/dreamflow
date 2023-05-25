import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface CanvasState {
  canvas: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CanvasState = {
  canvas: '',
  status: 'idle',
};

export const CanvasSlice = createSlice({
  name: 'canvas',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    update: (state,action: PayloadAction<string>) => {

      console.log('dispatched')
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.canvas=action.payload
    }
  },
});

export const { update } = CanvasSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCanvas = (state: RootState) => state.canvas.canvas;



export default CanvasSlice.reducer;
