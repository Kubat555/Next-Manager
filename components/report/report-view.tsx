import React from 'react';
import { ReportData } from '@api/models';

interface ReportViewProps {
  reportData: ReportData;
}

const ReportView: React.FC<ReportViewProps> = ({ reportData }) => {
  const { projectName, projectStatus, dateTime, statistics } = reportData;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{"Project name: "+projectName}</h1>
          <p className={`text-sm ${projectStatus ? 'text-green-600' : 'text-red-600'}`}>
            {projectStatus ? 'Completed' : 'Not completed'}
          </p>
        </div>
        <p className="text-sm text-gray-500">{dateTime}</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Project Statistics</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasks Completed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasks Assigned</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {statistics.map((stat, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{stat.employeeName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{stat.tasksCompleted}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{stat.tasksAssigned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportView;
