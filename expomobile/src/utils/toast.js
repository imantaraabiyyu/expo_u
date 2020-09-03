import { Toast } from 'native-base';

export function showError(error) {
  Toast.show({
    text: error,
    buttonText: 'OK',
    type: 'danger',
    duration: 3000
  });
}
export function showSaveSuccess(message) {
  Toast.show({
    text: message,
    buttonText: 'OK',
    type: 'success',
    duration: 3000
  });
}
