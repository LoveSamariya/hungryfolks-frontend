import { faTableList, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useCallback, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';
import { useThemeAwareObject } from '../../hooks/themeAwareObject';
import Card from '../../shared/UI/Card/Card';
import { Heading1 } from '../../shared/UI/TypoGraphy/Typography';
import Search from './components/Search';
import { useGetMainCategoryQuery } from './recipes.services';
import qs from 'qs';
import NoData from '../../shared/UI/NoData/NoData';
import { CustomStatusBar, LoaderLayout } from '../../shared';
import { useTheme } from '../../context/thme.context';
const createStyles = theme => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.color.pageBgColor,
      color: theme.color.onSurface,
      padding: theme.spacing[5],
      fontFamily: 'RobotoCondensed-Bold',
    },
    bottomGap: {
      marginBottom: 42,
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      marginLeft: -4,
      marginRight: -4,
      flexWrap: 'wrap',
    },
    col: {
      width: '50%',
      paddingLeft: theme.spacing[1],
      paddingRight: theme.spacing[1],
    },
    text: {
      color: theme.color.onPrimary,
      fontSize: 14,
    },
    headingGap: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: theme.spacing[7],
      marginBottom: theme.spacing[3],
    },
    img: {
      maxWidth: '100%',
      height: '100%',
    },
    onSurface: {
      color: theme.color.onSurface,
    },
    headingIcon: {
      marginRight: theme.spacing[2],
    },
  });
  return styles;
};

export default function MainCategoryScreen({ navigation }) {
  const Styles = useThemeAwareObject(createStyles);
  const { theme } = useTheme();
  const [searchValue, setSearchValue] = useState('');

  const { data, error, isLoading } = useGetMainCategoryQuery(
    qs.stringify({ searchText: searchValue }),
  );

  const { mainCategories } = data || {};

  const onCardPressed = (id, name) => {
    navigation.navigate('SubCategory', {
      id,
      name,
    });
  };

  const onSearchValueChange = useCallback(val => {
    setSearchValue(val);
  }, []);

  return (
    <>
      <CustomStatusBar variant="primary" />

      <SafeAreaView style={Styles.container}>
        <View style={Styles.bottomGap}>
          <View style={{ paddingBottom: 8 }}>
            <SafeAreaView
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{ flex: 1 }}>
                <Search
                  placeholder="Search categories"
                  onSearchValueChange={onSearchValueChange}
                />
              </View>
              <View style={{ marginLeft: 8 }}>
                <TouchableHighlight
                  underlayColor="transperent"
                  onPress={() => {
                    navigation.navigate('Profile');
                  }}>
                  <FontAwesomeIcon
                    icon={faBars}
                    fill={theme.color.highlight1}
                    size={24}
                  />
                </TouchableHighlight>
              </View>
            </SafeAreaView>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View style={{ paddingBottom: 64 }}>
              <LoaderLayout isLoading={isLoading}>
                <View style={Styles.headingGap}>
                  <FontAwesomeIcon
                    icon={faTableList}
                    size={24}
                    style={{ ...Styles.onSurface, ...Styles.headingIcon }}
                  />
                  <Heading1>Main categories</Heading1>
                </View>

                <View style={Styles.row}>
                  {mainCategories?.map(({ name, id, image }) => {
                    return (
                      <View style={Styles.col} key={name}>
                        <Card
                          title={name}
                          onCardPressed={() => onCardPressed(id, name)}>
                          <Image style={Styles.img} source={{ uri: image }} />
                        </Card>
                      </View>
                    );
                  })}
                </View>
              </LoaderLayout>
            </View>
          </ScrollView>
          {!mainCategories?.length && !isLoading && <NoData />}
        </View>
      </SafeAreaView>
    </>
  );
}
