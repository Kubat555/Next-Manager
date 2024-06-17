import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ReportData } from '@api/models';

interface DownloadReportProps {
  reportData: ReportData;
}

const DownloadReport: React.FC<DownloadReportProps> = ({ reportData }) => {
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont('Helvetica');

    // Project Name and Status
    doc.setFontSize(20);
    doc.text(reportData.projectName, 10, 10);
    doc.setFontSize(14);
    doc.setTextColor(reportData.projectStatus ? 'green' : 'red');
    doc.text(reportData.projectStatus ? 'Completed' : 'Not completed', 10, 20);
    
    // Date
    doc.setTextColor('black');
    doc.text(reportData.dateTime, 180, 10, { align: 'right' });

    // Table
    autoTable(doc, {
      startY: 30,
      head: [['Employee', 'Tasks Completed', 'Tasks Assigned']],
      body: reportData.statistics.map(stat => [
        stat.employeeName,
        stat.tasksCompleted.toString(),
        stat.tasksAssigned.toString(),
      ]),
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
      styles: { halign: 'center' },
    });

    doc.save(`report${reportData.dateTime}.pdf`);
  };

  return (
    <button
      onClick={downloadPDF}
      className="btnPrimary mt-4"
    >
      Download as PDF
    </button>
  );
};

export default DownloadReport;
