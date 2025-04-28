"use client";

import React, { useState, useRef } from 'react';
import { 
  FaFileImport, 
  FaCircleCheck, 
  FaCircleNotch,
  FaUpload,
  FaFileLines,
  FaList,
  FaCheck,
  FaXmark
} from 'react-icons/fa6';

export default function ImportDataSettings() {
  const [activeStep, setActiveStep] = useState(1);
  const [uploadMethod, setUploadMethod] = useState('csv');
  const [csvData, setCsvData] = useState(null);
  const [rawData, setRawData] = useState('');
  const [fileName, setFileName] = useState('');
  const [status, setStatus] = useState('idle'); // idle, uploading, mapping, importing, success, error
  const [error, setError] = useState(null);
  const [mappedFields, setMappedFields] = useState({});
  const [importOptions, setImportOptions] = useState({
    skipFirstRow: true,
    dateFormat: 'MM/DD/YYYY',
    amountFormat: 'standard',
    accountType: 'checking'
  });
  
  const fileInputRef = useRef(null);
  
  // Sample headers for the mapping interface
  const csvHeaders = csvData ? csvData.headers : [];
  const targetFields = [
    { id: 'date', name: 'Transaction Date', required: true, description: 'Date of the transaction' },
    { id: 'description', name: 'Description', required: true, description: 'Description of the transaction' },
    { id: 'amount', name: 'Amount', required: true, description: 'Transaction amount' },
    { id: 'type', name: 'Transaction Type', required: false, description: 'Debit or credit' },
    { id: 'category', name: 'Category', required: false, description: 'Transaction category' },
    { id: 'account', name: 'Account', required: false, description: 'Account name or number' },
    { id: 'notes', name: 'Notes', required: false, description: 'Additional notes' }
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        const lines = text.split('\n');
        
        if (lines.length > 0) {
          const headers = lines[0].split(',').map(header => header.trim());
          const sampleData = lines.slice(1, 5).map(line => 
            line.split(',').map(value => value.trim())
          );
          
          setCsvData({
            headers,
            sampleData,
            rawContent: text
          });
          
          // Pre-map fields if headers match common patterns
          const initialMapping = {};
          headers.forEach(header => {
            const lowerHeader = header.toLowerCase();
            
            if (lowerHeader.includes('date')) {
              initialMapping['date'] = header;
            } else if (lowerHeader.includes('desc')) {
              initialMapping['description'] = header;
            } else if (lowerHeader.includes('amount') || lowerHeader.includes('sum')) {
              initialMapping['amount'] = header;
            } else if (lowerHeader.includes('type') || lowerHeader.includes('transaction')) {
              initialMapping['type'] = header;
            } else if (lowerHeader.includes('category')) {
              initialMapping['category'] = header;
            } else if (lowerHeader.includes('account')) {
              initialMapping['account'] = header;
            } else if (lowerHeader.includes('note')) {
              initialMapping['notes'] = header;
            }
          });
          
          setMappedFields(initialMapping);
          setActiveStep(2);
        } else {
          throw new Error('File appears to be empty');
        }
      } catch (error) {
        console.error('Error parsing CSV:', error);
        setError('Failed to parse the CSV file. Please check the format and try again.');
      }
    };
    
    reader.onerror = () => {
      setError('Failed to read the file. Please try again.');
    };
    
    reader.readAsText(file);
  };
  
  const handleRawDataChange = (e) => {
    setRawData(e.target.value);
  };
  
  const handleRawDataSubmit = () => {
    if (!rawData.trim()) {
      setError('Please enter some data to import.');
      return;
    }
    
    try {
      const lines = rawData.trim().split('\n');
      
      if (lines.length > 0) {
        // Assume first line is header
        const headers = lines[0].split(',').map(header => header.trim());
        const sampleData = lines.slice(1, 5).map(line => 
          line.split(',').map(value => value.trim())
        );
        
        setCsvData({
          headers,
          sampleData,
          rawContent: rawData
        });
        
        setFileName('raw-data.csv');
        setActiveStep(2);
      } else {
        throw new Error('Data appears to be empty');
      }
    } catch (error) {
      console.error('Error parsing raw data:', error);
      setError('Failed to parse the data. Please check the format and try again.');
    }
  };
  
  const handleFieldMapping = (targetField, sourceField) => {
    setMappedFields(prev => ({
      ...prev,
      [targetField]: sourceField
    }));
  };
  
  const handleImportOptionChange = (e) => {
    const { name, value, type, checked } = e.target;
    setImportOptions(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const isReadyToImport = () => {
    // Check if all required fields are mapped
    return targetFields
      .filter(field => field.required)
      .every(field => mappedFields[field.id]);
  };
  
  const handleImport = async () => {
    if (!isReadyToImport()) {
      setError('Please map all required fields before importing.');
      return;
    }
    
    try {
      setStatus('importing');
      
      // In a real app, this would prepare the data based on the mapping
      // and send it to an API endpoint
      
      // Simulate import process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStatus('success');
      setTimeout(() => {
        setActiveStep(3);
      }, 1000);
    } catch (error) {
      console.error('Error importing data:', error);
      setStatus('error');
      setError(error.message || 'Failed to import data. Please try again.');
    }
  };
  
  const handleRestart = () => {
    // Reset all state
    setActiveStep(1);
    setUploadMethod('csv');
    setCsvData(null);
    setRawData('');
    setFileName('');
    setStatus('idle');
    setError(null);
    setMappedFields({});
    setImportOptions({
      skipFirstRow: true,
      dateFormat: 'MM/DD/YYYY',
      amountFormat: 'standard',
      accountType: 'checking'
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-white mb-2">Import Financial Data</h1>
      <p className="text-gray-400 mb-8">Upload and map transaction data from external sources</p>
      
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 rounded-xl flex items-start gap-3 text-red-400">
          <div>
            <h3 className="font-medium mb-1">Error</h3>
            <p>{error}</p>
          </div>
        </div>
      )}
      
      {/* Step indicators */}
      <div className="flex items-center mb-8">
        <div className={`flex items-center ${activeStep >= 1 ? 'text-[#50E3C2]' : 'text-gray-500'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            activeStep >= 1 ? 'bg-[#50E3C2]/20 border border-[#50E3C2]/30' : 'bg-[#222] border border-[#333]'
          }`}>
            {activeStep > 1 ? <FaCheck size={12} /> : 1}
          </div>
          <span className="ml-2 font-medium">Upload</span>
        </div>
        
        <div className={`w-12 h-0.5 mx-2 ${activeStep >= 2 ? 'bg-[#50E3C2]/30' : 'bg-[#333]'}`}></div>
        
        <div className={`flex items-center ${activeStep >= 2 ? 'text-[#50E3C2]' : 'text-gray-500'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            activeStep >= 2 ? 'bg-[#50E3C2]/20 border border-[#50E3C2]/30' : 'bg-[#222] border border-[#333]'
          }`}>
            {activeStep > 2 ? <FaCheck size={12} /> : 2}
          </div>
          <span className="ml-2 font-medium">Map</span>
        </div>
        
        <div className={`w-12 h-0.5 mx-2 ${activeStep >= 3 ? 'bg-[#50E3C2]/30' : 'bg-[#333]'}`}></div>
        
        <div className={`flex items-center ${activeStep >= 3 ? 'text-[#50E3C2]' : 'text-gray-500'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            activeStep >= 3 ? 'bg-[#50E3C2]/20 border border-[#50E3C2]/30' : 'bg-[#222] border border-[#333]'
          }`}>
            {activeStep > 3 ? <FaCheck size={12} /> : 3}
          </div>
          <span className="ml-2 font-medium">Complete</span>
        </div>
      </div>
      
      {/* Step 1: Upload Data */}
      {activeStep === 1 && (
        <div className="bg-[#121212] rounded-xl overflow-hidden border border-[#222] mb-6">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#50E3C2]/10 rounded-lg text-[#50E3C2]">
                <FaFileImport size={20} />
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-white mb-1">Upload Financial Data</h2>
                <p className="text-gray-400 max-w-xl">
                  Import your transaction data by uploading a CSV file or pasting raw data.
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="mb-6">
                <div className="flex border border-[#333] rounded-lg overflow-hidden">
                  <button
                    onClick={() => setUploadMethod('csv')}
                    className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 ${
                      uploadMethod === 'csv' 
                        ? 'bg-[#1a1a1a] text-[#50E3C2]' 
                        : 'bg-[#121212] text-gray-400 hover:bg-[#1a1a1a]/50'
                    }`}
                  >
                    <FaFileLines size={14} />
                    <span>CSV File</span>
                  </button>
                  <button
                    onClick={() => setUploadMethod('raw')}
                    className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 ${
                      uploadMethod === 'raw' 
                        ? 'bg-[#1a1a1a] text-[#50E3C2]' 
                        : 'bg-[#121212] text-gray-400 hover:bg-[#1a1a1a]/50'
                    }`}
                  >
                    <FaList size={14} />
                    <span>Raw Data</span>
                  </button>
                </div>
              </div>
              
              {uploadMethod === 'csv' ? (
                <div>
                  <div 
                    className="border-2 border-dashed border-[#333] rounded-xl p-8 text-center hover:border-[#50E3C2]/30 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept=".csv"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    
                    <FaUpload size={32} className="mx-auto mb-4 text-gray-500" />
                    <h3 className="text-white font-medium mb-2">Upload CSV File</h3>
                    <p className="text-gray-400 mb-4">
                      Click to browse or drag and drop your file here
                    </p>
                    <p className="text-gray-500 text-sm">
                      Supported format: CSV
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Paste your comma-separated data (CSV format)
                    </label>
                    <textarea
                      rows={10}
                      value={rawData}
                      onChange={handleRawDataChange}
                      placeholder="date,description,amount,category,..."
                      className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-[#333] text-white font-mono text-sm focus:border-[#50E3C2] focus:outline-none"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleRawDataSubmit}
                      disabled={!rawData.trim()}
                      className={`py-2 px-4 rounded-lg bg-gradient-to-r from-[#50E3C2] to-[#3CCEA7] text-black font-medium ${
                        !rawData.trim() ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Step 2: Map Fields */}
      {activeStep === 2 && csvData && (
        <div className="bg-[#121212] rounded-xl overflow-hidden border border-[#222] mb-6">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#50E3C2]/10 rounded-lg text-[#50E3C2]">
                <FaFileImport size={20} />
              </div>
              
              <div className="flex-1">
                <h2 className="text-lg font-medium text-white mb-1">Map Fields</h2>
                <p className="text-gray-400 mb-4">
                  Map the columns from your data to our system fields.
                </p>
                
                <div className="flex items-center mb-4 text-sm">
                  <span className="text-gray-400 mr-2">File:</span>
                  <span className="text-white font-medium">{fileName}</span>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-white font-medium mb-2">Sample Data</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr>
                          {csvData.headers.map((header, idx) => (
                            <th key={idx} className="p-2 border-b border-[#333] text-left text-gray-400">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {csvData.sampleData.map((row, rowIdx) => (
                          <tr key={rowIdx}>
                            {row.map((cell, cellIdx) => (
                              <td key={cellIdx} className="p-2 border-b border-[#333] text-gray-300">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-white font-medium mb-4">Map Fields</h3>
                  <div className="space-y-4">
                    {targetFields.map(field => (
                      <div key={field.id} className="flex items-center">
                        <div className="w-1/3">
                          <label className="block text-sm font-medium text-gray-300">
                            {field.name} {field.required && <span className="text-red-500">*</span>}
                          </label>
                          <p className="text-xs text-gray-500">{field.description}</p>
                        </div>
                        <div className="w-2/3">
                          <select
                            value={mappedFields[field.id] || ''}
                            onChange={(e) => handleFieldMapping(field.id, e.target.value)}
                            className={`w-full p-2 rounded-lg bg-[#1a1a1a] border ${
                              field.required && !mappedFields[field.id] 
                                ? 'border-red-500' 
                                : 'border-[#333]'
                            } text-white focus:border-[#50E3C2] focus:outline-none`}
                          >
                            <option value="">-- Select field --</option>
                            {csvData.headers.map((header, idx) => (
                              <option key={idx} value={header}>{header}</option>
                            ))}
                            {field.id === 'type' && <option value="derived">Derive from amount</option>}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-white font-medium mb-4">Import Options</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-1/3">
                        <label className="block text-sm font-medium text-gray-300">Skip Header Row</label>
                        <p className="text-xs text-gray-500">Skip the first row (column names)</p>
                      </div>
                      <div className="w-2/3">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox"
                            name="skipFirstRow"
                            checked={importOptions.skipFirstRow}
                            onChange={handleImportOptionChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-[#333] rounded-full peer peer-checked:bg-[#50E3C2] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#121212] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-1/3">
                        <label className="block text-sm font-medium text-gray-300">Date Format</label>
                        <p className="text-xs text-gray-500">Format of dates in your data</p>
                      </div>
                      <div className="w-2/3">
                        <select
                          name="dateFormat"
                          value={importOptions.dateFormat}
                          onChange={handleImportOptionChange}
                          className="w-full p-2 rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:border-[#50E3C2] focus:outline-none"
                        >
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-1/3">
                        <label className="block text-sm font-medium text-gray-300">Amount Format</label>
                        <p className="text-xs text-gray-500">Format of amounts in your data</p>
                      </div>
                      <div className="w-2/3">
                        <select
                          name="amountFormat"
                          value={importOptions.amountFormat}
                          onChange={handleImportOptionChange}
                          className="w-full p-2 rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:border-[#50E3C2] focus:outline-none"
                        >
                          <option value="standard">Standard (positive/negative)</option>
                          <option value="reversed">Reversed (debit/credit columns)</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-1/3">
                        <label className="block text-sm font-medium text-gray-300">Account Type</label>
                        <p className="text-xs text-gray-500">Type of account for these transactions</p>
                      </div>
                      <div className="w-2/3">
                        <select
                          name="accountType"
                          value={importOptions.accountType}
                          onChange={handleImportOptionChange}
                          className="w-full p-2 rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:border-[#50E3C2] focus:outline-none"
                        >
                          <option value="checking">Checking Account</option>
                          <option value="savings">Savings Account</option>
                          <option value="credit">Credit Card</option>
                          <option value="investment">Investment Account</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="py-2 px-4 rounded-lg bg-[#1a1a1a] text-gray-300 border border-[#333] hover:bg-[#222] transition-colors"
                  >
                    Back
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleImport}
                    disabled={!isReadyToImport() || status === 'importing'}
                    className={`py-2 px-4 rounded-lg bg-gradient-to-r from-[#50E3C2] to-[#3CCEA7] text-black font-medium ${
                      !isReadyToImport() || status === 'importing' ? 'opacity-70' : ''
                    }`}
                  >
                    {status === 'importing' ? (
                      <span className="flex items-center gap-2">
                        <FaCircleNotch className="animate-spin" />
                        Importing...
                      </span>
                    ) : (
                      'Import Data'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Step 3: Complete */}
      {activeStep === 3 && (
        <div className="bg-[#121212] rounded-xl overflow-hidden border border-[#222] mb-6">
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#50E3C2]/20 flex items-center justify-center mx-auto mb-4">
              <FaCircleCheck size={32} className="text-[#50E3C2]" />
            </div>
            
            <h2 className="text-xl font-medium text-white mb-2">Import Successful!</h2>
            <p className="text-gray-400 max-w-lg mx-auto mb-6">
              Your financial data has been successfully imported and processed. You can now view and analyze your transactions.
            </p>
            
            <div className="bg-[#1a1a1a] rounded-lg p-4 max-w-sm mx-auto mb-8">
              <div className="flex justify-between py-2 border-b border-[#333]">
                <span className="text-gray-400">File</span>
                <span className="text-white font-medium">{fileName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#333]">
                <span className="text-gray-400">Records Imported</span>
                <span className="text-white font-medium">
                  {csvData && csvData.rawContent.split('\n').length - 1}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-400">Account Type</span>
                <span className="text-white font-medium capitalize">
                  {importOptions.accountType}
                </span>
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={handleRestart}
                className="py-2 px-4 rounded-lg bg-[#1a1a1a] text-gray-300 border border-[#333] hover:bg-[#222] transition-colors"
              >
                Import More Data
              </button>
              
              <button
                type="button"
                className="py-2 px-4 rounded-lg bg-gradient-to-r from-[#50E3C2] to-[#3CCEA7] text-black font-medium"
              >
                View Transactions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 