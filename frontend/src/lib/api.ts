import { hc } from 'hono/client';
import { type ApiRoutes } from '@server/app';

// import './App.css';
const client = hc<ApiRoutes>('/');

export const api = client.api;
