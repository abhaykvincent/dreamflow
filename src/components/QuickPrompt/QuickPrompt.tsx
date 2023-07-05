import { useCallback, useEffect, useState } from 'react';
import { useSelector }    from 'react-redux';
import { debounce}  from 'lodash';
import   axios      from 'axios';
import { selectTarget, updateCanvasHTML } from '../../features/canvas/canvasSlice';
import './QuickPrompt.scss';
import Feedback from './Feedback';
import PromptSuggestions from './PromptSuggestions';
import QuickPromptInput from './QuickPromptInput';
import { renderCachedResponse, renderCodeSnippet, validateExtractHTMLCSS } from './helper';

// Dynamic Prompt prefix for Van Gough
const dynamicPrompt = [
  {role: "system", content: "You are a helpful web developer, web designer and copywriter who Respond only with vanilla javascrpt code that can run in browser using eval. Check for syntax errors before sending. "},
  {role: "user", content: "Provide structure style which is simple design and aesthetic."},
  {role: "assistant", content: `Certainly! I can assist you. What is the task"].`},
  {role: "user", content: "Create a section with three subscription plans in a grid"},
  {role: "assistant", content: `
  //HTML//
  <section class="subscription-plans" data-flow-name="Subscription plans" data-flow-component="subscription-plans"><h1>Our Subscription Plans</h1><div class="plans-grid"><div class="plan-card"><h2>{plan.title}</h2><p>{plan.price}</p><ul><li>{feature}</li></ul></div></div>
  //CSS//
  .subscription-plans { width: 80%; margin: auto; text-align: center; } 
  .plans-grid { display: flex; justify-content: space-between; gap: 20px; } 
  .plan-card { background-color: #f8f8f8; border-radius: 10px; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); } 
  .plan-card h2 { margin-top: 0; } 
  .plan-card ul { text-align: left; }
  //
`}]

export default function QuickPrompt() {
  const targetID = useSelector(selectTarget);

  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([
    {text:'create a layout for calculator'},
    {text:'create a layout for 1 week calendar'},
    {text:'create a todo list  with 6 items'},
  ]);
  
  const [askFeedback, setAskFeedback] = useState(false);
  const [feedback, setFeedback] = useState({});

  //// Code Snippet Generation
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
      let responseString = response.data.choices[0].message.content;
      setLoading(false);
      setInput('');
      setSuggestions([]);
      setFeedback(responseString)
      setAskFeedback(true);
      // Extract HTML and CSS from response
      let { htmlCode, cssCode } = validateExtractHTMLCSS(responseString);
      console.log('responseString', htmlCode, cssCode );
      renderCodeSnippet(htmlCode, cssCode, targetID);
    })
    .catch(error => {
      console.log(error);
      console.log('%c failed to get response from van-gough', 'color: red');
      console.log('Generating random response from local storage');
      // if API call FAILED; GET a cached response
      renderCachedResponse(targetID);
    });
  }
  
  //// Auto-completion

  // Debounced to AVOID too many api calls
   const fetchApi = useCallback(debounce((input: string) => {
    promptCompletions(input);
  }, 1500), []);  
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
    })
    .catch(error => {
      console.log(error);
    });
  }
  useEffect(() => {
    if ((input.length ?? 0) > 3) {
      fetchApi(input);
    }
    return () => {
      fetchApi.cancel();
    };
  }, [input]);

  return (
    <div className={`quickPrompt ${isVisible? '' : 'hide'}`}>
      {QuickPromptInput(input, setInput)}
      <div className={`ask ${loading? 'loading' : ''}`}
      onClick={sendPrompt}
      >{ loading? 'Loading...' : '🔮' }
      </div>
      <PromptSuggestions   suggestions={suggestions} setInput={setInput} input={input} loading={loading}/>
      <div className="quickPrompt__icon"
        onClick={()=>setIsVisible(!isVisible)}
      >🔮</div>
      <div className="close__icon"
      onClick={()=>setIsVisible(!isVisible)}
      >x</div>
      <div className="clear-localStorage"
      onClick={() => {
        localStorage.removeItem('van-goughResponses');
        // orange color
        console.log("%c Cached Vangough responses Cleared", "color: #ff9800")
      }}
      >
        clear
      </div>
      { askFeedback ? Feedback(feedback, setAskFeedback, setLoading): null }
    </div>
  );
};
// Lines     : 324  -> 270  -> 230  -> 187  -> 141
// Complexity: 51   -> 43   -> 36   -> 30   -> 27