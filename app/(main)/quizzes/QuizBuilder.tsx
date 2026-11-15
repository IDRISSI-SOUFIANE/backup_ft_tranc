'use client'
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import React, { useEffect, useState } from 'react';

type Option = {
  id: string;
  text: string;
  isOther?: boolean;
};

type QuestionType = 'radio' | 'checkbox' | 'yesno';

type Question = {
  questionTitle : string, 
  type : string ,
  choices : Option[]
}
interface QstArg {
  id?: number;
  onChange?: (data: Question) => void;
}


export default function QuestionBuilder({id , onChange} : QstArg) {
  const [questionType, setQuestionType] = useState<QuestionType>('radio');
  const [title, setTitle] = useState('question');


  const [options, setOptions] = useState<Option[]>([
    { id: '1', text: 'Item 1' },
    { id: '2', text: 'Item 2' },
  ]);

  const [hasOther, setHasOther] = useState(false);


  useEffect(()=>{
    onChange?.({questionTitle: title, type: questionType, choices: options })
  }, [title, questionType, options])  

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as QuestionType;
    setQuestionType(newType);


    if (newType === 'yesno') {
      setOptions([
        { id: '1', text: 'Yes' },
        { id: '2', text: 'No' },
      ]);
      setHasOther(false);
    } else {
      if (questionType === 'yesno') {
        setOptions([
          { id: '1', text: 'Item 1' },
          { id: '2', text: 'Item 2' },
        ]);
      }
    }
  };

  const handleTextChange = (id: string, newText: string) => {
    setOptions(options.map(opt => opt.id === id ? { ...opt, text: newText } : opt));
  };

  const removeOption = (id: string) => {
    setOptions(options.filter(opt => opt.id !== id));
  };

  const addOption = (ele?:any) => {
    const newId = Date.now().toString();
    const newNumber = options.length + 1;
    
    if (ele != "Other")
      setOptions([...options, { id: newId, text: `Item ${newNumber}` }]);
    else
      setOptions([...options, { id: newId, text: ele }]);
      
  };

  const toggleOther = () => {
    setHasOther(!hasOther);
    addOption("Other");
  };

  return (
    <div className="max-w-3xl w-full mx-auto p-6 border border-primary rounded-xl bg-white shadow-sm font-sans">

      
      <div className="flex justify-between items-center mb-6">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your question here..."
          className="text-xl font-semibold bg-transparent border-none outline-none focus:bg-gray-50 hover:bg-gray-50 rounded px-3 py-2 w-full max-w-lg transition-colors"
        />

        <select
          value={questionType}
          onChange={handleTypeChange}
          className="ml-4 p-2.5 border border-gray-300 rounded-lg bg-white text-sm font-medium outline-none focus:ring-2 focus:ring-primary cursor-pointer"
        >
          <option value="radio">Single Choice</option>
          <option value="checkbox">Multiple Choice</option>
          <option value="yesno">Yes / No</option>
        </select>
      </div>


      <div className="space-y-2 ml-4">
        {options.filter(opt => opt.text != "Other").map((option) => (
             <div key={option.id} className="flex items-center group">


            {questionType !== 'yesno' && (
              <button
                onClick={() => removeOption(option.id)}
                className="mr-3 shrink-0 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove option"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            )}

            
            <div className="mr-3 shrink-0 text-gray-300">
              {questionType === 'radio' || questionType === 'yesno' ? (
                <div className="w-5 h-5  rounded-full border-2 border-gray-300 bg-white"> </div>
              ) : (
                <div className="w-5 h-5 rounded border-2 border-gray-300 bg-white"> </div>
              )}
            </div>

            
            <Input
              type="text"
              value={option.text}
              onChange={(e) => handleTextChange(option.id, e.target.value)}
              readOnly={questionType === 'yesno'}
              className={`grow border-none outline-none text-base py-1  px-2 border-b border-transparent  focus:border-primary hover:bg-gray-50 transition-colors ${questionType === 'yesno' ? 'cursor-default' : ''}`}
            />
          </div>
        ))}

        
        {hasOther && questionType !== 'yesno' && (
          <div className="flex items-center group">
            <button onClick={toggleOther} className="mr-3 shrink-0 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </button>
            <div className="mr-3 shrink-0 text-gray-300">
              {questionType === 'radio' ? <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div> : <div className="w-5 h-5 rounded border-2 border-gray-300"></div>}
            </div>
            <span className="text-base py-1 px-2 text-gray-500">Other </span>
          </div>
        )}
      </div>


      {questionType !== 'yesno' && (

        <div className="flex items-center mt-4 ml-12 text-sm">

          {options.length < 5 && (
            <button onClick={addOption} className="flex items-center text-primary hover:text-blue-600 font-medium cursor-pointer">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Item
            </button>)
          }


          {!hasOther && (
            <>
              {
                options.length < 5 ? <span className="mx-2 text-gray-400">or</span> : ''
              }
              <button onClick={toggleOther} className=" text-primary hover:text-blue-600 font-medium hover:underline">
                add "Other"
              </button>
            </>
          )}
        </div>
      )}

    </div>
  );
}