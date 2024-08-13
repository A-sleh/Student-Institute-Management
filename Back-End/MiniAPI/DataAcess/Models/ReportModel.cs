﻿using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Models
{
    public class ReportModel
    {
        public int Id { get; set; }
        public string ReportTitle { get; set; }
        public string StartDate { get; set; }
        public string FinishDate { get; set; }

        public ReportModel() { }
        public ReportModel(int id, string reportTitle, string startDate, string finishDate)
        {
            Id = id;
            ReportTitle = reportTitle;
            StartDate = startDate;
            FinishDate = finishDate;
        }
    }
}