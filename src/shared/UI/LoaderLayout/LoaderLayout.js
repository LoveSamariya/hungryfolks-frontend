import React from 'react';
import Loader from '../Loader/Loader';

export default function LoaderLayout({ isLoading, children }) {
  return isLoading ? <Loader /> : children;
}
