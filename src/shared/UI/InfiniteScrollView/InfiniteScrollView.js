import React from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from '../../../context/thme.context';
import { Loader } from '../Loader';

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
  containerStyle,
  ...props
}) {
  const { theme } = useTheme(); // Theme specific

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
      <View style={containerStyle}>
        {children}

        {isFetching && <Loader color={theme.color.highlight1} />}
      </View>
    </ScrollView>
  );
}
