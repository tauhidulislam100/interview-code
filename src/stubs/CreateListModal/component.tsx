import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, HelperText} from 'react-native-paper';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {CREATE_LIST, RootState} from '../../store/types';
import {useNavigation} from '@react-navigation/native';
import {CommonDialog} from '../../components/ui/CommonDialog';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Can’t be blank')
    .max(255, 'Max length is 255 chars'),
  description: Yup.string()
    .required('Can’t be blank')
    .max(1000, 'Max length is 1000 chars'),
});

const CreateListModal = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const error = useSelector((state: RootState) => state.error);
  const loading = useSelector((state: RootState) => state.loading);
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {name: '', description: ''},
    validationSchema,
    onSubmit: values => {
      dispatch({type: CREATE_LIST, payload: values});
      setSubmitted(true);
    },
  });

  useEffect(() => {
    if (!loading && !error && submitted) {
      setSubmitted(false);
      navigation.goBack();
    }
  }, [loading, submitted, error]);

  return (
    <>
      <View style={styles.container}>
        <TextInput
          mode="outlined"
          label="Name"
          onChangeText={formik.handleChange('name')}
          onBlur={formik.handleBlur('name')}
          value={formik.values.name}
        />
        <HelperText type="error" visible={!!formik.errors?.name}>
          {formik.errors.name}
        </HelperText>
        <TextInput
          mode="outlined"
          label="Description"
          onChangeText={formik.handleChange('description')}
          onBlur={formik.handleBlur('description')}
          value={formik.values.description}
        />
        <HelperText type="error" visible={!!formik.errors?.description}>
          {formik.errors.description}
        </HelperText>
        <Button
          loading={loading}
          disabled={loading}
          mode="contained"
          onPress={() => formik.handleSubmit()}>
          Create
        </Button>
      </View>

      <CommonDialog
        visible={!!error && submitted}
        onDismissSnackBar={() => {}}
        message={error}
        color="red"
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});

export default CreateListModal;
