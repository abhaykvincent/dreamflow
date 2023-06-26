import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import React from 'react';
import $ from 'jquery';

export interface CanvasState {
  canvasDOM: string;
  canvasDimensions: {
    width: number,
    height: number,
    top: number,
    left: number,
    right: number,
    bottom: number,
  },
  targetId:string,
  targetStyles:{property:string,value:string}[]
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CanvasState = {
  canvasDOM: $('#canvas').html() as string,
  canvasDimensions: {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
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
    updateCanvasDimensions:(state,action:PayloadAction<{width:number,height:number,top:number,left:number,right:number,bottom:number}>)=>{
      state.canvasDimensions=action.payload;
      console.log('%ccanvasDimensions updatedin store', 'color: #AF52DE');
      console.log(state.canvasDimensions);
    }
  },
});

export const { updateCanvasHTML,setTarget,updateCanvasDimensions} = CanvasSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCanvasDOM = (state: RootState) => state.canvas.canvasDOM;
export const selectTarget = (state: RootState) => state.canvas.targetId;
export const selectTargetStyles = (state: RootState) => state.canvas.targetStyles;
export const selectCanvasDimensions = (state: RootState) => state.canvas.canvasDimensions;



export default CanvasSlice.reducer;
