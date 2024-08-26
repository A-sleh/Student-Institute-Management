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
        public SqlDataAccess()
        {
            
        }
        public SqlDataAccess(IConfiguration config)
        {
            _cofing = config;
        }

        // simple mapping
        public async Task<IEnumerable<T>> LoadData<T, U>(
            string storedProcedure,
            U parameters,
            string connectionString = "Default")
        {
            using IDbConnection connection = new SqlConnection(_cofing.GetConnectionString(connectionString));
            return await connection.QueryAsync<T>(storedProcedure, parameters, commandType: CommandType.StoredProcedure);
        }
        //one to one/many relation data mapping using this method
        public async Task<IEnumerable<T>> LoadData<T, U, V>(
            string storedProcedure,
            U parameters,
            Func<T, V, T> x,
            string splitOn,
            string connectionString = "Default"
            )
        {
            using IDbConnection connection = new SqlConnection(_cofing.GetConnectionString(connectionString));
            return await connection.QueryAsync<T, V, T>(storedProcedure, param: parameters, map: x, commandType: CommandType.StoredProcedure, splitOn: splitOn);
        }
        // multimapping
        public async Task<IEnumerable<T>> LoadData<U, T, V, X>(
            string storedProcedure,
            U parameters,
            Func<T, V, X, T> x,
            string splitOn,
            string connectionString = "Default"
            )
        {
            using IDbConnection connection = new SqlConnection(_cofing.GetConnectionString(connectionString));
            return await connection.QueryAsync<T, V, X, T>(storedProcedure, param: parameters, map: x, commandType: CommandType.StoredProcedure, splitOn: splitOn);
        }

        // excution only
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
