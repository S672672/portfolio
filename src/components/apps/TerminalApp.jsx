import React, { useState, useRef, useEffect, useCallback } from 'react';
import { executeCommand } from '../../utils/commandRegistry';
import { parseNaturalLanguage } from '../../utils/terminalParser';

const WELCOME = `Welcome to SmithOS Terminal v1.0
Type "help" to see available commands.

You can explore Smith's portfolio using commands like:
  about, projects, skills, experience, journey
  project <name>  (e.g., project pet adopt)
  ls, cd, cat     (file-system style navigation)
  Or ask questions naturally like:
  "what technologies were used in pet adopt?"

`;

export default function TerminalApp() {
  const [lines, setLines] = useState([{ type: 'output', text: WELCOME }]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDir, setCurrentDir] = useState('/');
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  // Auto-focus
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!input.trim()) return;

      const cmd = input.trim();
      setHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);

      // Show the command
      setLines((prev) => [...prev, { type: 'command', text: cmd, dir: currentDir }]);

      // Try structured command first
      const result = executeCommand(cmd, currentDir);

      if (result.output === '__CLEAR__') {
        setLines([]);
        setInput('');
        return;
      }

      if (result.output) {
        if (result.output.startsWith('Command not recognized:')) {
          const nlResult = parseNaturalLanguage(cmd);
          if (nlResult) {
            setLines((prev) => [...prev, { type: 'output', text: nlResult }]);
          } else {
            setLines((prev) => [...prev, { type: 'output', text: result.output }]);
          }
        } else {
          setLines((prev) => [...prev, { type: 'output', text: result.output }]);
        }
      } else if (!result.output && result.newDir !== currentDir) {
        // cd with no output
      }

      setCurrentDir(result.newDir);
      setInput('');
    },
    [input, currentDir]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length === 0) return;
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex === -1) return;
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    },
    [history, historyIndex]
  );

  return (
    <div
      className="terminal-body os-scrollbar"
      ref={scrollRef}
      onClick={() => inputRef.current?.focus()}
      style={{ height: '100%', cursor: 'text' }}
    >
      {lines.map((line, i) => (
        <div key={i} className="terminal-line">
          {line.type === 'command' ? (
            <div>
              <span style={{ color: 'var(--os-green)' }}>smith@smithos</span>
              <span style={{ color: 'var(--os-accent)' }}> {line.dir} $ </span>
              <span>{line.text}</span>
            </div>
          ) : (
            <pre style={{ margin: 0, fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>{line.text}</pre>
          )}
        </div>
      ))}

      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ color: 'var(--os-green)', flexShrink: 0 }}>smith@smithos</span>
        <span style={{ color: 'var(--os-accent)', flexShrink: 0 }}> {currentDir} $ </span>
        <input
          ref={inputRef}
          type="text"
          className="terminal-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          style={{ flex: 1 }}
        />
      </form>
    </div>
  );
}
