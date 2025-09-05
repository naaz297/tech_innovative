import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface VoiceAssistantProps {
  onVoiceInput?: (text: string) => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onVoiceInput }) => {
  const { language } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [detectedLanguage, setDetectedLanguage] = useState('hi');

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'hi-IN'; // Start with Hindi but will auto-detect

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
        
        if (event.results[current].isFinal) {
          const detectedLang = detectLanguage(transcript);
          setDetectedLanguage(detectedLang);
          processVoiceCommand(transcript, detectedLang);
          if (onVoiceInput) {
            onVoiceInput(transcript);
          }
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

  const detectLanguage = (text: string): string => {
    // Simple language detection based on script and common words
    const hindiPattern = /[\u0900-\u097F]/;
    const englishPattern = /^[a-zA-Z\s.,!?]+$/;
    
    // Check for Hindi script
    if (hindiPattern.test(text)) {
      return 'hi';
    }
    
    // Check for English words
    if (englishPattern.test(text)) {
      return 'en';
    }
    
    // Check for common Hindi words in Roman script
    const hindiRomanWords = ['kya', 'hai', 'kaise', 'carbon', 'credit', 'paisa', 'paise', 'rupaye', 'khet', 'kheti'];
    const lowerText = text.toLowerCase();
    
    for (const word of hindiRomanWords) {
      if (lowerText.includes(word)) {
        return 'hi';
      }
    }
    
    // Default to English if uncertain
    return 'en';
  };

  const processVoiceCommand = (command: string, detectedLang: string) => {
    const lowerCommand = command.toLowerCase();
    let responseText = '';

    // Carbon credit related questions
    if (lowerCommand.includes('carbon') || lowerCommand.includes('कार्बन') || lowerCommand.includes('credit')) {
      responseText = detectedLang === 'hi' 
        ? 'कार्बन क्रेडिट्स आपको पर्यावरण की रक्षा करने के लिए पैसे देते हैं। धान की खेती से 3.5 टन प्रति एकड़ प्रति वर्ष मिलता है।'
        : 'Carbon credits pay you for protecting the environment. Rice farming gives 3.5 tons per acre per year.';
    }
    // Income related questions
    else if (lowerCommand.includes('income') || lowerCommand.includes('money') || lowerCommand.includes('पैसे') || lowerCommand.includes('आय') || lowerCommand.includes('paisa')) {
      responseText = detectedLang === 'hi'
        ? 'आप कार्बन क्रेडिट्स से महीने में 5000 से 15000 रुपये कमा सकते हैं। यह आपके खेत के आकार पर निर्भर करता है।'
        : 'You can earn 5000 to 15000 rupees monthly from carbon credits. It depends on your farm size.';
    }
    // How to add project
    else if (lowerCommand.includes('project') || lowerCommand.includes('add') || lowerCommand.includes('प्रोजेक्ट') || lowerCommand.includes('जोड़') || lowerCommand.includes('kaise')) {
      responseText = detectedLang === 'hi'
        ? 'नया प्रोजेक्ट जोड़ने के लिए हरे रंग का बटन दबाएं, अपने खेत की जानकारी भरें और तस्वीरें लें।'
        : 'To add new project, press the green button, fill your farm details and take photos.';
    }
    // Help with camera
    else if (lowerCommand.includes('camera') || lowerCommand.includes('photo') || lowerCommand.includes('कैमरा') || lowerCommand.includes('तस्वीर') || lowerCommand.includes('picture')) {
      responseText = detectedLang === 'hi'
        ? 'कैमरा खोलने के लिए कैमरा बटन दबाएं। खेत को बीच में रखें और कैप्चर बटन दबाएं।'
        : 'Press camera button to open camera. Keep farm in center and press capture button.';
    }
    // Rice farming questions
    else if (lowerCommand.includes('rice') || lowerCommand.includes('धान') || lowerCommand.includes('dhan') || lowerCommand.includes('chawal')) {
      responseText = detectedLang === 'hi'
        ? 'धान की खेती से आप साल में 3.5 टन कार्बन क्रेडिट्स कमा सकते हैं। इससे लगभग 5250 रुपये की आय होती है।'
        : 'Rice farming can earn you 3.5 tons of carbon credits per year. This gives approximately 5250 rupees income.';
    }
    // Agroforestry questions
    else if (lowerCommand.includes('agroforestry') || lowerCommand.includes('वानिकी') || lowerCommand.includes('tree') || lowerCommand.includes('पेड़')) {
      responseText = detectedLang === 'hi'
        ? 'कृषि वानिकी से आप साल में 7.2 टन कार्बन क्रेडिट्स कमा सकते हैं। इससे लगभग 10800 रुपये की आय होती है।'
        : 'Agroforestry can earn you 7.2 tons of carbon credits per year. This gives approximately 10800 rupees income.';
    }
    // General help
    else if (lowerCommand.includes('help') || lowerCommand.includes('मदद') || lowerCommand.includes('सहायता') || lowerCommand.includes('madad')) {
      responseText = detectedLang === 'hi'
        ? 'मैं आपकी कार्बन क्रेडिट्स, प्रोजेक्ट जोड़ने, और पैसे कमाने में मदद कर सकता हूं। क्या चाहिए?'
        : 'I can help you with carbon credits, adding projects, and earning money. What do you need?';
    }
    // Greeting responses
    else if (lowerCommand.includes('hello') || lowerCommand.includes('hi') || lowerCommand.includes('नमस्ते') || lowerCommand.includes('namaste')) {
      responseText = detectedLang === 'hi'
        ? 'नमस्ते! मैं आपकी कार्बन क्रेडिट सहायक हूं। आप मुझसे खेती, पैसे कमाने, या प्रोजेक्ट के बारे में पूछ सकते हैं।'
        : 'Hello! I am your carbon credit assistant. You can ask me about farming, earning money, or projects.';
    }
    else {
      responseText = detectedLang === 'hi'
        ? 'मैं आपकी कार्बन क्रेडिट्स की सहायता के लिए यहां हूं। आप मुझसे प्रोजेक्ट, पैसे, धान, वानिकी या कैमरा के बारे में पूछ सकते हैं।'
        : 'I am here to help with your carbon credits. You can ask me about projects, money, rice, agroforestry, or camera.';
    }

    setResponse(responseText);
    speakText(responseText, detectedLang);
  };

  const startListening = () => {
    if (recognition) {
      setTranscript('');
      setResponse('');
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  const speakText = (text: string, langCode: string = detectedLanguage) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set language based on detected language
      if (langCode === 'hi') {
        utterance.lang = 'hi-IN';
      } else {
        utterance.lang = 'en-IN';
      }
      
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

  const welcomeMessage = detectedLanguage === 'hi' 
    ? 'नमस्ते! मैं आपकी कार्बन क्रेडिट सहायक हूं। आप मुझसे हिंदी या अंग्रेजी में बात कर सकते हैं। प्रोजेक्ट जोड़ने, कार्बन क्रेडिट्स की गणना करने, या किसी भी सहायता के लिए बोलें।'
    : 'Hello! I am your carbon credit assistant. You can talk to me in Hindi or English. Speak for adding projects, calculating carbon credits, or any help you need.';

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="flex flex-col items-end space-y-3">
        {/* Voice Response Display */}
        {response && (
          <div className="bg-white rounded-xl shadow-lg p-4 max-w-sm border-2 border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <MessageCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">
                {detectedLanguage === 'hi' ? 'सहायक का जवाब:' : 'Assistant Response:'}
              </span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {detectedLanguage === 'hi' ? 'हिंदी' : 'English'}
              </span>
            </div>
            <p className="text-gray-800 text-sm leading-relaxed">{response}</p>
          </div>
        )}

        {/* Voice Input Display */}
        {(isListening || transcript) && (
          <div className="bg-white rounded-xl shadow-lg p-4 max-w-xs border-2 border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
              <span className="text-sm font-medium text-gray-700">
                {isListening 
                  ? (detectedLanguage === 'hi' ? 'सुन रहा हूं...' : 'Listening...') 
                  : (detectedLanguage === 'hi' ? 'सुना गया:' : 'Heard:')
                }
              </span>
              {transcript && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {detectedLanguage === 'hi' ? 'हिंदी' : 'English'}
                </span>
              )}
            </div>
            <p className="text-gray-800 text-sm">{transcript || (detectedLanguage === 'hi' ? 'बोलना शुरू करें...' : 'Start speaking...')}</p>
          </div>
        )}

        {/* Voice Controls */}
        <div className="flex space-x-3">
          {/* Speak Welcome Message */}
          <button
            onClick={() => isSpeaking ? stopSpeaking() : speakText(welcomeMessage, detectedLanguage)}
            className={`p-4 rounded-full shadow-lg transition-all transform hover:scale-110 ${
              isSpeaking 
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
            title={detectedLanguage === 'hi' ? 'सहायता सुनें' : 'Listen to help'}
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
            title={detectedLanguage === 'hi' ? 'आवाज़ से बात करें' : 'Speak to assistant'}
          >
            {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </button>
        </div>

        {/* Voice Instructions */}
        <div className="bg-white rounded-lg shadow-lg p-3 max-w-xs text-center border border-gray-200">
          <p className="text-xs text-gray-600">
            {detectedLanguage === 'hi' 
              ? '🎤 हिंदी/English में बोलें | 🔊 उसी भाषा में जवाब'
              : '🎤 Speak in Hindi/English | 🔊 Answer in same language'
            }
          </p>
          <p className="text-xs text-green-600 mt-1">
            {detectedLanguage === 'hi'
              ? 'पूछें: "कार्बन क्रेडिट्स कैसे कमाएं?"'
              : 'Ask: "How to earn carbon credits?"'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;