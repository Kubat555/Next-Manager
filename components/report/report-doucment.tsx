// ReportDocument.tsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ReportData } from '@api/models';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
  },
  table: {
    width: "auto",
    marginTop: 10,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    padding: 5,
    borderBottom: '1pt solid black',
  },
  tableCell: {
    fontSize: 10,
    padding: 5,
    borderBottom: '1pt solid black',
  },
});

interface ReportDocumentProps {
  reportData: ReportData;
}

const ReportDocument: React.FC<ReportDocumentProps> = ({ reportData }) => {
  const { projectName, projectStatus, dateTime, statistics } = reportData;

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{projectName} - {projectStatus ? 'Завершен' : 'Не завершен'}</Text>
          <Text style={styles.date}>{dateTime}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Статистика проекта</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Сотрудник</Text>
              <Text style={styles.tableCellHeader}>Задачи выполнены</Text>
              <Text style={styles.tableCellHeader}>Задачи назначены</Text>
            </View>
            {statistics.map((stat, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{stat.employeeName}</Text>
                <Text style={styles.tableCell}>{stat.tasksCompleted}</Text>
                <Text style={styles.tableCell}>{stat.tasksAssigned}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ReportDocument;
