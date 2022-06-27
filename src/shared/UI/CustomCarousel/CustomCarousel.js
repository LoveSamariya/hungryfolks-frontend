import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useWindowDimensions, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useThemeAwareObject } from '../../../hooks/themeAwareObject';

const createStyles = theme => {
  const styles = StyleSheet.create({
    dotStyle: {
      width: 24,
      height: 8,
      borderRadius: 100,
      backgroundColor: theme.color.highlight1,
    },
    inactiveDotStyle: {
      width: 14,
      height: 14,
      backgroundColor: theme.color.gray3,
    },
  });
  return styles;
};

export default function CustomCarousel({
  data,
  renderItem,
  pagination = true,
  paginationProps: { dotStyle, inactiveDotStyle, ...restPaginationProps } = {},
  carouselRef,
  onSnapToItem,
  ...props
}) {
  const Styles = useThemeAwareObject(createStyles);
  const [activeSlide, setActiveSlide] = useState(0);

  const { width } = useWindowDimensions();
  const SLIDER_WIDTH = width;
  const ITEM_WIDTH = width;

  const detailSliderNextSlide = () => {
    carouselRef.snapToNext();
  };
  return (
    <>
      <View>
        <Carousel
          ref={carouselRef}
          data={data}
          renderItem={renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          onSnapToItem={index => {
            onSnapToItem && onSnapToItem(index);
            setActiveSlide(index);
          }}
          {...props}
        />
      </View>
      <View>
        {!!pagination && (
          <Pagination
            carouselRef={carouselRef}
            dotsLength={data.length}
            activeDotIndex={activeSlide}
            tappableDots={true}
            dotStyle={{
              ...Styles.dotStyle,
              ...dotStyle,
            }}
            inactiveDotStyle={{
              ...Styles.inactiveDotStyle,
              ...inactiveDotStyle,
              // Define styles for inactive dots here
            }}
            inactiveDotOpacity={0.4}
            {...restPaginationProps}
          />
        )}
      </View>
    </>
  );
}
