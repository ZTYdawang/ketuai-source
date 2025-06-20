import { useState, useEffect } from 'react';

export const useTypeLines = (content: string, shouldStart: boolean) => {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (!shouldStart || !content) return;
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex >= content.length) {
        clearInterval(interval);
        return;
      }
      
      setTyped(prev => prev + content[currentIndex]);
      currentIndex++;
    }, 30); // 每30ms输出一个字符
    
    return () => clearInterval(interval);
  }, [content, shouldStart]);

  return typed;
}; 