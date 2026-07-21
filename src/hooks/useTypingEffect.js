import { useState, useEffect } from 'react';

/**
 * Hook to simulate real-time typing animation for AI responses
 */
export function useTypingEffect(fullText = '', speed = 15, onComplete = null) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!fullText) {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    let index = 0;

    const timer = setInterval(() => {
      index++;
      setDisplayedText(fullText.substring(0, index));

      if (index >= fullText.length) {
        clearInterval(timer);
        setIsTyping(false);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [fullText, speed]);

  return { displayedText, isTyping };
}
