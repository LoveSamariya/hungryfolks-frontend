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
  Alert,
} from 'react-native';
import { useThemeAwareObject } from '../../hooks/themeAwareObject';
import Card from '../../shared/UI/Card/Card';
import { Heading1 } from '../../shared/UI/TypoGraphy/Typography';
import Search from './components/Search';
import { useGetMainCategoryQuery } from './recipes.services';
import qs from 'qs';
import NoData from '../../shared/UI/NoData/NoData';
import {
  CustomStatusBar,
  InfiniteScrollView,
  LoaderLayout,
} from '../../shared';
import { useTheme } from '../../context/thme.context';
import { PAGE_SIZE } from '../../constants/constants';
import { numberOfPages } from '../../shared/helperFunctions';

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

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetMainCategoryQuery(
    qs.stringify({ pageNumber, pageSize: PAGE_SIZE }),
  );

  // const { data, isLoading, isFetching } = useGetMainCategoryQuery(
  //   qs.stringify({ pageNumber, pageSize: PAGE_SIZE }),
  // );

  const [mainCategories, setMainCategories] = useState([]);

  React.useEffect(() => {
    const preArray = [...mainCategories];
    if (!data?.mainCategories?.length) return;
    setMainCategories([]);
    setMainCategories([...preArray, ...data?.mainCategories]);
  }, [qs.stringify(data)]);

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
          <InfiniteScrollView
            isFetching={isFetching}
            totalRecords={data?.totalRecords}
            pageSize={PAGE_SIZE}
            pageNumber={pageNumber}
            onFetchNext={() => setPageNumber(pageNumber + 1)}>
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
                  {mainCategories?.map(({ name, id, image }, index) => {
                    return (
                      <View style={Styles.col} key={`${id}${index}`}>
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
          </InfiniteScrollView>
          {!mainCategories?.length && !isLoading && <NoData />}
        </View>
      </SafeAreaView>
    </>
  );
}
