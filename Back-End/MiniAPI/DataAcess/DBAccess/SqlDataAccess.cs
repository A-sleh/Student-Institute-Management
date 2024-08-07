using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;

namespace DataAcess.DBAccess
{
    public class SqlDataAccess : ISqlDataAccess
    {
        private readonly IConfiguration _cofing;
        public SqlDataAccess(IConfiguration config)
        {
            _cofing = config;
        }
        public async Task<IEnumerable<T>> LoadData<T, U>(
            string storedProcedure,
            U parameters,
            string connectionString = "Default")
        {
            using IDbConnection connection = new SqlConnection(_cofing.GetConnectionString(connectionString));
            return await connection.QueryAsync<T>(storedProcedure, parameters, commandType: CommandType.StoredProcedure);
        }
        public async Task SaveData<T>(
            string storedProcedure,
            T parameters,
            string connectionString = "Default")
        {
            using IDbConnection connection = new SqlConnection(_cofing.GetConnectionString(connectionString));
            await connection.ExecuteAsync(storedProcedure, parameters, commandType: CommandType.StoredProcedure);
        }
    }
}
