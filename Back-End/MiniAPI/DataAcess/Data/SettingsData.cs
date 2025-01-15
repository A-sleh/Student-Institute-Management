using DataAcess.DBAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAcess.Exceptions;
using System.Data.SqlClient;

namespace DataAcess.Data
{
    public class SettingsData : ISettingsData
    {
        private readonly ISqlDataAccess _db;
        public SettingsData(ISqlDataAccess db) 
        { 
            _db = db;
        }

        public async Task ChangePassword(string oldPass, string newPass)
        {
            try
            {
                await _db.ExecuteData("UpdatePassword", new { oldPass, newPass });
            }
            catch (SqlException)
            {
                throw;
            }
        }

        public string Decrypt(string encryptedValue)
        {
            var values = encryptedValue.Split('%');
            string decrypedValue = string.Empty;
            foreach (var value in values) 
            {
                if (value.Length == 0)
                    continue;
                int x = int.Parse(value);
                decrypedValue += $"{(char)(x / 13)}";
            }
            return decrypedValue;
        }

        public async Task EditConfig(Dictionary<string, string> configs)
        {
            foreach (var (attribute, value) in configs) 
            {
                //var encryptedAttribute = Encrypt(config.Item1);
                //var encryptedValue = Encrypt(config.Item2);
                await _db.ExecuteData("UpdateSettings", new { attribute, value });
            }
        }

        public string Encrypt(string value)
        {
            int encUnit = 13;
            string encryptedValue = string.Empty;
            foreach(char c in value)
            {
                encryptedValue += $"%{(int)c * encUnit}%";
            }
            return encryptedValue;
        }

        public async Task<IEnumerable<KeyValuePair<string,string>>> LoadConfigs()
        {
            var data = await _db.LoadData<(string attribute, string value), dynamic>("LoadSettings", new { });
            var dic = new Dictionary<string, string>();
            foreach (var (attribute, value) in data)
            {
                //var decryptedAttribute = Decrypt(attribute);
                //var decryptedValue = Decrypt(value);
                dic.Add(attribute, value);
            }
            return dic.AsEnumerable();
        }

        public Task Login(string username, string password)
        {
            //username = Encrypt(username);
            //password = Encrypt(password);
            return _db.ExecuteData("userLogin", new { username, password });
        }

        public Task Logout() => 
            _db.ExecuteData("userLogout", new { });
    }
}
