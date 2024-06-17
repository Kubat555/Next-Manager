"use client";
import { useEffect, useState } from 'react';
import DownloadReport from '@components/report/download-report';
import { fetchReportData } from '@api/data';
import { ReportData } from '@api/models';
import ReportView from '@components/report/report-view';
import LoadingIndicator from '@components/loadingIndicator';

const ExamplePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [reportData, setReportData] = useState<ReportData | null>(null);

  useEffect(() => {
    const getReportData = async () => {
      const data = await fetchReportData(Number(id));
      if (data) {
        data.dateTime = new Date().toLocaleDateString('en-GB');
      }
      setReportData(data);
    };

    getReportData();
  }, []);

  return (
    <div>
      {reportData ? (
        <div>
          <div className="flex justify-between mb-10 items-center">
            <h1 className="text-2xl font-bold text-gray-500">Report</h1>
            <DownloadReport reportData={reportData} />
          </div>
          <ReportView reportData={reportData} />
          
        </div>
      ) : (
        <LoadingIndicator/>
      )}
    </div>
  );
};

export default ExamplePage;
