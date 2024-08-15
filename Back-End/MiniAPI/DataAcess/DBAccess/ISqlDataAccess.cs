
namespace DataAcess.DBAccess
{
    public interface ISqlDataAccess
    {
        Task<IEnumerable<T>> LoadData<T, U, V>(string storedProcedure, U parameters, Func<T, V, T> x, string splitOn, string connectionString = "Default");
        Task<IEnumerable<T>> LoadData<T, U>(string storedProcedure, U parameters, string connectionString = "Default");
        Task SaveData<T>(string storedProcedure, T parameters, string connectionString = "Default");
    }
}