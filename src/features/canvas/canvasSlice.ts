import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import $ from 'jquery';

export interface CanvasState {
  canvasDOM: SerializedNode | null,
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
  canvasDOM: null ,
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
interface SerializedNode {
  nodeName: string;
  attributes: { [key: string]: string };
  children: SerializedNode[];
}

const serializeDOMNode = (node: Node | null): SerializedNode | null => {
  // Base case for recursion: if node is null, return null
  if (!node) return null;

  // Create an object to represent the current node
  const serializedNode: SerializedNode = {
      nodeName: node.nodeName,
      attributes: {},
      children: [],
  };

  // Serialize attributes
  if (node instanceof Element) {
      for (let i = 0; i < node.attributes.length; i++) {
          const attr = node.attributes[i];
          serializedNode.attributes[attr.name] = attr.value;
      }
  }

  // Serialize child nodes (recursively)
  for (let child of node.childNodes) {
    const result = serializeDOMNode(child);
    if (result !== null) {
      serializedNode.children.push(result);
    }
  }

  return serializedNode;
}

export const CanvasSlice = createSlice({
  name: 'canvas',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers:{
    updateCanvasHTML: (state: CanvasState) => {
      const canvasDOM = document.getElementById('canvas');
      if (canvasDOM) {
          state.canvasDOM = serializeDOMNode(canvasDOM);
          console.log('%ccanvasDOM serialized in store', 'color: #AF52DE');
          console.log(state.canvasDOM);
      }
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
