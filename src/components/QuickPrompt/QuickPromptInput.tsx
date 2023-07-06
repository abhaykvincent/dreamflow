export default function QuickPromptInput(input: string, setInput:any) {
  return <input className="prompt" 
    placeholder="Create a basic .." 
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)} />;
}