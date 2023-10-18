import {Snackbar} from 'react-native-paper';

export const CommonDialog = ({
  message = 'Oops, something went wrong',
  color = 'black',
  visible,
  onDismissSnackBar,
}: {
  message?: string;
  color?: string;
  visible: boolean;
  onDismissSnackBar: () => void;
}) => (
  <Snackbar
    duration={300}
    style={{backgroundColor: color}}
    visible={visible}
    onDismiss={onDismissSnackBar}>
    {message}
  </Snackbar>
);
