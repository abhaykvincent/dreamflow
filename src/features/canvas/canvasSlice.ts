import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import $ from 'jquery';

export interface CanvasState {
  canvasDOM: any;
  canvasDimensions: {
    width: number|undefined,
    height: number|undefined,
    top: number|undefined,
    left: number|undefined,
    right: number|undefined,
    bottom: number|undefined,
  },
  targetId:string,
  targetStyles:{property:string,value:string}[]
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CanvasState = {
  canvasDOM: $('#canvas').html(),
  canvasDimensions: {
    width: undefined,
    height: undefined, 
    top: undefined,
    left: undefined,
    right: undefined,
    bottom: undefined,
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
    updateCanvasHTML: (state) => {
      state.canvasDOM = $('#canvas').html();
      console.log('%ccanvasDOM updatedin store', 'color: #AF52DE');
    },
    setTarget:(state,action:PayloadAction<string>)=>{
        state.targetId=action.payload;
        console.log('%ctargetId updatedin store', 'color: #AF52DE');
    },
    updateCanvasDimensions:(state,action:PayloadAction<{width:number,height:number,top:number,left:number,right:number,bottom:number}>)=>{
      state.canvasDimensions=action.payload;
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
