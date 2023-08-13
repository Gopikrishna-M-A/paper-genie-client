import React, { useState } from 'react';
import { Modal, Form, Button, Select, InputNumber } from 'antd';

const EditForm = ({ visible, onCancel, onEdit,id }) => {
  const [editedValues, setEditedValues] = useState({ /* initial values */ });

  const handleFormSubmit = () => {
    // Call the onEdit function and pass the updated values
    onEdit(editedValues,id);
    onCancel(); // Close the modal
  };

  return (
    <Modal
      title="Edit Question"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleFormSubmit}>
          Save
        </Button>,
      ]}
    >
      <Form >
        {/* Add form fields for editing */}


            <Form.Item name="Dlevel" hasFeedback>
            <Select
                placeholder="Difficulty level"
                onChange={(value) =>
                setEditedValues({ ...editedValues, Dlevel: value })
                }
            >
                <Select.Option value="Easy">Easy</Select.Option>
                <Select.Option value="Moderate">Moderate</Select.Option>
                <Select.Option value="Difficult">Difficult</Select.Option>
            </Select>
            </Form.Item>

            <Form.Item name="Clevel" hasFeedback>
            <Select
                placeholder="Cognitive level"
                onChange={(value) =>
                setEditedValues({ ...editedValues, Clevel: value })
                }
            >
                <Select.Option value="Knowledge">Knowledge</Select.Option>
                <Select.Option value="Comprehension">Comprehension</Select.Option>
                <Select.Option value="Application">Application</Select.Option>
                <Select.Option value="Analysis">Analysis</Select.Option>
                <Select.Option value="Synthesis">Synthesis</Select.Option>
            </Select>
            </Form.Item>

            <Form.Item name="mark" hasFeedback>
            <InputNumber
                placeholder="Mark"
                onChange={(value) =>
                setEditedValues({ ...editedValues, mark: value })
                }
            />
            </Form.Item>

            <Form.Item name="section" hasFeedback>
            <InputNumber
                placeholder="Section"
                onChange={(value) =>
                setEditedValues({ ...editedValues, section: value })
                }
            />
            </Form.Item>

            <Form.Item name="space" hasFeedback>
            <InputNumber
                placeholder="Space"
                onChange={(value) =>
                setEditedValues({ ...editedValues, space: value })
                }
            />
            </Form.Item>




        {/* Add other form fields */}
      </Form>
    </Modal>
  );
};

export default EditForm;
