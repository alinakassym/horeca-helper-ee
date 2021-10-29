import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {searchJobs} from '../../services/JobsService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {JobCard} from '../../components/jobs/JobCard';
import {IconFilter} from '../../assets/icons/main/IconFilter';
import {IconArrowDown} from '../../assets/icons/main/IconArrowDown';
import {useSelector} from 'react-redux';

export const JobsScreen = ({navigation}) => {
  const filterState = useSelector(state => state.jobs.filter);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function fetchData() {
      const unsubscribe = navigation.addListener('focus', async () => {
        // The screen is focused
        const hhToken = await AsyncStorage.getItem('hhToken');
        searchJobs(filterState, hhToken)
          .then(result => {
            setJobs(result.data.items);
            setLoading(false);
          })
          .catch(e => {
            console.log('searchJobs err:', e);
          });
      });

      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    }
    fetchData();
  }, [filterState, navigation]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Astana</Text>
        <Text style={styles.title}>123</Text>
      </View>
      <View style={globalStyles.topBar}>
        <TouchableOpacity
          style={globalStyles.filterBtn}
          onPress={() => {
            navigation.navigate('JobsFilterScreen');
          }}>
          <IconFilter color={'#185AB7'} size={32} width={1.5} />
          <Text style={globalStyles.filterBtnRightText}>Filters</Text>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyles.filterBtn}>
          <Text style={globalStyles.filterBtnLeftText}>Order by</Text>
          <IconArrowDown color={'#767676'} size={24} width={1.5} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.section}>
          {jobs &&
            jobs.map((item, index) => (
              <JobCard
                onPress={() => {
                  navigation.navigate('JobScreen', {jobId: item.id});
                }}
                key={index}
                item={item}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topSection: {
    marginTop: 16,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: '#000000',
  },
  section: {
    paddingTop: 14,
    paddingLeft: 14,
    paddingRight: 14,
  },
  btn: {
    marginBottom: 16,
  },
});
