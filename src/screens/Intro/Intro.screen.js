import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { CustomCarousel, CustomOverlay, CustomStatusBar } from '../../shared';
import useIntroStyle from './Intro.style';
import { setIntroPassedClientSide } from '../../services/auth/auth.slice';

const data = [
  {
    slideTitle: 'Recipes by \nMain Categories',
    slideDescription:
      'Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porta facilisis vehicula. Fusce in est et nisl tempor tempus ornare ac turpis.',
  },
  {
    slideTitle: 'Recipes based on \nIngredients',
    slideDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porta facilisis vehicula. Fusce in est et nisl tempor tempus ornare ac turpis.',
  },
  {
    slideTitle: 'Save your \nFavourite Ingredients',
    slideDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porta facilisis vehicula. Fusce in est et nisl tempor tempus ornare ac turpis.',
  },
];

const dataHighlightImage = [
  require('../../assets/images/intro/intro_1.jpg'),
  require('../../assets/images/intro/intro_2.jpg'),
  require('../../assets/images/intro/intro_3.jpg'),
  require('../../assets/images/intro/intro_4.jpg'),
];

const dataDetailSlider = data;
const dataImageSlider = dataHighlightImage;

export default function IntroScreen({ navigation }) {
  const Styles = useIntroStyle();
  const detailsCarouselRef = React.useRef(null);
  const imageCarouselRef = React.useRef(null);

  const renderItem = React.useCallback(
    ({ item }) => {
      return (
        <View style={Styles.carouselItem}>
          <Text style={Styles.slideTitle}>{item.slideTitle}</Text>
          <Text style={Styles.slideDescription}>{item.slideDescription}</Text>
        </View>
      );
    },
    [Styles],
  );
  const renderImageSliderItem = React.useCallback(
    ({ item, index }) => {
      return <Image source={item} style={Styles.imageSliderImage} />;
    },
    [Styles],
  );

  const handleIntroEnd = () => {
    navigation.replace('Welcome');
    setIntroPassedClientSide('1');
  };

  const isLastDetailSlide = () => {
    if (!(detailsCarouselRef && detailsCarouselRef.current)) return;
    return (
      dataDetailSlider.length === detailsCarouselRef.current.currentIndex + 1
    );
  };

  const detailSliderNextSlide = () => {
    if (!(detailsCarouselRef && detailsCarouselRef.current)) return;
    if (isLastDetailSlide()) {
      handleIntroEnd();
    }
    return detailsCarouselRef.current.snapToNext();
  };

  return (
    <>
      <CustomStatusBar variant="transparentLight" />
      <View style={Styles.page}>
        <View style={Styles.imageSliderContainer}>
          <CustomCarousel
            carouselRef={imageCarouselRef}
            data={dataImageSlider}
            renderItem={renderImageSliderItem}
            pagination={false}
            autoplayInterval={5000}
            scrollEnabled={false}
            loop
            autoplay
          />
          <CustomOverlay />
        </View>

        <View style={Styles.stickyContainer}>
          <TouchableOpacity
            style={Styles.skipButton}
            onPress={() => {
              handleIntroEnd();
            }}>
            <Text style={Styles.skipText}>Skip</Text>
          </TouchableOpacity>
          <TouchableHighlight
            onPress={() => {
              detailSliderNextSlide();
            }}
            style={{ ...Styles.goNext }}>
            <View>
              <View
                style={{
                  ...Styles.vhCenter,
                  height: '100%',
                  borderRadius: 84 / 2,
                }}>
                <FontAwesomeIcon icon={faAngleRight} size={36} color={'#fff'} />
              </View>
            </View>
          </TouchableHighlight>
          <CustomCarousel
            carouselRef={detailsCarouselRef}
            data={dataDetailSlider}
            renderItem={renderItem}
            containerCustomStyle={Styles.sliderContainerCustomStyle}
            useScrollView
            scrollEnabled={false}
          />
        </View>
      </View>
    </>
  );
}
