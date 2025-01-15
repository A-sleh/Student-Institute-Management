using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Data
{
    public interface ISettingsData
    {
        Task<IEnumerable<KeyValuePair<string, string>>> LoadConfigs();
        Task EditConfig(Dictionary<string, string> configs);
        Task Login(string username, string password);
        Task Logout();
        Task ChangePassword(string oldPassword, string newPassword);
        string Encrypt(string value);
        string Decrypt(string encryptedValue);

    }
}
