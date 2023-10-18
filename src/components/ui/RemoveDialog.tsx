import {Portal, Dialog, Paragraph, Button} from 'react-native-paper';

export const RemoveDialog = ({
  visible,
  hideDialog,
  onOkPress,
}: {
  visible: boolean;
  hideDialog: () => void;
  onOkPress: () => void;
}) => (
  <Portal>
    <Dialog visible={visible} onDismiss={hideDialog}>
      <Dialog.Content>
        <Paragraph>Do you want to delete list?</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button>Cancel</Button>
        <Button onPress={onOkPress}>Ok</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);
