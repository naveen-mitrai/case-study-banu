import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDF = (tableColumn, data, header, reportType) => {
  const doc = new jsPDF();

  doc.text(header, 14, 15);
  doc.autoTable({
    head: [tableColumn],
    body: data,
    startY: reportType == "droneBatteryLogs" ? 30 : 20,
  });
  const date = Date().split(" ");

  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

  doc.save(`report_${reportType}_${dateStr}.pdf`);
};

export default generatePDF;
