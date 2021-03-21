import { message } from 'antd';

interface MessageInterface {
  success(msg: string): void,
  error(msg: string): void,
  warning(msg: string): void,
}

export default class Message implements MessageInterface {
  public success = (msg: string): void => {
    message.success(msg);
  };

  public warning = (msg: string): void => {
    message.warning(msg);
  };

  public error = (msg: string): void => {
    message.error(msg);
  };
}
