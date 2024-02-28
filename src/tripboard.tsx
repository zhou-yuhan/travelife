import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

export const TripBoard = () => {
    const filePath = './example.md';
    const [markdownText, setMarkdownText] = useState('');

    useEffect(() => {
      async function fetchMarkdownFile() {
        try {
          const response = await fetch(filePath);
          const text = await response.text();
          setMarkdownText(text);
        } catch (error) {
          console.error('Error fetching markdown file:', error);
        }
      }
  
      fetchMarkdownFile();
    }, [filePath]);

    return (
        <Markdown rehypePlugins={[rehypeRaw]}>{markdownText}</Markdown>
    )
}