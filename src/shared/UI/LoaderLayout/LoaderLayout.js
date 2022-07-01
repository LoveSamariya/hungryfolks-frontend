import React from 'react';
import { useTheme } from '../../../context/thme.context';
import Loader from '../Loader/Loader';

export default function LoaderLayout({ isLoading, children }) {
  const { theme } = useTheme();
  return isLoading ? <Loader color={theme.color.highlight2} /> : children;
}
