import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface VoiceAssistantProps {
  onVoiceInput?: (text: string) => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onVoiceInput }) => {
  const { language } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
        
        if (event.results[current].isFinal && onVoiceInput) {
          onVoiceInput(transcript);
        }
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [language, onVoiceInput]);

  const startListening = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };

      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const welcomeMessage = language === 'hi' 
    ? 'नमस्ते! मैं आपकी कार्बन क्रेडिट सहायक हूं। आप मुझसे प्रोजेक्ट जोड़ने, कार्बन क्रेडिट्स की गणना करने, या किसी भी सहायता के लिए बात कर सकते हैं।'
    : 'Hello! I am your carbon credit assistant. You can talk to me about adding projects, calculating carbon credits, or any help you need.';

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="flex flex-col items-end space-y-3">
        {/* Voice Input Display */}
        {(isListening || transcript) && (
          <div className="bg-white rounded-xl shadow-lg p-4 max-w-xs border-2 border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
              <span className="text-sm font-medium text-gray-700">
                {isListening 
                  ? (language === 'hi' ? 'सुन रहा हूं...' : 'Listening...') 
                  : (language === 'hi' ? 'सुना गया:' : 'Heard:')
                }
              </span>
            </div>
            <p className="text-gray-800 text-sm">{transcript || (language === 'hi' ? 'बोलना शुरू करें...' : 'Start speaking...')}</p>
          </div>
        )}

        {/* Voice Controls */}
        <div className="flex space-x-3">
          {/* Speak Welcome Message */}
          <button
            onClick={() => isSpeaking ? stopSpeaking() : speakText(welcomeMessage)}
            className={`p-4 rounded-full shadow-lg transition-all transform hover:scale-110 ${
              isSpeaking 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
            title={language === 'hi' ? 'सहायता सुनें' : 'Listen to help'}
          >
            {isSpeaking ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
          </button>

          {/* Voice Input */}
          <button
            onClick={isListening ? stopListening : startListening}
            className={`p-4 rounded-full shadow-lg transition-all transform hover:scale-110 ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
            title={language === 'hi' ? 'आवाज़ से बात करें' : 'Speak to assistant'}
          >
            {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </button>
        </div>

        {/* Voice Instructions */}
        <div className="bg-white rounded-lg shadow-lg p-3 max-w-xs text-center border border-gray-200">
          <p className="text-xs text-gray-600">
            {language === 'hi' 
              ? '🎤 बोलकर सहायता लें | 🔊 सुनकर समझें'
              : '🎤 Get help by speaking | 🔊 Listen to understand'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;