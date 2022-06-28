import React from 'react';
import { ScrollView } from 'react-native';

export function numberOfPages(totalRecords, pageSize) {
  return Math.ceil(totalRecords / pageSize);
}

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export default function InfiniteScrollView({
  disabled,
  children,
  isFetching,
  totalRecords,
  pageNumber,
  pageSize,
  onFetchNext,
  ...props
}) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      onScroll={({ nativeEvent }) => {
        if (disabled) return;
        if (isCloseToBottom(nativeEvent)) {
          if (
            isFetching ||
            pageNumber + 1 > numberOfPages(totalRecords, pageSize)
          )
            return;
          onFetchNext();
        }
      }}
      scrollEventThrottle={400}
      {...props}>
      {children}
    </ScrollView>
  );
}
