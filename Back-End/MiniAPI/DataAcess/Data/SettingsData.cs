using DataAcess.DBAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAcess.Exceptions;
using System.Data.SqlClient;
using System.Transactions;

namespace DataAcess.Data
{
    public class SettingsData : ISettingsData
    {
        private readonly ISqlDataAccess _db;
        private bool _loggedIn;
        private int currentRandomNumber = -1;
        public SettingsData(ISqlDataAccess db) 
        { 
            _db = db;
            _loggedIn = false;
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
            var values = encryptedValue.Split([ 'A', 'B', 'C', 'D', 'E', 'F' ]);
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

                await _db.ExecuteData("UpdateSettings", new { attribute, value });



                //var encryptedAttribute = Encrypt(config.Item1);
                //var encryptedValue = Encrypt(config.Item2);

            }
        }

        private char EncryptionSeperator()
        {
            
            char[] Numbers = ['A', 'B', 'C', 'D','E','F'];
            return Numbers[(++currentRandomNumber) % Numbers.Length];
            
        }
            

        public string Encrypt(string value)
        {
            int encUnit = 13;
            string encryptedValue = string.Empty;
            currentRandomNumber = -1;

            foreach(char c in value)
            {
                encryptedValue += $"{(int)c * encUnit}{EncryptionSeperator()}";
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
            if (dic["status"] == "logged in")
                _loggedIn = true;
            //await Console.Out.WriteLineAsync(Encrypt("admin"));
            //await Console.Out.WriteLineAsync(Encrypt("admin"));
            return dic.AsEnumerable();
        }

        public async Task Login(string username, string password)
        {
            //username = Encrypt(username);
            //password = Encrypt(password);
            if (_loggedIn)
                throw new LoginException("Already logged in");
            password = Encrypt(password);
            await _db.ExecuteData("userLogin", new { username, password });
            _loggedIn = true;
        }

        public async Task Logout()
        {
            if (!_loggedIn)
                throw new LoginException("Already logged out");
            await _db.ExecuteData("userLogout", new { });
            _loggedIn = false;
        }
    }
}
