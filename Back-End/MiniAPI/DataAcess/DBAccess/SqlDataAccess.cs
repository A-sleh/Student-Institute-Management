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

        /// <summary>
        /// Executes Async Query To Load Data Without mapping (result query only)
        /// </summary>
        /// <typeparam name="T">Return Type T</typeparam>
        /// <typeparam name="U">Parameter Type U</typeparam>
        /// <param name="storedProcedure">stored procedure name</param>
        /// <param name="parameters">parameters array or colloection</param>
        /// <param name="connectionString">the required database connection string</param>
        /// <returns>Collection Of value T</returns>
        public async Task<IEnumerable<T>> LoadData<T, U>(
            string storedProcedure,
            U parameters,
            string connectionString = "Default")
        {
            using IDbConnection connection = new SqlConnection(_cofing.GetConnectionString(connectionString));
            return await connection.QueryAsync<T>(storedProcedure, parameters, commandType: CommandType.StoredProcedure);
        }

        /// <summary>
        /// Executes Async Query To Load Data From Database
        /// Used with (one to one), (one to many) relations
        /// <list type="bullet">
        /// <item>
        /// <term>T</term>
        /// <description>First Model Type</description>
        /// </item>
        /// <item>
        /// <term>V</term>
        /// <description>Second Model Type</description>
        /// </item>
        /// <item>
        /// <term>U</term>
        /// <description>Parameter Type</description>
        /// </item>
        /// </list>
        /// </summary>
        /// <typeparam name="T">Presents first and return value</typeparam>
        /// <typeparam name="U">Presents type of parameter</typeparam>
        /// <typeparam name="V">Presents type of second value</typeparam>
        /// <param name="storedProcedure">stored procedure name</param>
        /// <param name="parameters">parameter args</param>
        /// <param name="connectionString">the required database connection string</param>
        /// <param name="x">Mapping function with paramters of T and U</param>
        /// <param name="splitOn">Split on specified properties names to separate objects</param>
        /// <returns>Collection of value type <typeparamref name="T"/> </returns>
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

        /// <summary>
        /// Executes Async Query To Load Data From Database,
        /// Used with Multi relations
        /// </summary>
        /// <typeparam name="U">Presents type of parameter</typeparam>
        /// <typeparam name="T">Presents first and out model</typeparam>
        /// <typeparam name="V">Presents second model</typeparam>
        /// <typeparam name="X">Presents third model</typeparam>
        /// <param name="storedProcedure">stored procedure name</param>
        /// <param name="parameters">parameter args</param>
        /// <param name="connectionString">the required database connection string</param>
        /// <param name="x">Mapping function with paramters of T and U</param>
        /// <param name="splitOn">Split on specified properties names to separate objects</param>
        /// <returns>Collection of value type <typeparamref name="T"/> </returns>
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

        /// <summary>
        /// Executes Async Query To Load Data From Database,
        /// Used with Multi relations
        /// </summary>
        /// <typeparam name="U">Presents type of parameter</typeparam>
        /// <typeparam name="T">Presents first and out model</typeparam>
        /// <typeparam name="V">Presents second model</typeparam>
        /// <typeparam name="X">Presents third model</typeparam>
        /// <typeparam name="Z">Presents fourth model</typeparam>
        /// <param name="storedProcedure">stored procedure name</param>
        /// <param name="parameters">parameter args</param>
        /// <param name="connectionString">the required database connection string</param>
        /// <param name="x">Mapping function with paramters of T and U</param>
        /// <param name="splitOn">Split on specified properties names to separate objects</param>
        /// <returns>Collection of value type <typeparamref name="T"/> </returns>
        public async Task<IEnumerable<T>> LoadData<U, T, V, X, Z>(
            string storedProcedure,
            U parameters,
            Func<T, V, X, Z, T> x,
            string splitOn,
            string connectionString = "Default"
            )
        {
            using IDbConnection connection = new SqlConnection(_cofing.GetConnectionString(connectionString));
            return await connection.QueryAsync<T, V, X, Z, T>(storedProcedure, param: parameters, map: x, splitOn: splitOn);
        }

        /// <summary>
        /// Execute Async Query
        /// </summary>
        /// <typeparam name="T">Presents parameter args type</typeparam>
        /// <param name="storedProcedure">stored procedure name</param>
        /// <param name="parameters">parameter args</param>
        /// <param name="connectionString">the required database connection string</param>
        public async Task ExecuteData<T>(
            string storedProcedure,
            T parameters,
            string connectionString = "Default")
        {
            using IDbConnection connection = new SqlConnection(_cofing.GetConnectionString(connectionString));
            await connection.ExecuteAsync(storedProcedure, parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<dynamic> ExecuteScopedId<V>(string storedPorcedure, V parameters, string connectionString = "Default")
        {
            using IDbConnection connection = new SqlConnection(_cofing.GetConnectionString(connectionString));
            return await connection.QuerySingleAsync(storedPorcedure, param: parameters, commandType: CommandType.StoredProcedure);
        }

    }
}
