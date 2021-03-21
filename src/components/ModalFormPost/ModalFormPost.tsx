import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
  Form,
  Input,
  Modal,
  Button,
} from 'antd';
import { FormInstance } from 'antd/lib/form';
import { ISetPost } from '../../Interfaces/Interfaces';

import './modalFormPost.scss';

interface ModalProps {
  isOpen: boolean,
  onSubmit(data: ISetPost): void,
  onClose(): void,
  values: ISetPost,
}

@observer
export default class ModalFormPost extends Component<ModalProps, {}> {
  private refForm = React.createRef<FormInstance>();

  private sendData = (): void => {
    const { values, onSubmit, onClose } = this.props;
    const { current } = this.refForm;
    const data: ISetPost = { ...values, ...current?.getFieldsValue() };

    if (data) {
      onSubmit(data);
      current?.resetFields();
      onClose();
    }
  };

  render(): JSX.Element {
    const { TextArea } = Input;
    const { values, isOpen, onClose } = this.props;
    const isEmpty: boolean = Object.values(values).includes('');
    this.refForm.current?.setFieldsValue(values);

    return (
      <Modal
        title={isEmpty ? 'Add a new post' : 'Update post'}
        visible={isOpen}
        onCancel={onClose}
        footer={[]}
      >
        <Form
          ref={this.refForm}
          onFinish={this.sendData}
        >
          <Form.Item
            shouldUpdate
            name="title"
            rules={[{ required: true, message: 'Please input title!' }]}
            initialValue={values.title}
          >
            <Input
              className="popup-input"
              placeholder="Set a title"
            />
          </Form.Item>
          <Form.Item
            shouldUpdate
            name="body"
            rules={[{ required: true, message: 'Please input text!' }]}
            initialValue={values.body}
          >
            <TextArea
              placeholder="Set text"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
