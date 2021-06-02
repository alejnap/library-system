using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReturnBookController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public ReturnBookController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select MemberID, MemberName, BookID,
                    BookName,Author,
                    convert(varchar(10),IssueDate,120) as IssueDate,
                    convert(varchar(10),DueDate,120) as DueDate,
                    convert(varchar(10),ReturnDate,120) as ReturnDate,
                    Fine

                    from dbo.ReturnBook
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("LibraryAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpPost]
        public JsonResult Post(ReturnBook rebks)
        {
            string query = @"
                    insert into dbo.ReturnBook 
                    (MemberID,MemberName,BookID,MemberID,MemberName,IssueDate,DueDate)
                    values 
                    (
                    '" +  rebks.MemberID + @"'
                    ,'" +  rebks.MemberName + @"'
                    ,'" +  rebks.BookID + @"'
                    ,'" +  rebks.MemberID + @"'
                    ,'" +  rebks.IssueDate + @"'
                    ,'" +  rebks.DueDate + @"'
                    )
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("LibraryAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(ReturnBook rebks)
        {
            string query = @"
                    update dbo.ReturnBook set 
                    MemberName = '" +  rebks.MemberName + @"'
                    ,BookID = '" +  rebks.BookID + @"'
                    ,BookName = '" +  rebks.BookName + @"'
                    ,Author = '" +  rebks.Author + @"'
                    ,IssueDate = '" +  rebks.IssueDate + @"'
                    ,DueDate = '" +  rebks.DueDate + @"'
                    ,ReturnDate = '" + rebks.ReturnDate + @"'
                    ,Fine = '" + rebks.Fine + @"'
                    where MemberID = " +  rebks.MemberID + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("LibraryAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dbo.ReturnBook
                    where MemberID = " + id + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("LibraryAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }
    }
}
