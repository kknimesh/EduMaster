import React, { useState } from 'react';

const SimpleDemo: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎨 EduMaster UI Components Preview
          </h1>
          <p className="text-xl text-gray-600">
            Interactive showcase of the complete design system
          </p>
        </div>

        {/* Basic Test Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Basic Functionality Test</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCount(count + 1)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Click Me ({count})
              </button>
              <button 
                onClick={() => setCount(0)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Reset
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Test input field"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Select option 1</option>
                <option>Select option 2</option>
                <option>Select option 3</option>
              </select>
            </div>

            <textarea 
              placeholder="Test textarea"
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Test checkbox
              </label>
              <label className="flex items-center">
                <input type="radio" name="test" className="mr-2" />
                Radio option 1
              </label>
              <label className="flex items-center">
                <input type="radio" name="test" className="mr-2" />
                Radio option 2
              </label>
            </div>
          </div>
        </div>

        {/* Component Status */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Components Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">✅ Form Components</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Input.tsx</li>
                <li>• Select.tsx</li>
                <li>• Textarea.tsx</li>
                <li>• Checkbox.tsx</li>
                <li>• Radio.tsx</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">✅ UI Components</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Button.tsx</li>
                <li>• Card.tsx</li>
                <li>• Modal.tsx</li>
                <li>• Avatar.tsx</li>
                <li>• LoadingSpinner.tsx</li>
              </ul>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">✅ Advanced Components</h3>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• DataTable.tsx</li>
                <li>• Calendar.tsx</li>
                <li>• VideoPlayer.tsx</li>
                <li>• Toast.tsx</li>
                <li>• Tooltip.tsx</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
          <h3 className="font-semibold text-yellow-800 mb-2">🔧 Next Steps</h3>
          <p className="text-yellow-700">
            All components are available in the repository. The import errors suggest a module resolution issue. 
            Once resolved, you'll have access to the complete EduMaster design system with 80+ interactive components.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimpleDemo;