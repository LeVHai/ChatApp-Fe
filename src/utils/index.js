import moment from 'moment';
import i18n from '../i18n';

export const isSuccess = (response)=>{
    return response.status == 200 && response.data.status
}

export const formatTime = (obj) => {
  return moment(obj).fromNow(true);
};

export const formatDate = (obj) => {
  const now = moment(moment().toArray());
  const time = moment(obj);
  if (now.diff(time, 'years')) {
    return moment(obj).format('DD/MM/YY, k:mm');
  } else if (now.diff(time, 'months') || now.diff(time, 'weeks')) {
    return moment(obj).format('MMM DD YYYY, k:mm');
  } else if (now.diff(time, 'days')) {
    return moment(obj).format('ddd k:mm');
  } else {
    return moment(obj).format('k:mm');
  }
};

export const diffSeconds = (timeIn, timeOut) => {
    var a = moment(timeIn);
    var b = moment(timeOut);
    return a.diff(b) / 1000;
}
export const chatLogTime = (time) => {
    const seconds = diffSeconds(new Date(), moment(time));
    
    if (seconds < 60) {
        return `Vừa xong`;
    } else if (seconds < 3600) {
        return `${Math.round(seconds / 60)} ${i18n.t('common.minutes')}`;
    } else if (seconds < 86400) {
        return `${Math.round(seconds / 3600)} ${i18n.t('common.hours')}`;
    } else if (seconds < 2592000) {
        return `${Math.round(seconds / 86400)} ${i18n.t('common.days')}`;
    } else if (seconds < 31536000) {
        return `${Math.round(seconds / 2592000)} ${i18n.t('common.months')}`;
    } else {
        return `${Math.round(seconds / 31536000)} ${i18n.t('common.years')}`;
    }
};
