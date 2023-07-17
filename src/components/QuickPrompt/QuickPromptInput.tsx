import axios from "axios";
import { debounce } from "lodash";
import { useCallback, useEffect } from "react";
  //// Auto-completionq
export default function QuickPromptInput({input, setInput,setSuggestions}: any) {  // Debounced to AVOID too many api calls
  
  const handleCompletions = (userInput: string) => {
    const API_URL_MONALISA = 'http://127.0.0.1:5001/dreamflow-cloud/us-central1/api/monalisa';
    const config = {  
      headers: { 'Content-Type': 'application/json' },
      mode: 'no-cors',
      params: {
        prompt:userInput
      }
    };
    axios.get(API_URL_MONALISA, config)
    .then(response => {
      console.log(response.data);
      setSuggestions(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }
  const fetchApi = useCallback(debounce((input: string) => {
    handleCompletions(input);
  }, 1500), []);  
  useEffect(() => {
    if ((input.length ?? 0) > 3) {
      fetchApi(input);
    }
    return () => {
      fetchApi.cancel();
    };
  }, [input]);
  return <input className="prompt" 
    placeholder="Create a basic .." 
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)} />;
}