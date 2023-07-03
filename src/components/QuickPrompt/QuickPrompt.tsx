import React, { useCallback, useEffect, useState } from 'react';
import './QuickPrompt.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectTarget, updateCanvasHTML } from '../../features/canvas/canvasSlice';
import { useAppDispatch } from '../../app/hooks';
import { debounce} from 'lodash';

// This function is used to store Van Gough's responses in the local storage.
const  storeVanGoughResponses = (response: any) => {
  let vanGoughResponses = localStorage.getItem('van-goughResponses');
  if(vanGoughResponses === null){
    vanGoughResponses = JSON.stringify([response]);
  }else{
    let vanGoughResponsesARR = JSON.parse(vanGoughResponses);
    vanGoughResponsesARR.push(response);
    console.log(response);
    debugger;
    vanGoughResponses = JSON.stringify(vanGoughResponsesARR);
  }
  localStorage.setItem('van-goughResponses', vanGoughResponses);
}

export default function QuickPrompt() {

  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({
    html:'' as string,
    css:'' as string,
    js:'' as string
  }  as any);
  const [suggestions, setSuggestions] = useState([
    {text:'create a layout for calculator'}
  ]);
  const targetID = useSelector(selectTarget);
  const dynamicPrompt = [
    {role: "system", content: "You are a helpful web developer, web designer and copywriter who Respond only with vanilla javascrpt code that can run in browser using eval. Check for syntax errors before sending. "},
    {role: "user", content: "Provide structure style which is simple design and aesthetic."},
    {role: "assistant", content: `Elements will be appended to [data-flow-id="${targetID}"].`},
    {role: "user", content: "Create a section with three subscription plans in a grid"},
    {role: "assistant", content: `
    //Data//
    const plansData = [
      {
        title: 'Basic Plan',
        price: '$9.99/month',
        features: ['Access to basic features', 'Single user account']
      },
      {
        title: 'Pro Plan',
        price: '$19.99/month',
        features: ['Access to all features', 'Up to 5 user accounts']
      },
      {
        title: 'Enterprise Plan',
        price: 'Contact us for pricing',
        features: ['Custom features and integrations', 'Unlimited user accounts']
      },
    ];
    //HTML//
    <section class="subscription-plans" data-flow-name="Subscription plans" data-flow-component="subscription-plans">
      <h1>Our Subscription Plans</h1>
      <div class="plans-grid">
        {
          plansData.map(plan => {
            return (
              <div class="plan-card">
                <h2>{plan.title}</h2>
                <p>{plan.price}</p>
                <ul>
                  {
                    plan.features.map(feature => {
                      return <li>{feature}</li>
                    })
                  }
                </ul>
              </div>
            )
          })        
        }
      </div>

    //CSS//
    .subscription-plans { width: 80%; margin: auto; text-align: center; } 
    .plans-grid { display: flex; justify-content: space-between; gap: 20px; } 
    .plan-card { background-color: #f8f8f8; border-radius: 10px; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); } 
    .plan-card h2 { margin-top: 0; } 
    .plan-card ul { text-align: left; }
`}]
const [askFeedback, setAskFeedback] = useState(false);
const [feedback, setFeedback] = useState({});


  const promptCompletions = (userInput: string) => {
    const url = 'http://127.0.0.1:5001/dreamflow-cloud/us-central1/api/monalisa';
    const config = {  
      headers: { 'Content-Type': 'application/json' },
      mode: 'no-cors',
      params: {
        prompt:userInput
      }
    };
    axios.get(url, config)
      .then(response => {
        console.log(response.data);
        setSuggestions(response.data);
      }
      )
      .catch(error => {
        //console.log(error);
      });
  }
  const sendPrompt = (e: any) => 
  {
    setLoading(true);
    dynamicPrompt.push({role: "user", content: input});
    const url = 'http://127.0.0.1:5001/dreamflow-cloud/us-central1/api/van-gough';
    const config = {  
      headers: { 'Content-Type': 'application/json' },
      mode: 'no-cors',
      params: {
        targetID:targetID,
        messages:dynamicPrompt  
      }
    };
    axios.get(url, config)
    .then(response => {
      // store response.data.choices[0] to local storage for later use
      // function store to local storage named van-goughResponses
      
      
    
      let responseString = response.data.choices[0].message.content;

      setLoading(false);
      setInput('');
      setFeedback(response.data.choices[0])

      // regeg for html and css seperated by ```html and ```css
      let htmlRegex = /```html([\s\S]*?)```/;
      let cssRegex = /```css([\s\S]*?)```/;
      // regeg for html and css seperated by //HTML and //CSS
      let htmlRegex2 = /\/\/HTML\/\/([\s\S]*?)\/\/CSS/;
      let cssRegex2 = /\/\/CSS\/\/([\s\S]*?)\/\/JS/;



      let htmlMatch = responseString.match(htmlRegex);
      let cssMatch = responseString.match(cssRegex);

      let htmlCode = htmlMatch ? htmlMatch[1].trim() : '' as string;
      let cssCode = cssMatch ? cssMatch[1].trim() : '' as string;
      if(htmlCode === '' || cssCode === ''){
        console.log(responseString);
        htmlCode = htmlCode.match(htmlRegex2)[1].trim();
        cssCode = cssCode.match(cssRegex2)[1].trim();
      }
      debugger  ;
      // reemove /n from html and css
      htmlCode = htmlCode.replace(/\n/g, '');
      cssCode = cssCode.replace(/\n/g, '');

      setResponse({
        html:htmlCode,
        css:cssCode,
        js:'',
        targetID:targetID
      });
    }
    )
    .catch(error => {
      console.log(error);
    });
  }
    
  useEffect(() => {

    try{
      {
        let htmlDummy="<div class=\"calculator\">  <input type=\"text\" class=\"calculator-screen\" disabled />  <div class=\"calculator-buttons\">    <button class=\"operator\">+</button>    <button class=\"operator\">-</button>    <button class=\"operator\">*</button>    <button class=\"operator\">/</button>    <button>7</button>    <button>8</button>    <button>9</button>    <button>4</button>    <button>5</button>    <button>6</button>    <button>1</button>    <button>2</button>    <button>3</button>    <button>0</button>    <button>.</button>    <button class=\"clear\">C</button>    <button class=\"equal\">=</button>  </div></div>";
        let cssDummy= ".calculator {  width: 300px;  margin: auto;  background-color: #f8f8f8;  border-radius: 10px;  padding: 20px;  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);}.calculator-screen {  width: 100%;  height: 40px;  margin-bottom: 10px;  padding: 5px;  font-size: 20px;  text-align: right;}.calculator-buttons {  display: grid;  grid-template-columns: repeat(4, 1fr);  grid-gap: 10px;}.calculator-buttons button {  width: 100%;  height: 40px;  font-size: 18px;  background-color: #e0e0e0;  border: none;  border-radius: 5px;  cursor: pointer;}.calculator-buttons button.operator {  background-color: #ff9800;  color: white;}";
        let targetIDDummy= "canvas";
    }

      const html = response.html;
      const css = response.css;
      const targetID = response.targetID;
      console.log({html, css, targetID});
      console.log(html);
      
      // update html
      const target = document.querySelector(`[data-flow-id="${targetID}"]`);
      if(target){
        target.innerHTML = html;
        // add style to head
        const style = document.createElement('style');
        style.innerHTML = css;
        document.head.appendChild(style);

      }
      dispatch(updateCanvasHTML());

    }catch(error:any){
      console.log(error);
      console.log(error.name);
      console.log(error.message);
      console.log(error.stack);
    }
  }, [response]);

  // prompt completion
 
  const fetchApi = useCallback(debounce((input: string) => {
    promptCompletions(input);
  }, 1500), []);  


  useEffect(() => {
    if ((input.length ?? 0) > 3) {
      fetchApi(input);

    }

    // Cleanup
    return () => {
      fetchApi.cancel();
    };
  }, [input, fetchApi]);

  useEffect(() => {
    if(askFeedback){
      storeVanGoughResponses(feedback);
      setAskFeedback(false);
    }
  }, [feedback]);



  return (
    <div className={`quickPrompt ${isVisible? '' : 'hide'}`}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      className="prompt" placeholder="Create a basic .."  type="text" />
      <div className={`ask ${loading? 'loading' : ''}`}
      onClick={sendPrompt}
      >
        {
          loading? 'Loading...' : '🔮'
        }
      </div>
      <div className={`promptSuggestions ${loading? 'hide': ''}`}>
        {
          suggestions.length > 0 &&
          suggestions.map((suggestion: any,i) => (
            <div key={i} className="suggestion"
            onClick={() => setInput(input.substring(0,input.lastIndexOf(' ')+1)+suggestion.text)}
            >{suggestion.text}</div>
          ))
        }
      </div>
      <div className="quickPrompt__icon"
      onClick={()=>setIsVisible(!isVisible)}

      >🔮</div>
      <div className="close__icon"
      onClick={()=>setIsVisible(!isVisible)}
      >x</div>
      {
        askFeedback ?
        <div className="feedback">
          <div className="thumbs-up">
            <div className="icon"
            onClick={() => {
              setAskFeedback(true);
              setLoading(false);
              
            }}
            >👍</div>
          </div>
          <div className="thumbs-down">
            <div className="icon">👎</div>
          </div>
        </div>
        : null
      }
    </div>
  );

  
};
