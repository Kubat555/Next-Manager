// fakeData.ts
import { ReportData } from '@api/models';

export const fakeReportData: ReportData = {
  projectName: 'Project A',
  projectStatus: true,
  dateTime: new Date().toLocaleDateString(),
  statistics: [
    { employeeName: 'John Doe', tasksCompleted: 10, tasksAssigned: 12 },
    { employeeName: 'Jane Smith', tasksCompleted: 8, tasksAssigned: 10 },
    { employeeName: 'Alice Johnson', tasksCompleted: 5, tasksAssigned: 6 },
  ],
};
