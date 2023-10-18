import React, {useCallback, useEffect, useState} from 'react';

import {StyleSheet, FlatList, Text, View} from 'react-native';
import {
  IconButton,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {DELETE_LIST, FETCH_LIST, RootState} from '../../store/types';
import {useIsFocused} from '@react-navigation/native';
import {RemoveDialog} from '../../components/ui/RemoveDialog';
import {CommonDialog} from '../../components/ui/CommonDialog';
import Pagination from '../../components/ui/Pagination';

const Lists = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const lists = useSelector((state: RootState) => state.lists);
  const totalPages = useSelector((state: RootState) => state.totalPages);
  const loading = useSelector((state: RootState) => state.loading);
  const error = useSelector((state: RootState) => state.error);
  const isFocused = useIsFocused();
  const [selectedId, setSelectedId] = useState<number>();
  const [currentPage, setCurrentPage] = useState(1);

  const showModal = (id?: number) => {
    setSelectedId(id);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const hideSnackbar = () => {
    setSnackbarVisible(false);
  };

  const confirmDelete = useCallback(() => {
    dispatch({type: DELETE_LIST, payload: selectedId});
    setSelectedId(undefined);
    setModalVisible(false);
    setSnackbarVisible(true);
  }, [selectedId]);

  useEffect(() => {
    if (isFocused) {
      dispatch({type: FETCH_LIST, payload: currentPage});
    }
  }, [isFocused, currentPage]);

  return (
    <>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <FlatList
          ListFooterComponent={
            totalPages ? (
              <Pagination
                current={currentPage}
                totalPages={totalPages}
                onChange={setCurrentPage}
              />
            ) : null
          }
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{flex: lists.length === 0 ? 1 : 0}}
          data={lists}
          renderItem={({index}) => (
            <Card style={styles.card}>
              <Card.Content>
                <Title>{lists[index].name}</Title>
                <Paragraph>{lists[index].description}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <IconButton
                  icon="delete-outline"
                  onPress={() => showModal(lists[index].id)}
                />
              </Card.Actions>
            </Card>
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text>No results</Text>
            </View>
          }
        />
      )}

      <RemoveDialog
        visible={modalVisible}
        hideDialog={hideModal}
        onOkPress={confirmDelete}
      />

      <CommonDialog
        message={error}
        color="red"
        visible={!!error && snackbarVisible}
        onDismissSnackBar={hideSnackbar}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    marginTop: 20,
  },
});

export default Lists;
