import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

// styles
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors} from '../../styles/colors';

// icons
import {IconAdd} from '../../assets/icons/main/IconAdd';

// components
import PlainButton from '../../components/buttons/PlainButton';
import ProfileWorkCard from './components/ProfileWorkCard';

// services
import {getEmployee} from '../../services/EmployeesService';

export const MyExperienceScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [works, setWorks] = useState([]);

  useEffect(() => {
    function fetchData() {
      return navigation.addListener('focus', async () => {
        try {
          const res = await getEmployee();
          setWorks(res.data.works);
          setLoading(false);
        } catch (e) {
          console.log('MyExperienceScreen err: ', e);
        }
      });
    }
    fetchData();
  }, [navigation]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <Header
        onClose={() => navigation.goBack()}
        title={'Мой опыт работы'}
        goBack
      />
      {loading ? (
        <View style={globalStyles.fullScreenSection}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView>
          {works.map((item, index) => (
            <ProfileWorkCard
              key={index}
              item={item}
              edit={() => {
                navigation.navigate('EditWorkScreen', {value: item});
              }}
              rate={() => {
                navigation.navigate('CompanyReview', {id: item.id});
              }}
            />
          ))}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddWork');
            }}
            style={[globalStyles.section, globalStyles.mt3, globalStyles.mb3]}>
            <PlainButton
              onPress={() => {
                navigation.navigate('AddWork');
              }}
              btnStyle={{...globalStyles.mt3, ...globalStyles.mb3}}
              labelStyle={globalStyles.ml3}
              label={'Добавить опыт работы'}>
              <IconAdd
                style={globalStyles.mr3}
                color={PrimaryColors.brand}
                size={16}
                width={2}
              />
            </PlainButton>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
