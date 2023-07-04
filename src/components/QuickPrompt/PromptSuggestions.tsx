interface PromptSuggestionsProps {
    loading: boolean;
    suggestions: { text: string; }[];
    setInput: any;
    input: string;
  }
export default function PromptSuggestions({ loading, suggestions, setInput, input }: PromptSuggestionsProps) {
    return <div className={`promptSuggestions ${loading ? 'hide' : ''}`}>
      {suggestions.length > 0 &&
        suggestions.map((suggestion: any, i) => (
          <div key={i} className="suggestion"
            onClick={() => setInput(input.substring(0, input.lastIndexOf(' ') + 1) + suggestion.text)}
          >{suggestion.text}</div>
        ))}
    </div>;
  }