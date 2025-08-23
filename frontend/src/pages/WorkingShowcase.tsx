import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import Checkbox from '../components/ui/Checkbox';
import Radio from '../components/ui/Radio';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import Tooltip from '../components/ui/Tooltip';
import Avatar from '../components/ui/Avatar';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import DataTable from '../components/ui/DataTable';
import Calendar from '../components/ui/Calendar';
import VideoPlayer from '../components/ui/VideoPlayer';
import Toast from '../components/ui/Toast';
import DarkModeToggle from '../components/ui/DarkModeToggle';

const WorkingShowcase: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState('');

  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Admin' },
  ];

  const tableColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            EduMaster UI Components Showcase
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Interactive preview of all UI components in the EduMaster design system
          </p>
          <div className="mt-4">
            <DarkModeToggle />
          </div>
        </div>

        <div className="space-y-12">
          {/* Form Components Section */}
          <section>
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Form Components</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    label="Text Input"
                    placeholder="Enter your name"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    helper="This is a helper text"
                  />
                </div>
                <div>
                  <Select
                    label="Select Dropdown"
                    options={selectOptions}
                    value={selectValue}
                    onChange={(e) => setSelectValue(e.target.value)}
                    placeholder="Choose an option"
                  />
                </div>
                <div className="md:col-span-2">
                  <Textarea
                    label="Textarea"
                    placeholder="Write your message here..."
                    value={textareaValue}
                    onChange={(e) => setTextareaValue(e.target.value)}
                    rows={4}
                  />
                </div>
                <div>
                  <Checkbox
                    label="Accept Terms and Conditions"
                    checked={checkboxValue}
                    onChange={(e) => setCheckboxValue(e.target.checked)}
                  />
                </div>
                <div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Choose Option:</p>
                    <Radio
                      name="radio-group"
                      value="option1"
                      label="Option 1"
                      checked={radioValue === 'option1'}
                      onChange={(e) => setRadioValue(e.target.value)}
                    />
                    <Radio
                      name="radio-group"
                      value="option2"
                      label="Option 2"
                      checked={radioValue === 'option2'}
                      onChange={(e) => setRadioValue(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Button Components Section */}
          <section>
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Buttons & Actions</h2>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="danger">Danger Button</Button>
                <Button disabled>Disabled Button</Button>
                <Button size="sm">Small Button</Button>
                <Button size="lg">Large Button</Button>
                <Button onClick={() => setShowModal(true)}>Open Modal</Button>
                <Tooltip content="This is a helpful tooltip">
                  <Button variant="outline">Hover for Tooltip</Button>
                </Tooltip>
              </div>
            </Card>
          </section>

          {/* User Interface Section */}
          <section>
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">User Interface</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Avatar 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
                    alt="User Avatar" 
                    size="lg"
                  />
                  <p className="mt-2 text-sm text-gray-600">User Avatar</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="lg" />
                  <p className="mt-2 text-sm text-gray-600">Loading Spinner</p>
                </div>
                <div>
                  <Toast
                    message="This is a success message!"
                    type="success"
                    isVisible={true}
                    position="top-right"
                  />
                </div>
              </div>
            </Card>
          </section>

          {/* Data Display Section */}
          <section>
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Display</h2>
              <DataTable
                data={tableData}
                columns={tableColumns}
                pagination={true}
                searchable={true}
                className="mb-8"
              />
            </Card>
          </section>

          {/* Calendar Section */}
          <section>
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Calendar Component</h2>
              <Calendar
                events={[
                  {
                    id: '1',
                    title: 'Math Class',
                    date: new Date(),
                    type: 'class'
                  },
                  {
                    id: '2',
                    title: 'Assignment Due',
                    date: new Date(Date.now() + 86400000),
                    type: 'assignment'
                  }
                ]}
                onDateSelect={(date) => console.log('Selected date:', date)}
              />
            </Card>
          </section>

          {/* Video Player Section */}
          <section>
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Video Player</h2>
              <VideoPlayer
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
                title="Sample Educational Video"
                className="max-w-2xl mx-auto"
              />
            </Card>
          </section>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Sample Modal"
        size="md"
      >
        <div className="p-6">
          <p className="text-gray-700 mb-4">
            This is a sample modal component. You can put any content here.
          </p>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setShowModal(false)}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WorkingShowcase;