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
        private int _currentRandomNumber;
        public SettingsData(ISqlDataAccess db) 
        { 
            _db = db;
            _loggedIn = false;
            _currentRandomNumber = -1;
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
            }
        }

        private char HexaEncryptionSeperator()
        {
            char[] HexaChars = ['A', 'B', 'C', 'D','E','F'];
            return HexaChars[(++_currentRandomNumber) % HexaChars.Length];
        }
            

        public string Encrypt(string value)
        {
            int encUnit = 13; // any prime number
            string encryptedValue = string.Empty;

            //reset to preserve the encryption pattern or encrypted values will not match
            _currentRandomNumber = -1;

            foreach(char c in value)
            {
                encryptedValue += $"{(int)c * encUnit}{HexaEncryptionSeperator()}";
            }

            return encryptedValue;
        }

        public async Task<IEnumerable<KeyValuePair<string,string>>> LoadConfigs()
        {
            var data = (await _db.LoadData<(string attribute, string value), dynamic>("LoadSettings", new { })).ToDictionary();

            if (data["status"] == "logged in")
                _loggedIn = true;

            return data;
        }

        public async Task Login(string username, string password)
        {
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
