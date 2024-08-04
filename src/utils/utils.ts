import { Response } from 'express';
import { NextResponse } from 'next/server';
// utils/formatDate.js
import { format } from 'date-fns';
import { sql } from 'drizzle-orm';


export function cleanText(text:string) {
  // Remove index numbers and dots
  let cleanedText = text
  
  // Remove &nbsp; and replace with a normal space
  cleanedText = cleanedText.replace(/&nbsp;/g, ' ');
  
  return cleanedText;
}

export const likeInsensitive = (column:any, value:any) => {
  return sql`${sql.raw('LOWER(')}${column}${sql.raw(')')} LIKE LOWER(${value})`;
};

export function formatDate(isoDateString:string) {
  // Parse the ISO date string into a Date object
  const date = new Date(isoDateString);
  
  // Format the date as "25 JUNE 2024"
  return format(date, 'dd MMMM yyyy').toUpperCase();
}



export const truncateText = (text: string, maxLength: number) => {
  if (text?.length <= maxLength) return text;
  return text?.slice(0, maxLength) + '...';
};


export const formatDate_into_month_date_string = (dateString:string) => {
  const options:any = { year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};



type IApiReponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
};

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export const sendResponse = <T>(res: any, data: IApiReponse<T>): void => {
  const responseData: IApiReponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null || undefined,
    data: data.data || null || undefined,
  };

  res.json(responseData);
};


