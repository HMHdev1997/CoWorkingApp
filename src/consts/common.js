import Toast from "react-native-toast-message";
import { Dimensions } from "react-native";
export const isEmpty = (str) => {
  return (!str || str.length === 0);
}

export const isNull = (value) => {
  return (value === null || value === undefined)
}

export const windowsHeight = Dimensions.get("window").height;
export const windowsWith = Dimensions.get("window").width;

export const TYPE_NOTI = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
}
export const showToast = (type, title, mess) => {
  if (isEmpty(title)) {
    if (type === TYPE_NOTI.ERROR) {
      title = 'Có gì đó sai rồi ...'
    } else if (type === TYPE_NOTI.SUCCESS) {
      title = 'Thành công'
    } else if (type === TYPE_NOTI.INFO) {
      title = 'Thông tin'
    }
  }
  Toast.show({
    type: type,
    text1: title,
    text2: mess
  });
}

export const handleErrorAuth = (code) => {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'Email đã được sử dụng. Vui lòng thử lại'

    case 'auth/invalid-email':
      return 'Email không đúng định dạng. Vui lòng thử lại'

    case 'auth/user-not-found':
      return 'Email không đúng. Vui lòng thử lại'

    case 'auth/wrong-password':
      return 'Mật khẩu không đúng. Vui lòng thử lại'

    case 'auth/too-many-requests':
      return 'Thực hiện sai quá nhiều. Vui lòng thử lại sau'

    default:
      return 'Lỗi này lạ quá. Vui lòng thử lại hoặc liên hệ admin'
  }
}

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validatePhone = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/
    );
};

export const mergeByProperty = (target, source, prop) => {
  source.forEach(sourceElement => {
    let targetElement = target.find(targetElement => {
      return sourceElement[prop] === targetElement[prop];
    })
    targetElement ? Object.assign(targetElement, sourceElement) : target.push(sourceElement);
  })
}