import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import React from 'react';
import $ from 'jquery';
import {produce} from 'immer';
import { act } from 'react-dom/test-utils';

export interface CanvasState {
  canvasDOM: string;
  targetId:string,
  targetStyles:{property:string,value:string}[]
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CanvasState = {
  canvasDOM: $('#canvas').html() as string,
  targetId:'canvas',
  targetStyles:[
    { property: '', value: '' }
  ],
  status: 'idle',
};

export const CanvasSlice = createSlice({
  name: 'canvas',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers:{
    updateCanvasHTML: (state,action: PayloadAction<string>) => {
      state.canvasDOM=action.payload;
      console.log('%ccanvasDOM updatedin store', 'color: #AF52DE');
    },
    setTarget:(state,action:PayloadAction<string>)=>{
        state.targetId=action.payload
    },
    setStyles:(state,action:PayloadAction<{property:string,value:string}[]>)=>{
      state.targetStyles=action.payload;
      console.log(state.targetStyles)
    }
  },
});

export const { updateCanvasHTML,setTarget,setStyles } = CanvasSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCanvasDOM = (state: RootState) => state.canvas.canvasDOM;
export const selectTarget = (state: RootState) => state.canvas.targetId;
export const selectTargetStyles = (state: RootState) => state.canvas.targetStyles;



export default CanvasSlice.reducer;
