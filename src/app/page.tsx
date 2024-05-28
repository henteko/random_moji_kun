'use client'

import React, { useState, useEffect, ChangeEvent } from "react";
import {useRouter, useSearchParams} from "next/navigation";

interface RandomStringGeneratorProps {
  defaultPrefix?: string;
  defaultLength?: number;
}

const RandomStringGenerator: React.FC<RandomStringGeneratorProps> = ({ defaultPrefix = '', defaultLength = 10 }) => {
  const [randomString, setRandomString] = useState<string>('');
  const [prefix, setPrefix] = useState<string>(defaultPrefix);
  const [length, setLength] = useState<number>(defaultLength);
  const router = useRouter();

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

  useEffect(() => {
    router.push('/?prefix=' + prefix + '&length=' + length.toString());
  }, [prefix, length, router]);

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
  const searchParams = useSearchParams()
  const prefix = searchParams.get('prefix') as string;
  const length = searchParams.get('length') as string;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RandomStringGenerator defaultPrefix={prefix} defaultLength={parseInt(length)} />
    </main>
  );
}
