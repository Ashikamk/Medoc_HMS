using iTextSharp.text;
using iTextSharp.text.pdf;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.DataTablesServer
{
    public class EumiPDF
    {
        public static void CreatePdf(Func<int, DataTable> dtFunc, System.IO.Stream stream, List<decimal> colWidths)
        {
            using (Document document = new Document(PageSize.A4, 40, 40, 40, 40))
            {
                PdfWriter.GetInstance(document, stream);

                int setIndex = 0;
                var dt = dtFunc(setIndex);

                document.Open();
                PdfPTable table = new PdfPTable(colWidths.Select(x => (float)x).ToArray());
                table.WidthPercentage = 100;
                table.HeaderRows = 1;
                table.SplitRows = false;
                table.Complete = false;
                table.DefaultCell.BorderWidth = 0.1f;

                do
                {
                    for (int i = 0; i < dt.Columns.Count; i++) { table.AddCell(getCell(dt.Columns[i].Caption, 8)); }

                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        if (i % 10 == 0)
                        {
                            document.Add(table);
                        }
                        for (int j = 0; j < dt.Columns.Count; j++) { table.AddCell(getCell(dt.Rows[i][j].ToString(), 8)); }

                    }
                    setIndex++;
                    try
                    {
                        dt = dtFunc(setIndex);
                        if (dt.Rows.Count == 0) { break; }
                        stream.Flush();
                    }
                    catch (Exception ex)
                    {
                        Console.Write(ex.Message);
                        Console.WriteLine(ex.StackTrace);
                        break;
                    }

                } while (setIndex <= 1000);

                table.Complete = true;
                document.Add(table);
                document.Close();
            }
        }
        public static PdfPCell getCell(string str, float size)
        {
            if (str != null && string.IsNullOrEmpty(str))
            {
                return new PdfPCell();
            }
            Font f = new Font();
            f.Size = size;
            PdfPCell cell = new PdfPCell(new Phrase(str, f));
            cell.HorizontalAlignment = Element.ALIGN_RIGHT;
            cell.BorderWidth = 0.1f;
            return cell;
        }
    }
}