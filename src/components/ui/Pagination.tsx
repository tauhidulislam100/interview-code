import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {Button, Text} from 'react-native-paper';

interface PaginationProps {
  totalPages: number;
  current: number;
  onChange?: (page: number) => void;
}

const Pagination = ({totalPages, current, onChange}: PaginationProps) => {
  const [currentPage, setCurrentPage] = React.useState(current);
  const [startPage, setStartPage] = React.useState(current);

  const handleNext = () => {
    setCurrentPage(prevPage => {
      const curr = prevPage + 1;
      onChange?.(curr);
      return curr;
    });
    if (currentPage - startPage >= 2) {
      setStartPage(prevStartPage => prevStartPage + 1);
    }
  };

  const handlePrev = () => {
    setCurrentPage(prevPage => {
      const curr = prevPage - 1;
      onChange?.(curr);
      return curr;
    });
    if (startPage > 1 && currentPage - startPage < 2) {
      setStartPage(prevStartPage => prevStartPage - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Button disabled={currentPage === 1} onPress={handlePrev}>
        Previous
      </Button>

      {[...Array(totalPages).fill(0)]
        .slice(startPage - 1, startPage + 5)
        .map((_, index) => (
          <TouchableHighlight
            underlayColor={'purple'}
            key={index}
            style={[
              styles.button,
              currentPage === startPage + index && {backgroundColor: 'purple'},
            ]}
            onPress={() => {
              onChange?.(startPage + index);
              setCurrentPage(startPage + index);
            }}>
            <Text
              style={[
                currentPage === startPage + index && {fontWeight: '700'},
                styles.buttonText,
              ]}>
              {startPage + index}
            </Text>
          </TouchableHighlight>
        ))}
      {totalPages > startPage + 5 && <Text>...</Text>}
      <Button disabled={currentPage >= totalPages} onPress={handleNext}>
        Next
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: 50,
    bottom: 0,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
  },
});

export default Pagination;
