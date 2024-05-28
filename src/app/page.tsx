'use client'

import {useState} from "react";

const RandomStringGenerator: React.FC = () => {
  const [randomString, setRandomString] = useState<string>('');
  const [prefix, setPrefix] = useState<string>('');
  const [length, setLength] = useState<number>(10);

  const generateRandomString = (prefix: string, length: number): string => {
    const characters = '0123456789';
    let result = prefix;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleClick = () => {
    const newRandomString = generateRandomString(prefix, length);
    setRandomString(newRandomString);
  };

  return (
    <div>
      <div>
        <label>
          Prefix:
          <input type="text" value={prefix} onChange={(e) => setPrefix(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Length:
          <input type="number" value={length} onChange={(e) => setLength(parseInt(e.target.value, 10))} />
        </label>
      </div>
      <button onClick={handleClick}>ランダム文字生成</button>
      <p>{randomString}</p>
    </div>
  );
};


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RandomStringGenerator />
    </main>
  );
}
