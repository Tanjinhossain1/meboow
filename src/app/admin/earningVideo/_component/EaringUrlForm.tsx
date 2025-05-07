'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';

type FormValues = {
  videoUrl: string;
  income: string;
};

function extractYouTubeVideoId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname === 'youtu.be') {
      return parsedUrl.pathname.slice(1);
    }

    if (
      parsedUrl.hostname.includes('youtube.com') &&
      parsedUrl.pathname === '/watch'
    ) {
      return parsedUrl.searchParams.get('v');
    }

    return null;
  } catch (err) {
    return null;
  }
}

export default function UploadVideoComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setMessage('');

    const videoId = extractYouTubeVideoId(data.videoUrl);

    if (!videoId) {
      setMessage('Invalid YouTube URL.');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/earning/uploadurl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          video: videoId,
          income: data.income,
        }),
      });

      if (res.ok) {
        setMessage('Video uploaded successfully!');
        reset();
        setTimeout(() => {
            setMessage('')
        }, 1000);
      } else {
        const errData = await res.json();
        setMessage(errData?.error || 'Upload failed.');
      }
    } catch (err) {
      setMessage('Server error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
       <Link href={'/admin'}> <Button variant='contained' >Back</Button></Link>
      <h1 className="text-2xl font-bold mb-4">Upload YouTube Video URL</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">YouTube URL</label>
          <input
            {...register('videoUrl', { required: 'Video URL is required' })}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="https://www.youtube.com/watch?v=..."
          />
          {errors.videoUrl && (
            <p className="text-red-500 text-sm">{errors.videoUrl.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Income</label>
          <input
            {...register('income', { required: 'Income is required' })}
            type="number" 
            step="0.01"
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Enter income"
          />
          {errors.income && (
            <p className="text-red-500 text-sm">{errors.income.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {message && <p className="mt-4 text-sm text-center text-green-600">{message}</p>}
    </div>
  );
}
