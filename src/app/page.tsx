'use client'

import React, {useState, useEffect, ChangeEvent, Suspense} from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface RandomStringGeneratorProps {
  defaultPrefix?: string;
  defaultLength?: number;
}

const RandomStringGenerator: React.FC<RandomStringGeneratorProps> = ({ defaultPrefix = '', defaultLength = 10 }) => {
  const [randomString, setRandomString] = useState<string>('');
  const [prefix, setPrefix] = useState<string>(defaultPrefix);
  const [length, setLength] = useState<number>(defaultLength);
  const searchParams = useSearchParams();
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
    const currentPrefix = searchParams.get('prefix') || '';
    const currentLength = searchParams.get('length') || '4';
    if (currentPrefix !== prefix || currentLength !== length.toString()) {

      const url = new URL(window.location.toString());
      url.searchParams.delete("prefix");
      url.searchParams.delete("length");

      url.searchParams.append("prefix", prefix);
      url.searchParams.append("length", length.toString());
      window.history.pushState({}, "", url);
    }
  }, [prefix, length, router, searchParams]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Prefix:
        </label>
        <input
          type="text"
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Length:
        </label>
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value, 10))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Generate!
      </button>
      <p className="mt-4 text-gray-700 text-lg">{randomString}</p>
    </div>
  );
};

const Sub: React.FC = () => {
  const searchParams = useSearchParams();
  const prefix = searchParams.get('prefix') as string || '';
  const length = searchParams.get('length') as string || '4';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-5xl font-extrabold text-blue-600 mb-10">Random Moji Kun</h1>
      <RandomStringGenerator defaultPrefix={prefix} defaultLength={parseInt(length)}/>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense>
      <Sub />
    </Suspense>
  );
}