import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { GET_CONTACTS } from '../../graphql/queries/Contact';
import { useQuery } from '@apollo/client';

import Contact from './Contact';
import Loading from './Loading';

export interface Contacts {
  index: number;
  name: string | null;
}


const ContactList: React.FC<any> = ({ navigation, variables }: any) => {
  const { loading, error, data } = useQuery(GET_CONTACTS, { variables });

  if (error) {
    console.log(error);
  }

  const contactItem = ({ item }: { item: Contacts }) => (
    <Contact name={item.name} navigation={navigation} />
  );

  let contacts = [];
  if (data) {
    contacts = data.search.map((element: any, idx: number) => {
      return { index: idx, name: element.contact?.name || 'Unknown Name' };
    });
  }
  return (
    <View style={styles.contactList}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={contacts}
          renderItem={contactItem}
          keyExtractor={(item) => item.index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contactList: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default ContactList;
