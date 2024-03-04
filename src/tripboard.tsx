import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

const noNotesFound = `
# No Notes Found
## What to do next?
- Record your travelife trip or
- Check if the note path exists in \`trip.json\`
`

interface Props {
    fileName: string;
}

export const TripBoard = ({ fileName }: Props) => {
    const [markdownText, setMarkdownText] = useState('No Notes Found');

    useEffect(() => {
        async function fetchMarkdownFile() {
            try {
                const response = await fetch(fileName);
                // console.log(response);
                if (!response.ok) {
                    if (response.status == 404) {
                        alert("Note not found"); // TODO: more friendly error message
                    } else {
                        alert("Error: " + response.status + " " + response.statusText);
                    }
                    return;
                }
                const text = await response.text();
                if (text.includes("<!DOCTYPE html>")) { // FIXME: not a good way to detect HTML
                    setMarkdownText(noNotesFound);
                }
                else {
                    setMarkdownText(text);
                }
            } catch (error) {
                alert('Error fetching markdown file:' + error);
            }
        }

        fetchMarkdownFile();
    }, [fileName]);

    return (
        <Markdown rehypePlugins={[rehypeRaw]}>{markdownText}</Markdown>
    )
}